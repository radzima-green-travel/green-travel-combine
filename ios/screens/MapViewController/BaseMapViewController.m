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
#import "Colors.h"
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

@interface BaseMapViewController ()



@end

static NSString* const kSourceId = @"sourceId";
static NSString* const kClusterLayerId = @"clusterLayerId";
static NSString* const kMarkerLayerId = @"markerLayerId";
static const CGSize kIconSize = {.width = 20.0, .height = 20.0};
static NSString* const kMapboxURL = @"mapbox://styles/epm-slr/cki08cwa421ws1aluy6vhnx2h";

@implementation BaseMapViewController

- (instancetype)initWithMapModel:(MapModel *)mapModel
                   locationModel:(LocationModel *)locationModel
                      indexModel:(IndexModel *)indexModel
                     searchModel:(SearchModel *)searchModel
                      apiService:(ApiService *)apiService
                 coreDataService:(CoreDataService *)coreDataService
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
    }
    return self;
}

#pragma mark - viewDidLoad
- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view.
  
  self.view.backgroundColor = [Colors get].white;
  UINavigationBar *navigationBar = self.navigationController.navigationBar;
  configureNavigationBar(navigationBar);
  [self.navigationController setNavigationBarHidden:YES animated:YES];
  
  NSURL *url = [NSURL URLWithString:kMapboxURL];
  self.mapView = [[MGLMapView alloc] initWithFrame:CGRectZero styleURL:url];
  [self.view addSubview:self.mapView];
  
  self.mapView.delegate = self;
  
  self.mapView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.mapView.topAnchor constraintEqualToAnchor:self.view.topAnchor],
    [self.mapView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
    [self.mapView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
    [self.mapView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor]
  ]];
  
  UITapGestureRecognizer *singleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleMapTap:)];
  for (UIGestureRecognizer *recognizer in self.mapView.gestureRecognizers) {
    if ([recognizer isKindOfClass:[UITapGestureRecognizer class]]) {
      [singleTap requireGestureRecognizerToFail:recognizer];
    }
  }
  [self.mapView addGestureRecognizer:singleTap];
  
  [self.mapView setCenterCoordinate:CLLocationCoordinate2DMake(53.893, 27.567)
                          zoomLevel:9.0 animated:NO];
  [self.mapModel addObserver:self];
  [self.indexModel addObserverBookmarks:self];
  [self.locationModel addObserver:self];
  
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
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)mapView:(MGLMapView *)mapView didFinishLoadingStyle:(MGLStyle *)style {
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
        if (self.locationModel.locationEnabled) {
            [self.locationModel startMonitoring];
        }
    }
}

#pragma mark - Location model

- (void)onLocationUpdate:(CLLocation *)lastLocation {
    if (self.intentionToFocusOnUserLocation) {
        [self.mapView setCenterCoordinate:self.mapModel.lastLocation.coordinate animated:YES];
        self.intentionToFocusOnUserLocation = NO;
    }
}

#pragma mark - Event listeners

- (void)onLocateMePress:(id)sender {
    self.intentionToFocusOnUserLocation = YES;
    [self.locationModel authorize];
    [self.locationModel startMonitoring];

    if (self.locationModel.locationEnabled && self.locationModel.lastLocation) {
        [self.mapView setCenterCoordinate:self.mapModel.lastLocation.coordinate animated:YES];
    }
}

- (IBAction)handleMapTap:(UITapGestureRecognizer *)tap {
}

- (void)hidePopup {
  [self.bottomSheet hide];
}

- (void)showPopupWithItem:(PlaceItem *)item {
  __weak typeof(self) weakSelf = self;
  [self.bottomSheet show:item onNavigatePress:^{
    DetailsViewController *detailsController =
    [[DetailsViewController alloc] initWithApiService:weakSelf.apiService
                                      coreDataService:weakSelf.coreDataService
                                           indexModel:weakSelf.indexModel
                                             mapModel:weakSelf.mapModel
                                        locationModel:weakSelf.locationModel
                                          searchModel:weakSelf.searchModel];
    detailsController.item = item;
    [weakSelf.navigationController setNavigationBarHidden:NO animated:NO];
    [weakSelf.navigationController pushViewController:detailsController animated:YES];
  } onBookmarkPress:^(BOOL bookmarked) {
    [weakSelf.indexModel bookmarkItem:item bookmark:!bookmarked];
  }];
}

- (void)addBottomSheet:(NSString *)buttonLabel {
  if (self.bottomSheet != nil) {
    return;
  }
  UIViewController *rootViewController = self.parentViewController.parentViewController;
  self.bottomSheet = [[BottomSheetView alloc] initWithButtonLabel:buttonLabel];
  [rootViewController.view addSubview:self.bottomSheet];
  
  NSLayoutConstraint *topAnchor = [self.bottomSheet.topAnchor constraintEqualToAnchor:rootViewController.view.bottomAnchor];
  self.bottomSheet.top = topAnchor;
  [NSLayoutConstraint activateConstraints:@[
    topAnchor,
    [self.bottomSheet.leadingAnchor constraintEqualToAnchor:rootViewController.view.safeAreaLayoutGuide.leadingAnchor],
    [self.bottomSheet.trailingAnchor constraintEqualToAnchor:rootViewController.view.safeAreaLayoutGuide.trailingAnchor],
  ]];
}

- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {
  [self.bottomSheet setBookmarked:item bookmarked:bookmark];
}

@end
