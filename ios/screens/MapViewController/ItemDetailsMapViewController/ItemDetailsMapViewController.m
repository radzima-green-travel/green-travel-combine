//
//  NearbyPlacesViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "ItemDetailsMapViewController.h"
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
#import "PlaceCategory.h"
#import "BottomSheetView.h"
#import "BottomSheetViewDetailedMap.h"
#import "DetailsViewController.h"
#import "PlaceDetails.h"
#import "CacheService.h"
#import "MainViewController.h"
#import "RoutesSheetController.h"
#import <CoreLocation/CoreLocation.h>
#import "Directions.h"
#import "MapService.h"
#import "AlertUtils.h"
#import "MapViewControllerConstants.h"
#import "AnalyticsEvents.h"

@interface ItemDetailsMapViewController ()

@property (assign, nonatomic) BOOL intentionToShowRoutesSheet;
@property (assign, nonatomic) BOOL feedbackOnAppearGiven;
@property (assign, nonatomic) BOOL popupWasShown;
@property (strong, nonatomic) UINotificationFeedbackGenerator *feedbackGenerator;
@property (strong, nonatomic) PlaceDetails *itemDetails;
@property (copy, nonatomic) void(^cancelGetDirections)(void);
@property (copy, nonatomic) ContinueToNavigation next;
@property (assign, nonatomic) ItemDetailsMapViewControllerAnnotationType
currentFeatureSelection;

@end


static NSString* const kBottomSheetButtonLabel = @"В путь";
static const CGSize kIconSize = {.width = 20.0, .height = 20.0};
static NSString* const kAttributeNameLocation = @"location";
static NSString* const kAttributeNamePoint = @"point";
static NSString* const kAttributeNameRoute = @"route";
static NSString* const kAttributeNameArea = @"area";
static NSString* const kAttributeNameBorder = @"border";
static NSString* const kAttributeType = @"type";

@implementation ItemDetailsMapViewController

- (instancetype)initWithMapModel:(MapModel *)mapModel
                   locationModel:(LocationModel *)locationModel
                      indexModel:(IndexModel *)indexModel
                     searchModel:(SearchModel *)searchModel
                    detailsModel:(DetailsModel *)detailsModel
                      apiService:(ApiService *)apiService
                 coreDataService:(CoreDataService *)coreDataService
                      mapService:(MapService *)mapService
                         mapItem:(MapItem *)mapItem
                     itemDetails:(PlaceDetails *)itemDetails {
  self = [super initWithMapModel:mapModel locationModel:locationModel
                      indexModel:indexModel searchModel:searchModel
                    detailsModel:detailsModel apiService:apiService
                 coreDataService:coreDataService mapService:mapService
                         mapItem:mapItem];
  if (self) {
    _itemDetails = itemDetails;
  }
  return self;
  
}

#pragma mark - Lifecycle
- (void)viewDidLoad {
  [super viewDidLoad];
  self.bottomSheet = [self addBottomSheet:MapViewControllerTypeDetails];
  [((BottomSheetViewDetailedMap *) self.bottomSheet) revertToInitialState];
  __weak typeof(self) weakSelf = self;
  self.bottomSheet.onShow = ^(BOOL show, NSString * _Nonnull itemUUID) {
    if (!show) {
      [weakSelf cancelGetDirections];
    }
    [weakSelf onPopupShow:show itemUUID:itemUUID];
  };
  ((BottomSheetViewDetailedMap *) self.bottomSheet).onPressRoute =
      ^(ContinueToNavigation _Nonnull next) {
    [weakSelf showDirections:next];
  };
  ((BottomSheetViewDetailedMap *) self.bottomSheet).onPressNavigate = ^{
    [weakSelf showRoutesSheet];
  };
  self.currentFeatureSelection =
  ItemDetailsMapViewControllerAnnotationTypePoint |
  ItemDetailsMapViewControllerAnnotationTypeArea |
  ItemDetailsMapViewControllerAnnotationTypeOutline |
  ItemDetailsMapViewControllerAnnotationTypePath |
  ItemDetailsMapViewControllerAnnotationTypeRoute |
  ItemDetailsMapViewControllerAnnotationTypeLocation;
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  self.feedbackGenerator = [[UINotificationFeedbackGenerator alloc] init];
  [self.feedbackGenerator prepare];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  if (!self.popupWasShown) {
    [self showPopupWithItem:self.mapItem.correspondingPlaceItem];
    self.popupWasShown = YES;
  }
  [[AnalyticsEvents get] logEvent:AnalyticsEventsScreenMapItem];
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  [self hidePopup];
  if (self.cancelGetDirections != nil) {
    self.cancelGetDirections();
  }
}

- (void)viewDidDisappear:(BOOL)animated {
  [super viewDidDisappear:animated];
}

- (void)renderMap:(BOOL)initialLoad {
  [self renderMapItem:self.mapItem style:self.mapView.style];
  if (!(self.mapViewState.saved & (MapViewStateSaveOptionZoom |
                                   MapViewStateSaveOptionCenter))) {
    [self showAnnotations:^{}];
  }
  if (self.mapViewState.saved & MapViewStateSaveOptionDirections) {
    [self addDirections:self.mapViewState.directions];
  }
  if (self.mapViewState.saved & MapViewStateSaveOptionLocation) {
    [self passShowsUserLocation:self.mapViewState.showLocation];
  }
}

- (void)onMapItemsUpdate:(NSArray<MapItem *> *)mapItems {
  NSLog(@"Map items: %@", mapItems);
  MapItem *mapItemNew =
  [[mapItems filteredArrayUsingPredicate:[NSPredicate
                                           predicateWithFormat:@"uuid = %@",
                                           self.mapItem.uuid]] firstObject];
  if (mapItemNew) {
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
      [weakSelf renderMapItem:mapItemNew style:weakSelf.mapView.style];
      [weakSelf showAnnotations:^{}];
    });
  }
}

#pragma mark - renderMapItem
- (void)renderMapItem:(MapItem *)mapItem
                style:(MGLStyle *)style {
  [self cleanMap];
  [self.mapView removeAnnotations:self.mapView.annotations];
  self.annotations = [[NSMutableArray alloc] init];
  MGLPointFeature *point = [[MGLPointFeature alloc] init];
  point.coordinate = mapItem.coords;
  point.title = mapItem.title;
  point.attributes = @{
    @"icon": mapItem.correspondingPlaceItem.category.icon,
    @"title": mapItem.title,
    @"uuid": mapItem.correspondingPlaceItem.uuid,
    @"bookmarked":[NSNumber numberWithBool:mapItem.correspondingPlaceItem.bookmarked],
    kAttributeType: @(ItemDetailsMapViewControllerAnnotationTypePoint),
  };
  [self.annotations addObject:point];

  MGLShapeSource *sourcePoint;
  MGLShapeSource *sourcePath;
  MGLShapeSource *sourcePolygon;
  MGLShapeSource *sourceOutline;
#pragma mark - Sources
  sourcePoint = [[MGLShapeSource alloc] initWithIdentifier:MapViewControllerSourceIdPoint
                                                  features:@[point]
                                                   options:nil];

  NSArray<NSArray<CLLocation *> *> *areaParts = self.itemDetails.area;
  NSMutableArray<MGLPolygon *> *polygonParts = [[NSMutableArray alloc] init];
  NSMutableArray<MGLPolylineFeature *> *polygonOutlines = [[NSMutableArray alloc] init];
  if ([areaParts count]) {
    [areaParts enumerateObjectsUsingBlock:^(NSArray<CLLocation *> * _Nonnull partCoordinates, NSUInteger idx, BOOL * _Nonnull stop) {
      CLLocationCoordinate2D *coordinates = malloc(sizeof(CLLocationCoordinate2D) * [partCoordinates count]);
      [partCoordinates enumerateObjectsUsingBlock:^(CLLocation * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        coordinates[idx] = CLLocationCoordinate2DMake(obj.coordinate.latitude, obj.coordinate.longitude);
      }];
      MGLPolygon *polygonPart = [MGLPolygon polygonWithCoordinates:coordinates count:[partCoordinates count]];
      [polygonParts addObject:polygonPart];
      free(coordinates);
      
      MGLPolylineFeature *outline = [self polylineForPath:partCoordinates];
      outline.attributes = @{
        kAttributeType: @(ItemDetailsMapViewControllerAnnotationTypeOutline),
      };
      [polygonOutlines addObject:outline];
    }];
    MGLMultiPolygonFeature *polygon = [MGLMultiPolygonFeature multiPolygonWithPolygons:polygonParts];
    polygon.attributes = @{
      kAttributeType: @(ItemDetailsMapViewControllerAnnotationTypeArea),
    };

    [self.annotations addObject:polygon];

    sourcePolygon = [[MGLShapeSource alloc] initWithIdentifier:MapViewControllerSourceIdPolygon
                                                      features:@[polygon] options:nil];
    sourceOutline = [[MGLShapeSource alloc] initWithIdentifier:MapViewControllerSourceIdOutline
                                                   features:polygonOutlines options:nil];
  }

  NSArray<CLLocation *> *path = self.itemDetails.path;
  if ([path count]) {
    CLLocationCoordinate2D *coordinates = malloc(sizeof(CLLocationCoordinate2D) * [path count]);
    [path enumerateObjectsUsingBlock:^(CLLocation * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      coordinates[idx] = CLLocationCoordinate2DMake(obj.coordinate.latitude, obj.coordinate.longitude);
    }];

    MGLPolylineFeature *polyline = [MGLPolylineFeature polylineWithCoordinates:coordinates count:[path count]];
    polyline.attributes = @{
      kAttributeType: @(ItemDetailsMapViewControllerAnnotationTypePath),
    };
    [self.annotations addObject:polyline];

    sourcePath = [[MGLShapeSource alloc] initWithIdentifier:MapViewControllerSourceIdPath
                                                   features:@[polyline] options:nil];
    free(coordinates);
  }

  if (sourcePath) {
    [style addSource:sourcePath];

    MGLLineStyleLayer *pathLayer = [[MGLLineStyleLayer alloc] initWithIdentifier:MapViewControllerPathLayerId source:sourcePath];
    pathLayer.lineColor = [NSExpression expressionForConstantValue:[ColorsLegacy get].persimmon];
    pathLayer.lineOpacity = [NSExpression expressionForConstantValue:@1];
    pathLayer.lineCap = [NSExpression expressionForConstantValue:@"round"];
    pathLayer.lineWidth =
    [NSExpression expressionForConstantValue:@4.0];

    [style addLayer:pathLayer];
  };
  if (sourceOutline) {
    [style addSource:sourceOutline];

    MGLLineStyleLayer *outlineLayer = [[MGLLineStyleLayer alloc] initWithIdentifier:MapViewControllerPathLayerId source:sourceOutline];
    outlineLayer.lineColor = [NSExpression expressionForConstantValue:[ColorsLegacy get].green];
    outlineLayer.lineOpacity = [NSExpression expressionForConstantValue:@1];
    outlineLayer.lineCap = [NSExpression expressionForConstantValue:@"round"];
    outlineLayer.lineWidth =
    [NSExpression expressionForConstantValue:@2.0];
    outlineLayer.lineDashPattern = [NSExpression expressionForConstantValue:@[@1]];

    [style addLayer:outlineLayer];
  };
  if (sourcePolygon) {
    [style addSource:sourcePolygon];

    MGLFillStyleLayer *polygonLayer = [[MGLFillStyleLayer alloc] initWithIdentifier:MapViewControllerPolygonLayerId source:sourcePolygon];
    polygonLayer.fillColor = [NSExpression expressionForConstantValue:[ColorsLegacy get].green];
    polygonLayer.fillOpacity = [NSExpression expressionForConstantValue:@0.3];
    polygonLayer.fillOutlineColor = [NSExpression expressionForConstantValue:[ColorsLegacy get].green];

    [style addLayer:polygonLayer];
  }
  if (sourcePoint) {
    [style addSource:sourcePoint];

    MGLSymbolStyleLayer *pointLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:MapViewControllerPointLayerId source:sourcePoint];
    pointLayer.iconImageName = [NSExpression expressionForConstantValue:@"mappin"];
    [style setImage:[UIImage imageNamed:@"map-pin"] forName:@"mappin"];

    [style addLayer:pointLayer];
  };
}

- (UIEdgeInsets)calculateEdgePadding {
  CGFloat bottomPadding = (self.bottomSheet.visible ||
    [self.bottomSheet isInProgress]) ? [self.bottomSheet heightOfContent] : 40.0;
  UIEdgeInsets edgePadding = UIEdgeInsetsMake(40.0, 40.0, bottomPadding, 40.0);
  return edgePadding;
}

#pragma mark - showAnnotations
- (void)showAnnotations:(void(^)(void))completion {
  NSArray<id<MGLAnnotation>> *annotations =
  [self.annotations filteredArrayUsingPredicate:
   [NSPredicate predicateWithBlock:[self makeAnnotationFilter:
                                    self.currentFeatureSelection]]];
  if ([annotations count] > 1) {
    [self.mapView showAnnotations:annotations
                      edgePadding:[self calculateEdgePadding]
                         animated:YES
                completionHandler:completion];
    return;
  }
  if ([annotations count] == 1) {
    [self.mapView setCenterCoordinate:annotations.firstObject.coordinate
                            zoomLevel:12.0 direction:self.mapView.direction
                             animated:YES completionHandler:completion];
   
  }
}

- (void)showAnnotationsWithType:(ItemDetailsMapViewControllerAnnotationType)annotationType
                     completion:(void(^)(void))completion {
  NSArray<id<MGLAnnotation>> *annotationsToShow =
  [self.annotations filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:
                                                 [self makeAnnotationFilter:annotationType]]];
  self.currentFeatureSelection = annotationType;
  if ([annotationsToShow count] == 1) {
    [self.mapView setCenterCoordinate:self.annotations.firstObject.coordinate
                            zoomLevel:12.0
                             animated:YES];
    return;
  }
  [self.mapView showAnnotations:annotationsToShow
                    edgePadding:[self calculateEdgePadding]
                       animated:YES
              completionHandler:completion];
}

#pragma mark - addDirections
- (void)addDirectionsLayer:(MGLStyle *)style shape:(MGLShape *)shape {
  if ([style layerWithIdentifier:MapViewControllerDirectionsLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerDirectionsLayerId]];
  }
  if ([style sourceWithIdentifier:MapViewControllerSourceIdDirections] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdDirections]];
  }

  MGLSource *sourceDirections =
  [[MGLShapeSource alloc] initWithIdentifier:MapViewControllerSourceIdDirections
                                       shape:shape options:nil];
  [style addSource:sourceDirections];

  MGLLineStyleLayer *dashedLayer = [[MGLLineStyleLayer alloc] initWithIdentifier:MapViewControllerDirectionsLayerId source:sourceDirections];
  dashedLayer.lineJoin = [NSExpression expressionForConstantValue:[NSValue valueWithMGLLineJoin:MGLLineJoinRound]];
  dashedLayer.lineCap = [NSExpression expressionForConstantValue:[NSValue valueWithMGLLineCap:MGLLineCapRound]];
  dashedLayer.lineWidth = [NSExpression expressionForConstantValue:@4];
  dashedLayer.lineColor = [NSExpression expressionForConstantValue:[ColorsLegacy get].persimmon];
  dashedLayer.lineOpacity = [NSExpression expressionForConstantValue:@1];
  dashedLayer.lineDashPattern = [NSExpression expressionForConstantValue:@[@0, @1.5]];

  [style addLayer:dashedLayer];
}

#pragma mark - removeDuplicateAnnotations
- (void)removeDuplicateAnnotations:(Class)class
                         attribute:(ItemDetailsMapViewControllerAnnotationType)attributeValue {
  ItemDetailsMapViewControllerAnnotationType typesWithoutFilteredOutValue =
      getAllItemTypes() ^ attributeValue;
  [self.annotations filterUsingPredicate:[NSPredicate predicateWithBlock:
                                          [self makeAnnotationFilter:typesWithoutFilteredOutValue]]];
}

- (BOOL(^)(id<MGLFeature>,  NSDictionary<NSString *,id>*))makeAnnotationFilter:(ItemDetailsMapViewControllerAnnotationType)attributeMask {
  return ^BOOL(id<MGLFeature> evaluatedObject,  NSDictionary<NSString *,id> * _Nullable bindings) {
    NSUInteger attributeValue =
    [((NSNumber *)evaluatedObject.attributes[kAttributeType]) intValue];
    BOOL attributeIsPresent = attributeValue & attributeMask;
    return attributeIsPresent;
  };
}

- (void)addDirections:(NSArray<CLLocation *> *)locations {
  [self removeDuplicateAnnotations:MGLPolylineFeature.class
                         attribute:ItemDetailsMapViewControllerAnnotationTypeRoute];
  
  MGLPolylineFeature *polyline = [self polylineForPath:locations];
  polyline.attributes = @{
    kAttributeType: @(ItemDetailsMapViewControllerAnnotationTypeRoute)
  };
  [self.annotations addObject:polyline];
  [self addDirectionsLayer:self.mapView.style shape:polyline];
}

- (MGLPolylineFeature *)polylineForPath:(NSArray<CLLocation *>*)path {
  MGLPolylineFeature *polyline;
  if ([path count]) {
    CLLocationCoordinate2D *coordinates = malloc(sizeof(CLLocationCoordinate2D) * [path count]);
    [path enumerateObjectsUsingBlock:^(CLLocation * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      coordinates[idx] = CLLocationCoordinate2DMake(obj.coordinate.latitude, obj.coordinate.longitude);
    }];
    polyline = [MGLPolylineFeature polylineWithCoordinates:coordinates count:[path count]];
  }
  return polyline;
}

#pragma mark - handleMapTap
- (IBAction)handleMapTap:(UITapGestureRecognizer *)tap {
  MGLSource *source = [self.mapView.style sourceWithIdentifier:MapViewControllerSourceIdPoint];
  if (![source isKindOfClass:[MGLShapeSource class]]) {
    return;
  }
  if (tap.state != UIGestureRecognizerStateEnded) {
    return;
  }

  CGPoint point = [tap locationInView:tap.view];
  CGFloat width = kIconSize.width;
  CGRect rect = CGRectMake(point.x - width / 2, point.y - width / 2, width, width);

  NSArray<id<MGLFeature>> *features =
  [self.mapView visibleFeaturesInRect:rect inStyleLayersWithIdentifiers:
   [NSSet setWithObjects:
    MapViewControllerPointLayerId, MapViewControllerPathLayerId,
    MapViewControllerPolygonLayerId, MapViewControllerDirectionsLayerId, nil]];

  // Pick the first feature (which may be a port or a cluster), ideally selecting
  // the one nearest one to the touch point.
  id<MGLFeature> feature = features.firstObject;
  if (!feature) {
    [self hidePopup];
    return;
  }
  ItemDetailsMapViewControllerAnnotationType featureType =
  [((NSNumber *) feature.attributes[kAttributeType]) intValue];
  ItemDetailsMapViewControllerAnnotationType placeItemTypes =
  ItemDetailsMapViewControllerAnnotationTypePoint |
  ItemDetailsMapViewControllerAnnotationTypeArea |
  ItemDetailsMapViewControllerAnnotationTypeOutline |
  ItemDetailsMapViewControllerAnnotationTypePath;
  ItemDetailsMapViewControllerAnnotationType allItemTypes = getAllItemTypes();
  if (featureType & placeItemTypes) {
    [self showPopupWithItem:self.mapItem.correspondingPlaceItem];
    [self showAnnotationsWithType:placeItemTypes
                       completion:^{}];
    return;
  }
  if (featureType & ItemDetailsMapViewControllerAnnotationTypeRoute) {
    [self showPopupWithItem:self.mapItem.correspondingPlaceItem];
    [self showAnnotationsWithType:allItemTypes
                       completion:^{}];
    return;
  }
  [self hidePopup];
}

- (void)showPopupWithItem:(PlaceItem *)item {
  __weak typeof(self) weakSelf = self;
  (self.bottomSheet).onBookmarkPress = ^(BOOL bookmarked){
    [weakSelf.indexModel bookmarkItem:item bookmark:!bookmarked];
  };
  [self.bottomSheet show:item];
}

- (void)onPopupShow:(BOOL)visible itemUUID:(nonnull NSString *)itemUUID {
  [super onPopupShow:visible itemUUID:itemUUID];
  if (visible && !self.feedbackOnAppearGiven) {
    [self.feedbackGenerator notificationOccurred:UINotificationFeedbackTypeSuccess];
    self.feedbackGenerator = nil;
    self.feedbackOnAppearGiven = YES;
  }
  __weak typeof(self) weakSelf = self;
  [self showAnnotations:^{
    if (weakSelf.bottomSheet.active) {
      [weakSelf saveMapCoordinates];
    }
  }];
}

- (void)showRoutesSheet {
  PlaceItem *item = self.mapItem.correspondingPlaceItem;
  Directions *directions = [[Directions alloc] init];
  directions.from = self.locationModel.lastLocation.coordinate;
  directions.to = item.coords;
  directions.title = item.title;
  __weak typeof(self) weakSelf = self;
  [[RoutesSheetController get] show:directions
                          presenter:^(UIAlertController * _Nonnull alert) {
    [weakSelf presentViewController:alert animated:YES completion:^{}];
  }];
}

#pragma mark - Location update
- (void)onLocationUpdate:(CLLocation *)lastLocation {
  [super onLocationUpdate:lastLocation];
  if (self.intentionToShowRoutesSheet) {
    [self showDirections:self.next];
    self.intentionToShowRoutesSheet = NO;
  }
}

#pragma mark - Event listeners

- (void)startMonitoringLocation {
  [self.locationModel authorize];
  [self.locationModel startMonitoring];

  if (self.locationModel.locationMonitoringStatus == LocationModelLocationStatusDenied) {
    showAlertGoToSettings(self);
    return;
  }
}

#pragma mark - showBigPicture
- (void)showBigPicture {
  [super showBigPicture];
  [self focusOnCurrentLocation:^{}];
}

- (void)focusOnCurrentLocation:(void(^)(void))completion {
  if ([self locationIsInvalid]) {
    return;
  }
  [self showUserLocation:YES];
  
  [self removeDuplicateAnnotations:MGLPointFeature.class
                         attribute:ItemDetailsMapViewControllerAnnotationTypeLocation];
  MGLPointFeature *location = [[MGLPointFeature alloc] init];
  location.coordinate = self.locationModel.lastLocation.coordinate;
  location.attributes = @{
    kAttributeType: @(ItemDetailsMapViewControllerAnnotationTypeLocation)
  };
  [self.annotations addObject:location];
  [self showAnnotationsWithType:getAllItemTypes() completion:completion];
}

- (void)showDirections:(ContinueToNavigation)next {
  self.intentionToShowRoutesSheet = YES;
  __weak typeof(self) weakSelf = self;
  self.next = next;
  [self startMonitoringLocation];
  if (self.cancelGetDirections != nil) {
    self.cancelGetDirections();
  }
  if ([self locationIsInvalid]) {
    next(NO);
    return;
  }
  CLLocationCoordinate2D coordinate = self.locationModel.lastLocation.coordinate;
  self.feedbackGenerator = [[UINotificationFeedbackGenerator alloc] init];
  [self.feedbackGenerator prepare];
  self.cancelGetDirections =
  [self.mapService loadDirectionsWithCompletionFrom:coordinate
                                                 to:self.mapItem.coords
                                         completion:^(NSArray<CLLocation *> * _Nonnull locations) {
    dispatch_async(dispatch_get_main_queue(), ^{
      if (locations == nil) {
        next(NO);
        showAlertCantPlotRoute(weakSelf);
        [self.feedbackGenerator notificationOccurred:UINotificationFeedbackTypeError];
        weakSelf.feedbackGenerator = nil;
        return;
      }
      [weakSelf.mapViewState setDirections:locations];
      [weakSelf addDirections:locations];
      [weakSelf focusOnCurrentLocation:^{
        [weakSelf.feedbackGenerator
         notificationOccurred:UINotificationFeedbackTypeSuccess];
        weakSelf.feedbackGenerator = nil;
        next(YES);
      }];
    });
  }];
}

#pragma mark MapViewToStateIntermediary
- (void)passDirections:(NSArray<CLLocation *> *)directions {
  [self addDirections:directions];
}

@end
