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

@interface ItemDetailsMapViewController ()

@end

static NSString* const kSourceId = @"sourceId";
static NSString* const kClusterLayerId = @"clusterLayerId";
static NSString* const kMarkerLayerId = @"markerLayerId";
static const CGSize kIconSize = {.width = 20.0, .height = 20.0};

@implementation ItemDetailsMapViewController

#pragma mark - viewDidLoad
- (void)viewDidLoad {
  [super viewDidLoad];
  [self addBottomSheet:@"В путь"];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
}

- (void)viewDidDisappear:(BOOL)animated {
}

- (void)mapView:(MGLMapView *)mapView didFinishLoadingStyle:(MGLStyle *)style {
    NSArray<MapItem *> *mapItems = self.mapItem ? @[self.mapItem] : @[];
    [self renderMapItems:mapItems style:style];
}

- (void)onMapItemsUpdate:(NSArray<MapItem *> *)mapItems {
  NSLog(@"Map items: %@", mapItems);
  MapItem *mapItemNew =
  [mapItems filteredArrayUsingPredicate:[NSPredicate
                                         predicateWithFormat:@"uuid = %@",
                                         self.mapItem.uuid]].firstObject;
  if (mapItemNew) {
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
      [weakSelf renderMapItems:@[mapItemNew] style:weakSelf.mapView.style];
    });
  }
}

- (void)renderMapItems:(NSArray<MapItem *> *)mapItems style:(MGLStyle *)style {
  NSMutableArray *mapAnnotations = [[NSMutableArray alloc] init];
  [self.mapView removeAnnotations:self.mapView.annotations];
  [mapItems enumerateObjectsUsingBlock:^(MapItem * _Nonnull mapItem, NSUInteger idx, BOOL * _Nonnull stop) {
    MGLPointFeature *point = [[MGLPointFeature alloc] init];
    point.coordinate = mapItem.coords;
    point.title = mapItem.title;
    point.attributes = @{
      @"icon": mapItem.correspondingPlaceItem.category.icon,
      @"title": mapItem.title,
      @"uuid": mapItem.correspondingPlaceItem.uuid,
      @"bookmarked":[NSNumber numberWithBool:mapItem.correspondingPlaceItem.bookmarked],
    };
    [mapAnnotations addObject:point];
  }];
  if ([mapAnnotations count] > 1) {
    [self.mapView showAnnotations:mapAnnotations animated:YES];
  }
  if ([mapAnnotations count] == 1){
    MGLPointFeature *point = mapAnnotations.firstObject;
    [self.mapView setCenterCoordinate:point.coordinate zoomLevel:8.0 animated:YES];
  }
  
  MGLShapeSource *source = (MGLShapeSource *)[style sourceWithIdentifier:kSourceId];
  if ([style layerWithIdentifier:kMarkerLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:kMarkerLayerId]];
  }
  if ([style sourceWithIdentifier:kSourceId] != nil) {
    [style removeSource:[style sourceWithIdentifier:kSourceId]];
  }
  
  source =
  [[MGLShapeSource alloc] initWithIdentifier:kSourceId
                                    features:mapAnnotations
                                     options:@{
                                       MGLShapeSourceOptionClustered: @YES,
                                       MGLShapeSourceOptionClusterRadius: @50.0
                                     }];
  
  [style addSource:source];
  
  MGLSymbolStyleLayer *markerLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:kMarkerLayerId source:source];
  markerLayer.iconImageName = [NSExpression expressionForConstantValue:@"mapPin"];
  [style setImage:[UIImage imageNamed:@"map-pin"] forName:@"mapPin"];
  
  [style addLayer:markerLayer];
}


- (IBAction)handleMapTap:(UITapGestureRecognizer *)tap {
  MGLSource *source = [self.mapView.style sourceWithIdentifier:kSourceId];
  if (![source isKindOfClass:[MGLShapeSource class]]) {
    return;
  }
  if (tap.state != UIGestureRecognizerStateEnded) {
    return;
  }
  
  CGPoint point = [tap locationInView:tap.view];
  CGFloat width = kIconSize.width;
  CGRect rect = CGRectMake(point.x - width / 2, point.y - width / 2, width, width);
  
  NSArray<id<MGLFeature>> *features = [self.mapView visibleFeaturesInRect:rect inStyleLayersWithIdentifiers:[NSSet setWithObjects:kClusterLayerId, kMarkerLayerId, nil]];
  
  // Pick the first feature (which may be a port or a cluster), ideally selecting
  // the one nearest nearest one to the touch point.
  id<MGLFeature> feature = features.firstObject;
  UIColor *color = UIColor.redColor;
  
  if (feature && [feature isKindOfClass:[MGLPointFeature class]]) {
    id uuid = [feature attributeForKey:@"uuid"];
    if ([uuid isKindOfClass:[NSString class]]) {
      PlaceItem *item = self.indexModel.flatItems[(NSString *)uuid];
      color = UIColor.blackColor;
      [self.mapView setCenterCoordinate:feature.coordinate zoomLevel:self.mapView.zoomLevel animated:YES];
      [self showPopupWithItem:item];
    }
    return;
  }
  [self hidePopup];
}

- (void)showPopupWithItem:(PlaceItem *)item {
  __weak typeof(self) weakSelf = self;
  [self.bottomSheet show:item onNavigatePress:^{
    NSURL *geoURL = [NSURL URLWithString:@"geo:53.9006,27.5590"];
    [[UIApplication sharedApplication] openURL:geoURL options:@{} completionHandler:^(BOOL success) {}];
  } onBookmarkPress:^(BOOL bookmarked) {
    [weakSelf.indexModel bookmarkItem:item bookmark:!bookmarked];
  }];
}

@end
