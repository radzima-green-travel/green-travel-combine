//
//  NearbyPlacesViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "FullMapViewController.h"
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
#import "Colors.h"
#import "PlaceItem.h"
#import "PlaceCategory.h"
#import "BottomSheetView.h"
#import "DetailsViewController.h"
#import "MainViewController.h"
#import "CacheService.h"
#import "MapViewControllerConstants.h"
#import "CoordinateUtils.h"
#import "NumberUtils.h"
#import "AnalyticsEvents.h"
#import "StringUtils.h"
#import "AnalyticsTimeTracer.h"
#import "BottomSheetPresentationController.h"
#import "BottomSheetPresentationControllerTransitioningDelegate.h"

@interface FullMapViewController ()

@property(strong, nonatomic) NSString *selectedItemUUID;
@property(strong, nonatomic) UISelectionFeedbackGenerator *feedbackGenerator;
@property(assign, nonatomic) BOOL shouldStopSearchZoom;
@property(strong, nonatomic) AnalyticsTimeTracer *timeTracer;
@property(strong, nonatomic) BottomSheetPresentationControllerTransitioningDelegate *bottomSheetDelegate;

@end


static NSString* const kBottomSheetButtonLabel = @"Узнать больше";
static const CGSize kIconSize = {.width = 20.0, .height = 20.0};
static const CGFloat kZoomLevelForSearch = 8.0;
static const NSUInteger kMaxSearchZoomRecursionDepth = 15;

@implementation FullMapViewController

#pragma mark - viewDidLoad
- (void)viewDidLoad {
  [super viewDidLoad];
  [self.navigationController setNavigationBarHidden:YES animated:NO];
#pragma mark - Search button
  self.searchButton = [[MapButton alloc] initWithImageName:@"search-outline"
                                                    target:self
                                                  selector:@selector(onSearchPress:)
                                imageCenterXAnchorConstant:0.0
                                imageCenterYAnchorConstant:0.0];
  [self.view addSubview:self.searchButton];

  self.searchButton.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint activateConstraints:@[
    [self.searchButton.bottomAnchor constraintEqualToAnchor:self.locationButton.topAnchor constant:-kZoomLevelForSearch],
    [self.searchButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
  ]];
  [self addFilterView];
  self.bottomSheet = [self addBottomSheet:MapViewControllerTypeFull];
  self.timeTracer = [[AnalyticsTimeTracer alloc] initWithEventName:AnalyticsEventsLifeTimeFullMapScreen];
  BottomSheetPresentationControllerTransitioningDelegate *bottomSheetDelegate = [[BottomSheetPresentationControllerTransitioningDelegate alloc] init];
  self.bottomSheetDelegate = bottomSheetDelegate;
  self.navigationController.delegate = self;
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  self.shouldStopSearchZoom = NO;
  [self.timeTracer traceStart];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  if (![self.navigationController isNavigationBarHidden]) {
    [self adaptAttributionButton];
    __weak typeof(self) weakSelf = self;
    [NSTimer  scheduledTimerWithTimeInterval:UINavigationControllerHideShowBarDuration
                                    repeats:NO block:^(NSTimer * _Nonnull timer) {
      [weakSelf adaptAttributionButton];
    }];
  } else {
    [self.mapView setAttributionButtonMargins:CGPointMake(
                 MapViewControllerAttributionButtonInset,
                 MapViewControllerAttributionButtonInset)];
  }
  [self.navigationController setNavigationBarHidden:YES animated:YES];
  
  [[AnalyticsEvents get] logEvent:AnalyticsEventsScreenMapFull];
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  self.shouldStopSearchZoom = YES;
}

- (void)viewDidDisappear:(BOOL)animated {
  [super viewDidDisappear:animated];
  [self.timeTracer traceEnd];
}

- (void)adaptAttributionButton {
  CGFloat topPadding = self.mapView.safeAreaInsets.top;
  CGSize statusBarSize = [[UIApplication sharedApplication] statusBarFrame].size;
  CGFloat statusBarHeight = MIN(statusBarSize.width, statusBarSize.height);
  [self.mapView setAttributionButtonMargins:
   CGPointMake(MapViewControllerAttributionButtonInset,
               -topPadding + MapViewControllerAttributionButtonInset + statusBarHeight)];
}

#pragma mark - Orientation change
- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
  [self.mapView setAttributionButtonMargins:CGPointMake(
               MapViewControllerAttributionButtonInset,
               MapViewControllerAttributionButtonInset)];
}

#pragma mark - Categories filter view
- (void)addFilterView {
  if (self.filterView != nil || [super.mapModel.categories count] == 0) {
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

- (void)renderMap:(BOOL)initialLoad {
  [self renderMapItems:self.mapModel.mapItemsFiltered
                 style:self.mapView.style];
  if (!(self.mapViewState.saved & (MapViewStateSaveOptionZoom |
                                   MapViewStateSaveOptionCenter))) {
    [self.mapView showAnnotations:self.annotations animated:YES];
  }
}

- (void)onMapItemsUpdate:(NSArray<MapItem *> *)mapItems {
  NSLog(@"Map items: %@", mapItems);
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_main_queue(), ^{
    [weakSelf renderMapItems:mapItems style:weakSelf.mapView.style];
    [weakSelf.mapView showAnnotations:weakSelf.annotations animated:YES];
    [weakSelf addFilterView];
  });
}

- (void)renderMapItems:(NSArray<MapItem *> *)mapItems
                 style:(MGLStyle *)style {
  self.annotations = [[NSMutableArray alloc] init];
  [self.mapView removeAnnotations:self.mapView.annotations];
  [mapItems enumerateObjectsUsingBlock:^(MapItem * _Nonnull mapItem, NSUInteger idx, BOOL * _Nonnull stop) {
    MGLPointFeature *point = [[MGLPointFeature alloc] init];
    point.coordinate = mapItem.coords;
    point.title = mapItem.title;
    point.attributes = @{
      @"icon": [mapItem.correspondingPlaceItem.uuid isEqualToString:self.selectedItemUUID] ?
      [NSString stringWithFormat:@"%@-black", mapItem.correspondingPlaceItem.category.icon] : mapItem.correspondingPlaceItem.category.icon,
      @"title": mapItem.title,
      @"uuid": mapItem.correspondingPlaceItem.uuid,
      @"bookmarked":[NSNumber numberWithBool:mapItem.correspondingPlaceItem.bookmarked],
    };
    [self.annotations addObject:point];
  }];

  MGLShapeSource *source = (MGLShapeSource *)[style sourceWithIdentifier:MapViewControllerSourceIdAll];
  if ([style layerWithIdentifier:MapViewControllerMarkerLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerMarkerLayerId]];
  }
  if ([style layerWithIdentifier:MapViewControllerClusterLayerId]) {
    [style removeLayer:[style layerWithIdentifier:MapViewControllerClusterLayerId]];
  }
  if ([style sourceWithIdentifier:MapViewControllerSourceIdAll] != nil) {
    [style removeSource:[style sourceWithIdentifier:MapViewControllerSourceIdAll]];
  }

  source =
  [[MGLShapeSource alloc] initWithIdentifier:MapViewControllerSourceIdAll
                                    features:self.annotations
                                     options:@{
                                       MGLShapeSourceOptionClustered: @YES,
                                       MGLShapeSourceOptionClusterRadius: @50.0
                                     }];

  [style addSource:source];

  MGLSymbolStyleLayer *markerLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:MapViewControllerMarkerLayerId source:source];
  markerLayer.iconImageName = [NSExpression expressionForConstantValue:@"{icon}"];
  markerLayer.predicate = [NSPredicate predicateWithFormat:@"cluster != YES"];

//  [style setImage:[UIImage imageNamed:@"conserv-area-map-pin"] forName:@"object"];
//  [style setImage:[UIImage imageNamed:@"hiking-map-pin"] forName:@"hiking"];
//  [style setImage:[UIImage imageNamed:@"historical-place-map-pin"] forName:@"historical-place"];
//  [style setImage:[UIImage imageNamed:@"bicycle-route-map-pin"] forName:@"bicycle-route"];
  MGLSymbolStyleLayer *clusterLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:MapViewControllerClusterLayerId source:source];
  clusterLayer.textColor = [NSExpression expressionForConstantValue:[ColorsLegacy get].black];
  clusterLayer.textFontSize = [NSExpression expressionForConstantValue:[NSNumber numberWithDouble:20.0]];
  clusterLayer.iconAllowsOverlap = [NSExpression expressionForConstantValue:[NSNumber numberWithBool:YES]];
  clusterLayer.textOffset =  [NSExpression expressionForConstantValue:[NSValue valueWithCGVector:CGVectorMake(0, 0)]];
  clusterLayer.predicate = [NSPredicate predicateWithFormat:@"cluster == YES"];

  NSDictionary *stops = @{@0: [NSExpression expressionForConstantValue:@"markerClustered"]};
  NSExpression *defaultShape = [NSExpression expressionForConstantValue:@"markerClustered"];
  clusterLayer.iconImageName = [NSExpression expressionWithFormat:@"mgl_step:from:stops:(point_count, %@, %@)", defaultShape, stops];
  clusterLayer.text = [NSExpression expressionWithFormat:@"CAST(point_count, 'NSString')"];
  [style setImage:[UIImage imageNamed:@"cluster"] forName:@"markerClustered"];

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

#pragma mark - showBigPicture
- (void)showBigPicture {
  [super showBigPicture];
  [self.mapView showAnnotations:self.annotations animated:YES];
}

#pragma mark - onSearchPress
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
    [weakSelf.navigationController dismissViewControllerAnimated:YES completion:^{}];
  } onViewDidDisappearWithSelectedItem:^(PlaceItem * _Nonnull item) {
    __weak typeof(item) weakItem = item;
    [weakSelf.filterView activateFilterForPlaceItem:weakItem];
    dispatch_async(dispatch_get_main_queue(), ^{
      [weakSelf focusOnSearchItem:weakItem recursionDepth:0 delay:0];
    });
  }];
  searchViewController.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc]  initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(onDonePress:)];
  UINavigationController *searchViewControllerWithNavigation =
  [[UINavigationController alloc ] initWithRootViewController:searchViewController];
  [self presentViewController:searchViewControllerWithNavigation animated:YES
                   completion:^{}];
}

#pragma mark - focusOnSearchItem
- (void)focusOnSearchItem:(PlaceItem *)item
            recursionDepth:(NSUInteger)recursionDepth delay:(int64_t)delay {
  if (self.shouldStopSearchZoom || recursionDepth >=
      kMaxSearchZoomRecursionDepth) {
    return;
  }
  __weak typeof(self) weakSelf = self;
  if (recursionDepth == 0) {
    [self.mapView setCenterCoordinate:item.coords zoomLevel:kZoomLevelForSearch
                            direction:-1 animated:YES completionHandler:^{
      [weakSelf saveMapCoordinates];
      [weakSelf focusOnSearchItem:item recursionDepth:recursionDepth + 1
                            delay:delay];
    }];
    return;
  }

  CGPoint point = [weakSelf.mapView convertCoordinate:item.coords toPointToView:weakSelf.mapView];
  NSSet<NSString *>* layersToSearch = [[NSSet alloc] initWithObjects:MapViewControllerClusterLayerId ,MapViewControllerMarkerLayerId, nil];
  NSArray<id<MGLFeature>> *features = [weakSelf.mapView
                                       visibleFeaturesAtPoint:point
                                       inStyleLayersWithIdentifiers:layersToSearch];
  id<MGLFeature> feature = [features firstObject];

  if (feature && [feature isKindOfClass:[MGLPointFeatureCluster class]]) {
    MGLPointFeatureCluster *cluster = (MGLPointFeatureCluster *)feature;
    MGLSource *source = [self.mapView.style sourceWithIdentifier:MapViewControllerSourceIdAll];
    CGFloat zoom = [(MGLShapeSource *)source zoomLevelForExpandingCluster:cluster];
    if (zoom > 0.0) {
      [self.mapView setCenterCoordinate:item.coords
                              zoomLevel:zoom
                              direction:-1 animated:YES completionHandler:^{
        [weakSelf saveMapCoordinates];
        [weakSelf focusOnSearchItem:item recursionDepth:recursionDepth + 1 delay:0];
      }];
      return;
    }
    [self delayedFocusOnSearchItem:item recursionDepth:recursionDepth + 1 delay:delay];
    return;
  }

  if (feature && [feature isKindOfClass:[MGLPointFeature class]]) {
    weakSelf.selectedItemUUID = item.uuid;
    [weakSelf renderMapItems:weakSelf.mapModel.mapItemsFiltered style:weakSelf.mapView.style];
    // NOTE:on iOS <= 12, search modal requires navigation, thus we need to save map state
    // after item selection.
    [weakSelf saveMapCoordinates];
    [weakSelf showPopupWithItem:item];
    [weakSelf performFeedback];
    return;
  }

  if (recursionDepth > 0) {
    [self delayedFocusOnSearchItem:item recursionDepth:recursionDepth + 1 delay:delay];
  }
}

#pragma mark - delayedFocusOnSearchItem
- (void)delayedFocusOnSearchItem:(PlaceItem *)item
           recursionDepth:(NSUInteger)recursionDepth
                delay:(int64_t)delay {
  CGFloat zoom = self.mapView.zoomLevel;
  int64_t newDelay = delay + (int64_t)(0.3 * NSEC_PER_SEC);
  __weak typeof(self) weakSelf = self;
  [self.mapView setCenterCoordinate:item.coords
                          zoomLevel:zoom
                          direction:-1 animated:YES completionHandler:^{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, newDelay),
                   dispatch_get_main_queue(), ^{
      [weakSelf saveMapCoordinates];
      [weakSelf focusOnSearchItem:item recursionDepth:recursionDepth
                            delay:newDelay];
    });
  }];
}

-(void)onDonePress:(id)sender {
    [self.navigationController dismissViewControllerAnimated:YES
                                                  completion:^{}];
}

- (void)onFilterUpdate:(NSSet<NSString *>*)categoryUUIDs {
    [self.mapModel applyCategoryFilters:categoryUUIDs];
}

- (IBAction)handleMapTap:(UITapGestureRecognizer *)tap {
  MGLSource *source = [self.mapView.style sourceWithIdentifier:MapViewControllerSourceIdAll];
  if (![source isKindOfClass:[MGLShapeSource class]]) {
    return;
  }
  if (tap.state != UIGestureRecognizerStateEnded) {
    return;
  }

  CGPoint point = [tap locationInView:tap.view];
  CGFloat width = kIconSize.width;
  CGRect rect = CGRectMake(point.x - width / 2, point.y - width / 2, width, width);

  NSArray<id<MGLFeature>> *features = [self.mapView visibleFeaturesInRect:rect inStyleLayersWithIdentifiers:[NSSet setWithObjects:MapViewControllerClusterLayerId, MapViewControllerMarkerLayerId, nil]];

  // Pick the first feature (which may be a port or a cluster), ideally selecting
  // the one nearest nearest one to the touch point.
  id<MGLFeature> feature = features.firstObject;
  if (feature && [feature isKindOfClass:[MGLPointFeatureCluster class]]) {
    [self handleMapClusterTap:tap];

    return;
  }
  if (feature && [feature isKindOfClass:[MGLPointFeature class]]) {
    [self performFeedbackForTap:tap];
    id uuid = [feature attributeForKey:@"uuid"];
    if ([uuid isKindOfClass:[NSString class]]) {
      PlaceItem *item = self.indexModel.flatItems[(NSString *)uuid];
      if ([uuid isEqualToString:self.selectedItemUUID]) {
        self.selectedItemUUID = nil;
        [self hidePopup];
      } else {
        self.selectedItemUUID = uuid;
        [self showPopupWithItem:item];
      }
      [self renderMapItems:self.mapModel.mapItemsFiltered
                     style:self.mapView.style];
      [self.mapView setCenterCoordinate:feature.coordinate zoomLevel:self.mapView.zoomLevel animated:YES];

    }
    return;
  }
  [self hidePopup];
}

- (void)performFeedbackForTap:(UITapGestureRecognizer *)tap {
  switch (tap.state) {
    case UIGestureRecognizerStateEnded: {
      [self performFeedback];
      break;
    }
    case UIGestureRecognizerStateFailed:
      self.feedbackGenerator = nil;
    default:
      break;
  }
}

- (void)performFeedback {
  self.feedbackGenerator = [[UISelectionFeedbackGenerator alloc] init];
  [self.feedbackGenerator prepare];
  __weak typeof(self) weakSelf = self;
  [NSTimer scheduledTimerWithTimeInterval:0.1 repeats:NO block:^(NSTimer * _Nonnull timer) {
    [weakSelf.feedbackGenerator selectionChanged];
    weakSelf.feedbackGenerator = nil;
  }];
}

- (void)onPopupShow:(BOOL)visible itemUUID:(nonnull NSString *)itemUUID {
  [super onPopupShow:visible itemUUID:itemUUID];
  if (!visible) {
    self.selectedItemUUID = nil;
    [self renderMapItems:self.mapModel.mapItemsFiltered
                   style:self.mapView.style];
    return;
  }
  if (visible) {
    self.selectedItemUUID = itemUUID;
    [self renderMapItems:self.mapModel.mapItemsFiltered
                   style:self.mapView.style];
  }
}

- (MGLPointFeatureCluster *)firstClusterWithGestureRecognizer:(UIGestureRecognizer *)gestureRecognizer {
  CGPoint point = [gestureRecognizer locationInView:gestureRecognizer.view];
  CGFloat width = kIconSize.width;
  CGRect selectionRect = CGRectMake(point.x - width / 2, point.y - width / 2, width, width);

  NSArray<id<MGLFeature>> *visibleFeaturesInRect = [self.mapView visibleFeaturesInRect:selectionRect
         inStyleLayersWithIdentifiers:[NSSet
                       setWithObjects:MapViewControllerMarkerLayerId, MapViewControllerClusterLayerId, nil]];
  NSPredicate *clusterPredicate = [NSPredicate predicateWithBlock:^BOOL(id  _Nullable evaluatedObject,
                                                                        NSDictionary<NSString *,id> * _Nullable bindings) {
    return [evaluatedObject isKindOfClass:MGLPointFeatureCluster.class];
  }];
  NSArray<id<MGLFeature>> *clusters = [visibleFeaturesInRect filteredArrayUsingPredicate:clusterPredicate];
  return (MGLPointFeatureCluster *)[clusters firstObject];
}

- (IBAction)handleMapClusterTap:(UITapGestureRecognizer *)sender {
  MGLSource *source = [self.mapView.style sourceWithIdentifier:MapViewControllerSourceIdAll];
  if (![source isKindOfClass:MGLShapeSource.class]) {
    return;
  }
  if (sender.state != UIGestureRecognizerStateEnded) {
    return;
  }
  MGLPointFeatureCluster *cluster = [self firstClusterWithGestureRecognizer:sender];
  if (!cluster) {
    return;
  }
  CGFloat zoom = [(MGLShapeSource *)source zoomLevelForExpandingCluster:cluster];
  if (zoom > 0.0) {
    [self.mapView setCenterCoordinate:cluster.coordinate zoomLevel:zoom animated:YES];
  }
}

- (void)showPopupWithItem:(PlaceItem *)item {
  __weak typeof(self) weakSelf = self;
  
  [self.bottomSheet show:item buttonLabel:kBottomSheetButtonLabel onPressDetails:^{
    DetailsViewController *detailsController =
    [[DetailsViewController alloc] initWithApiService:weakSelf.apiService
                                      coreDataService:weakSelf.coreDataService
                                           mapService:weakSelf.mapService
                                           indexModel:weakSelf.indexModel
                                             mapModel:weakSelf.mapModel
                                        locationModel:weakSelf.locationModel
                                          searchModel:weakSelf.searchModel
                                         detailsModel:weakSelf.detailsModel]; 
    detailsController.item = item;
    [weakSelf.navigationController setNavigationBarHidden:NO animated:NO];
    [weakSelf.navigationController pushViewController:detailsController animated:YES];
    [[AnalyticsEvents get] logEvent:AnalyticsEventsMapInteraction withParams:@{
      AnalyticsEventsParamMapInteractionLearnMore: BOOLtoString(NO),
    }];
  } onBookmarkPress:^(BOOL bookmarked) {
    BOOL bookmark = !bookmarked;
    [weakSelf.indexModel bookmarkItem:item bookmark:bookmark];
    [[AnalyticsEvents get] logEvent:AnalyticsEventsMapInteraction withParams:@{
      AnalyticsEventsParamMapInteractionSave: BOOLtoString(bookmark),
    }];
  }];
}

- (void)scrollToTop {
  [self.filterView selectOptionAll:YES];
}

@end
