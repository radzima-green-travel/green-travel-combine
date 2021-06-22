//
//  NearbyPlacesViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "BaseMapViewController.h"
@import Mapbox;
#import "StyleUtils.h"
#import "ColorsLegacy.h"
#import "MapModel.h"
#import "MapItemsObserver.h"
#import "LocationObserver.h"
#import "MapItem.h"
#import "MapPinView.h"
#import "LocationModel.h"
#import "CategoriesFilterView.h"
#import "IndexModel.h"
#import "MapButton.h"
#import "SearchViewController.h"
#import "SearchModel.h"
#import "ApiService.h"
#import "CoreDataService.h"
#import "PlaceItem.h"
#import "Category.h"
#import "BottomSheetView.h"
#import "DetailsViewController.h"
#import "MainViewController.h"
#import "MapService.h"
#import "AlertUtils.h"
#import "CacheService.h"
#import "MapViewControllerConstants.h"

@interface BaseMapViewController ()

@end

static NSString* const kSourceId = @"sourceId";
static NSString* const kClusterLayerId = @"clusterLayerId";
static NSString* const kMarkerLayerId = @"markerLayerId";
static NSString* const kMapboxURL = @"mapbox://styles/epm-slr/cki08cwa421ws1aluy6vhnx2h";
static NSString* const kMapboxDarkModeURL = @"mapbox://styles/epm-slr/ckodyal5d3i9017pb9vii6v18";
static CGFloat const kLocateMeZoomLevel = 10.0;

@implementation BaseMapViewController 

- (instancetype)initWithMapModel:(MapModel *)mapModel
                   locationModel:(LocationModel *)locationModel
                      indexModel:(IndexModel *)indexModel
                     searchModel:(SearchModel *)searchModel
                      apiService:(ApiService *)apiService
                 coreDataService:(CoreDataService *)coreDataService
                      mapService:(MapService *)mapService
                         mapItem:(nullable MapItem *)mapItem {
  self = [super init];
  if (self) {
    _mapModel = mapModel;
    _locationModel = locationModel;
    _mapItem = mapItem;
    _indexModel = indexModel;
    _searchModel = searchModel;
    _apiService = apiService;
    _coreDataService = coreDataService;
    _mapService = mapService;
    _mapViewState = [[MapViewState alloc] init];
  }
  return self;
}

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
  configureNavigationBar(self.navigationController.navigationBar);
}

- (void)traitCollectionDidChange:(UITraitCollection *)previousTraitCollection {
  [super traitCollectionDidChange:previousTraitCollection];
  if (@available(iOS 12.0, *)) {
    if (self.traitCollection.userInterfaceStyle ==
        previousTraitCollection.userInterfaceStyle) {
      return;
    }
    [self applyStyleToMap];
  }
}

- (void)applyStyleToMap {
  if (@available(iOS 12.0, *)) {
    NSURL *styleURL;
    if (self.traitCollection.userInterfaceStyle == UIUserInterfaceStyleDark) {
      styleURL = [NSURL URLWithString:kMapboxDarkModeURL];
      [self.mapView setStyleURL:styleURL];
      return;
    }
    if (self.traitCollection.userInterfaceStyle == UIUserInterfaceStyleLight) {
      styleURL = [NSURL URLWithString:kMapboxURL];
      [self.mapView setStyleURL:styleURL];
      return;
    }
  }
}

#pragma mark - viewDidLoad
- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view.

  self.view.backgroundColor = [ColorsLegacy get].white;
  UINavigationBar *navigationBar = self.navigationController.navigationBar;
  configureNavigationBar(navigationBar);
  
#pragma mark - Location button
  self.locationButton = [[MapButton alloc] initWithImageName:@"location-arrow"
                                                      target:self
                                                    selector:@selector(onLocateMePress:)
                                  imageCenterXAnchorConstant:-2.0
                                  imageCenterYAnchorConstant:2.0];
  [self.view addSubview:self.locationButton];

  self.locationButton.translatesAutoresizingMaskIntoConstraints = NO;

  self.locationButtonBottomAnchor = [self.locationButton.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor constant:-16.0];
  [NSLayoutConstraint activateConstraints:@[
    self.locationButtonBottomAnchor,
    [self.locationButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
  ]];
#pragma mark - Add bottom sheet
  self.bottomSheet = [self addBottomSheet];
}

#pragma mark - viewWillAppear
- (void)viewWillAppear:(BOOL)animated {
  [self.mapView removeFromSuperview];
  [self createMap];
  [self cleanMap];
  [self.view insertSubview:self.mapView belowSubview:self.locationButton];
  self.mapView.delegate = self;
  
  self.mapView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.mapView.topAnchor constraintEqualToAnchor:self.view.topAnchor],
    [self.mapView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
    [self.mapView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
    [self.mapView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor]
  ]];
  
  self.singleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleMapTap:)];
  for (UIGestureRecognizer *recognizer in self.mapView.gestureRecognizers) {
    if ([recognizer isKindOfClass:[UITapGestureRecognizer class]]) {
      [self.singleTap requireGestureRecognizerToFail:recognizer];
    }
  }
  [self.mapView addGestureRecognizer:self.singleTap];
  [self.mapModel addObserver:self];
  [self.indexModel addObserverBookmarks:self];
  [self.locationModel addObserver:self];
  
  [self renderMap:YES];
}

- (void)viewDidAppear:(BOOL)animated {
  [self.mapViewState restoreToMap:self.mapView];
}

- (void)viewWillDisappear:(BOOL)animated {
  [self.mapViewState saveWithMapView:self.mapView];
}

#pragma mark - viewDidDisappear
- (void)viewDidDisappear:(BOOL)animated {
  [self.mapView removeGestureRecognizer:self.singleTap];
  [self.mapModel removeObserver:self];
  [self.indexModel removeObserverBookmarks:self];
  [self.locationModel removeObserver:self];
}

- (void)mapView:(MGLMapView *)mapView didFinishLoadingStyle:(MGLStyle *)style {
  [[CacheService get] setMapLoaded:YES];
  [self renderMap:YES];
}

- (void)renderMap:(BOOL)initialLoad {
}

- (void)cleanMap {
  MGLStyle *style = self.mapView.style;
  if ([style layerWithIdentifier:MapViewControllerPolygonLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerPolygonLayerId]];
  }
  if ([style layerWithIdentifier:MapViewControllerPathLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerPathLayerId]];
  }
  if ([style layerWithIdentifier:MapViewControllerOutlineLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerOutlineLayerId]];
  }
  if ([style layerWithIdentifier:MapViewControllerDirectionsLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerDirectionsLayerId]];
  }
  if ([style layerWithIdentifier:MapViewControllerPointLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerPointLayerId]];
  }
  if ([style layerWithIdentifier:MapViewControllerClusterLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerClusterLayerId]];
  }
  if ([style layerWithIdentifier:MapViewControllerMarkerLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerMarkerLayerId]];
  }
  
  if ([style sourceWithIdentifier:MapViewControllerSourceIdAll] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdAll]];
  }
  if ([style sourceWithIdentifier:MapViewControllerSourceIdPolygon] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdPolygon]];
  }
  if ([style sourceWithIdentifier:MapViewControllerSourceIdPath] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdPath]];
  }
  if ([style sourceWithIdentifier:MapViewControllerSourceIdOutline] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdOutline]];
  }
  if ([style sourceWithIdentifier:MapViewControllerSourceIdDirections] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdDirections]];
  }
  if ([style sourceWithIdentifier:MapViewControllerSourceIdPoint] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdPoint]];
  }
}

- (void)createMap {
  MGLMapView *mapViewCached = [[CacheService get].cache objectForKey:@"mapView"];
  if (mapViewCached) {
    self.mapView = mapViewCached;
    [self applyStyleToMap];
    return;
  }
  MGLMapView *mapViewConstructed =  [[MGLMapView alloc] initWithFrame:CGRectZero];
  [[CacheService get].cache setObject:mapViewConstructed forKey:@"mapView"];
  self.mapView = mapViewConstructed;
  [self applyStyleToMap];
}

- (void)onMapItemsUpdate:(NSArray<MapItem *> *)mapItems {
    NSLog(@"Map items: %@", mapItems);
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
      [weakSelf onMapItemsUpdateMainQueue:mapItems style:weakSelf.mapView.style];
    });
}

- (void)onMapItemsUpdateMainQueue:(NSArray<MapItem *> *)mapItems style:(MGLStyle *)style {
}

- (MGLAnnotationView *)mapView:(MGLMapView *)mapView viewForAnnotation:(id<MGLAnnotation>)annotation {
    if (![annotation isKindOfClass:[MGLPointAnnotation class]]) {
        return nil;
    }
    NSString *reuseIdentifier = [NSString stringWithFormat:@"%f", annotation.coordinate.longitude];

    MapPinView *mappin = [mapView dequeueReusableAnnotationViewWithIdentifier:reuseIdentifier];

    if (!mappin) {
        mappin = [[MapPinView alloc] initWithReuseIdentifier:reuseIdentifier];
        mappin.bounds = CGRectMake(0, 0, 28, 35);
    }
    return mappin;
}

- (void)onAuthorizationStatusChange:(CLAuthorizationStatus)status {
  if (status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    if (self.locationModel.locationMonitoringStatus == LocationModelLocationStatusGranted) {
      [self.locationModel startMonitoring];
    }
  }
}

#pragma mark - Location model

- (void)onLocationUpdate:(CLLocation *)lastLocation {
  if (self.intentionToFocusOnUserLocation) {
    [self.mapView setCenterCoordinate:self.mapModel.lastLocation.coordinate
                            zoomLevel:[self locateMeZoomLevel]
                             animated:YES];
    [self.mapView setShowsUserLocation:YES];
    [self.mapView setShowsHeading:YES];
    self.intentionToFocusOnUserLocation = NO;
  }
}

- (CGFloat)locateMeZoomLevel {
  CGFloat zoomLevel = self.mapView.zoomLevel > kLocateMeZoomLevel ? self.mapView.zoomLevel : kLocateMeZoomLevel;
  return zoomLevel;
}

#pragma mark - Event listeners

- (void)onLocateMePress:(id)sender {
  self.intentionToFocusOnUserLocation = YES;
  [self.locationModel authorize];
  [self.locationModel startMonitoring];
  
  if (self.locationModel.locationMonitoringStatus == LocationModelLocationStatusGranted && self.locationModel.lastLocation) {
    [self.mapView setCenterCoordinate:self.mapModel.lastLocation.coordinate
                            zoomLevel:[self locateMeZoomLevel] animated:YES];
    [self.mapView setShowsUserLocation:YES];
    [self.mapView setShowsHeading:YES];
    return;
  }
  if (self.locationModel.locationMonitoringStatus == LocationModelLocationStatusDenied) {
    showAlertGoToSettings(self);
  }
}

- (IBAction)handleMapTap:(UITapGestureRecognizer *)tap {
}

- (void)hidePopup {
  [self.bottomSheet hide];
}

- (void)showPopupWithItem:(PlaceItem *)item {}

- (BottomSheetView *)addBottomSheet {
  MainViewController *mainViewController = (MainViewController *)self.parentViewController.parentViewController;
  return [mainViewController addBottomSheet];
}

- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {
  [self.bottomSheet setBookmarked:item bookmarked:bookmark];
}

@end
