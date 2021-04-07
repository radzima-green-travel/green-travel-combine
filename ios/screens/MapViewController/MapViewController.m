//
//  NearbyPlacesViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "MapViewController.h"
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

@interface MapViewController ()

@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) UIButton *locationButton;
@property (strong, nonatomic) UIButton *searchButton;
@property (strong, nonatomic) MGLMapView *mapView;
@property (assign, nonatomic) BOOL intentionToFocusOnUserLocation;
@property (strong, nonatomic) MapItem *mapItem;
@property (strong, nonatomic) CategoriesFilterView *filterView;
@property (strong, nonatomic) NSLayoutConstraint *locationButtonBottomAnchor;

@end

@implementation MapViewController

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

    self.title = self.mapItem ? self.mapItem.title : @"Карта";
    self.view.backgroundColor = [Colors get].white;

    UINavigationBar *navigationBar = self.navigationController.navigationBar;
    configureNavigationBar(navigationBar);

    NSURL *url = [NSURL URLWithString:@"mapbox://styles/epm-slr/cki08cwa421ws1aluy6vhnx2h"];
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

    [self.mapView setCenterCoordinate:CLLocationCoordinate2DMake(53.893, 27.567)
                       zoomLevel:9.0 animated:NO];
    [self.mapModel addObserver:self];
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
#pragma mark - Search button
    self.searchButton = [[MapButton alloc] initWithImageName:@"search-outline"
                                                      target:self
                                                    selector:@selector(onSearchPress:)
                                  imageCenterXAnchorConstant:0.0
                                  imageCenterYAnchorConstant:0.0];
    [self.view addSubview:self.searchButton];

    self.searchButton.translatesAutoresizingMaskIntoConstraints = NO;

    [NSLayoutConstraint activateConstraints:@[
        [self.searchButton.bottomAnchor constraintEqualToAnchor:self.locationButton.topAnchor constant:-8.0],
        [self.searchButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
    ]];

    [self addFilterView];
}

#pragma mark - Categories filter view
- (void)addFilterView {
  if (self.filterView != nil || [self.mapModel.categories count] == 0) {
      return;
  }
  __weak typeof(self) weakSelf = self;
  self.filterView =
[[CategoriesFilterView alloc] initWithMapModel:self.mapModel
                                    indexModel:self.indexModel
                                    onFilterUpdate:^(NSSet<NSString *>  * _Nonnull categoryUUIDs) {
      [weakSelf onFilterUpdate:categoryUUIDs];
  }];
  [self.view addSubview:self.filterView];
  self.filterView.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint deactivateConstraints:@[self.locationButtonBottomAnchor]];
  self.locationButtonBottomAnchor = [self.locationButton.bottomAnchor constraintEqualToAnchor:self.filterView.topAnchor];
  [NSLayoutConstraint activateConstraints:@[
      self.locationButtonBottomAnchor,
      [self.filterView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
      [self.filterView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
      [self.filterView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
      [self.filterView.heightAnchor constraintEqualToConstant:73.5],
  ]];
}

- (void)mapViewDidFinishLoadingMap:(MGLMapView *)mapView {

}

- (void)mapView:(MGLMapView *)mapView didFinishLoadingStyle:(MGLStyle *)style {
    NSArray<MapItem *> *mapItems = self.mapItem ? @[self.mapItem] :
        self.mapModel.mapItemsOriginal;
    [self renderAnnotations:mapItems style:style];
}

- (void)onMapItemsUpdate:(NSArray<MapItem *> *)mapItems {
    NSLog(@"Map items: %@", mapItems);
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        [weakSelf renderAnnotations:mapItems style:weakSelf.mapView.style];
        [weakSelf addFilterView];
    });
}

- (void)renderAnnotations:(NSArray<MapItem *> *)mapItems style:(MGLStyle *)style {
    NSMutableArray *mapAnnotations = [[NSMutableArray alloc] init];
    [self.mapView removeAnnotations:self.mapView.annotations];
    [mapItems enumerateObjectsUsingBlock:^(MapItem * _Nonnull mapItem, NSUInteger idx, BOOL * _Nonnull stop) {
        MGLPointFeature *point = [[MGLPointFeature alloc] init];
        point.coordinate = mapItem.coords;
        point.title = mapItem.title;
        [mapAnnotations addObject:point];
    }];
    // [self.mapView addAnnotations:mapAnnotations];
    // [self.mapView showAnnotations:mapAnnotations animated:YES];

  MGLSource *source = [[MGLShapeSource alloc] initWithIdentifier:@"someId"
                                                        features:mapAnnotations
                                                         options:@{
      MGLShapeSourceOptionClustered: @YES,
      MGLShapeSourceOptionClusterRadius: @10.0
  }];
  [style addSource:source];

  MGLSymbolStyleLayer *markerLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:@"layerId" source:source];
  markerLayer.iconImageName = [NSExpression expressionForConstantValue:@"markerNotClustered"];
  markerLayer.predicate = [NSPredicate predicateWithFormat:@"cluster != YES"];
  [style setImage:[UIImage imageNamed:@"flag"] forName:@"markerNotClustered"];

  MGLSymbolStyleLayer *clusterLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:@"clusterLayerId" source:source];
  clusterLayer.textColor = [NSExpression expressionForConstantValue:[Colors get].green];
  clusterLayer.textFontSize = [NSExpression expressionForConstantValue:[NSNumber numberWithDouble:20.0]];
  clusterLayer.iconAllowsOverlap = [NSExpression expressionForConstantValue:[NSNumber numberWithBool:YES]];
  clusterLayer.textOffset =  [NSExpression expressionForConstantValue:[NSValue valueWithCGVector:CGVectorMake(0, 0.2)]];
  clusterLayer.predicate = [NSPredicate predicateWithFormat:@"cluster == YES"];
  [style setImage:[UIImage imageNamed:@"forest"] forName:@"markerClustered"];


  NSDictionary *stops = @{@10: [NSExpression expressionWithFormat:@"forest"]};
  NSExpression *defaultShape = [NSExpression expressionWithFormat:@"markerClustered"];
  clusterLayer.iconImageName = [NSExpression expressionWithFormat:@"mgl_step:from:stops:(point_count, %@, %@)", defaultShape, stops];
  clusterLayer.text = [NSExpression expressionWithFormat:@"CAST(point_count, 'NSString')"];

  [style addLayer:markerLayer];
  [style addLayer:clusterLayer];
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

- (BOOL)mapView:(MGLMapView *)mapView annotationCanShowCallout:(id<MGLAnnotation>)annotation {
    return YES;
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

- (void)onSearchPress:(id)sender {
    __weak typeof(self) weakSelf = self;
    SearchViewController *searchViewController =
    [[SearchViewController alloc] initWithModel:self.searchModel
                                     indexModel:self.indexModel
                                  locationModel:self.locationModel
                                       mapModel:self.mapModel
                                     apiService:self.apiService
                                coreDataService:self.coreDataService
                            itemsWithCoordsOnly:YES
                             onSearchItemSelect:^(PlaceItem * _Nonnull item) {
        [weakSelf.filterView activateFilterForPlaceItem:item];
        [weakSelf.navigationController dismissViewControllerAnimated:YES
            completion:^{}];
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf.mapView setCenterCoordinate:item.coords zoomLevel:8 animated:YES];
        });
    }];
    searchViewController.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc]  initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(onDonePress:)];
    UINavigationController *searchViewControllerWithNavigation =
    [[UINavigationController alloc ] initWithRootViewController:searchViewController];
    [self presentViewController:searchViewControllerWithNavigation animated:YES
                     completion:^{}];
}

-(void)onDonePress:(id)sender {
    [self.navigationController dismissViewControllerAnimated:YES
                                                  completion:^{}];
}

- (void)onFilterUpdate:(NSSet<NSString *>*)categoryUUIDs {
    [self.mapModel applyCategoryFilters:categoryUUIDs];
}

@end
