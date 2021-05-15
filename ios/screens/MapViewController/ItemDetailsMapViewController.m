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
#import "PlaceDetails.h"

@interface ItemDetailsMapViewController ()

@end

static NSString* const kSourceIdPoint = @"sourceIdPoint";
static NSString* const kSourceIdPath = @"sourceIdPath";
static NSString* const kSourceIdPolygon = @"sourceIdPolygon";
static NSString* const kPolygonLayerId = @"olygonLayerId";
static NSString* const kPathLayerId = @"pathLayerId";
static NSString* const kPointLayerId = @"pointLayerId";
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
      [weakSelf renderMapItem:@[mapItemNew] style:weakSelf.mapView.style];
    });
  }
}

- (void)renderMapItem:(MapItem *)mapItem style:(MGLStyle *)style {
  [self.mapView removeAnnotations:self.mapView.annotations];
  MGLPointFeature *point = [[MGLPointFeature alloc] init];
  point.coordinate = mapItem.coords;
  point.title = mapItem.title;
  point.attributes = @{
    @"icon": mapItem.correspondingPlaceItem.category.icon,
    @"title": mapItem.title,
    @"uuid": mapItem.correspondingPlaceItem.uuid,
    @"bookmarked":[NSNumber numberWithBool:mapItem.correspondingPlaceItem.bookmarked],
  };
  
  MGLShapeSource *sourcePoint = (MGLShapeSource *)[style sourceWithIdentifier:kSourceIdPoint];
  MGLShapeSource *sourcePath = (MGLShapeSource *)[style sourceWithIdentifier:kSourceIdPath];
  MGLShapeSource *sourcePolygon = (MGLShapeSource *)[style sourceWithIdentifier:kSourceIdPolygon];
  if ([style layerWithIdentifier:kPolygonLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:kPolygonLayerId]];
  }
  if ([style layerWithIdentifier:kPathLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:kPathLayerId]];
  }
  if ([style layerWithIdentifier:kPointLayerId] != nil) {
    [style removeLayer:[style layerWithIdentifier:kPointLayerId]];
  }
  
  source =
  [[MGLShapeSource alloc] initWithIdentifier:kSourceId
                                    features:mapAnnotations
                                     options:@{
                                       MGLShapeSourceOptionClustered: @YES,
                                       MGLShapeSourceOptionClusterRadius: @50.0
                                     }];
  
  MGLSymbolStyleLayer *markerLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:kMarkerLayerId source:source];
  markerLayer.iconImageName = [NSExpression expressionForConstantValue:@"mapPin"];
  
  
  
  if ([mapItem.correspondingPlaceItem.details.area count]) {
    NSMutableArray<MGLPointFeature *> *vertices = [[NSMutableArray alloc] init];
    [mapItem.correspondingPlaceItem.details.area enumerateObjectsUsingBlock:^(CLLocation * _Nonnull location, NSUInteger idx, BOOL * _Nonnull stop) {
      MGLPointFeature *point = [[MGLPointFeature alloc] init];
      point.coordinate = CLLocationCoordinate2DMake(location.coordinate.latitude, location.coordinate.longitude);
      [vertices addObject:point];
    }];
    sourcePolygon = [[MGLShapeSource alloc] initWithIdentifier:kSourceIdPolygon
                                                      features:vertices options:nil];
  }
  if ([mapItem.correspondingPlaceItem.details.path count]) {
    NSMutableArray<MGLPointFeature *> *vertices = [[NSMutableArray alloc] init];
    [mapItem.correspondingPlaceItem.details.path enumerateObjectsUsingBlock:^(CLLocation * _Nonnull location, NSUInteger idx, BOOL * _Nonnull stop) {
      MGLPointFeature *point = [[MGLPointFeature alloc] init];
      point.coordinate = CLLocationCoordinate2DMake(location.coordinate.latitude, location.coordinate.longitude);
      [vertices addObject:point];
    }];
    sourcePath = [[MGLShapeSource alloc] initWithIdentifier:kSourceIdPolygon
                                                   features:vertices options:nil];
  }
  sourcePoint =
  [[MGLShapeSource alloc] initWithIdentifier:kSourceIdPoint
                                    features:mapAnnotation options:nil];
  
  if ([mapAnnotations count] > 1) {
    [self.mapView showAnnotations:mapAnnotations animated:YES];
  }
  if ([mapAnnotations count] == 1){
    MGLPointFeature *point = mapAnnotations.firstObject;
    [self.mapView setCenterCoordinate:point.coordinate zoomLevel:8.0 animated:YES];
  }
  
  [style addSource:sourcePoint];
  [style addSource:sourcePath];
  [style addSource:sourcePolygon];
  
  MGLSymbolStyleLayer *pointLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:kPointLayerId source:kSourceIdPoint];
  pointLayer.iconImageName = [NSExpression expressionForConstantValue:@"mappin"];
  [style setImage:[UIImage imageNamed:@"map-pin"] forName:@"mappin"];
  
  MGLLineStyleLayer *pathLayer = [[MGLFillStyleLayer alloc] initWithIdentifier:kPathLayerId source:sourcePath];
  pathLayer.lineColor = [NSExpression expressionForConstantValue:[Colors get].apple];;
  pathLayer.lineOpacity = [NSExpression expressionForConstantValue:@0.5];;
  pathLayer.lineCap = [NSExpression expressionForConstantValue:@"round"];;
  pathLayer.lineWidth =
  [NSExpression expressionForConstantValue:@3.0];
  
  MGLFillStyleLayer *polygonLayer = [[MGLFillStyleLayer alloc] initWithIdentifier:kPolygonLayerId source:sourcePolygon];
  polygonLayer.fillColor = [NSExpression expressionForConstantValue:[Colors get].apple];
  polygonLayer.fillOpacity = [NSExpression expressionForConstantValue:@0.5];
  
  [style addLayer:pointLayer];
  [style addLayer:pathLayer];
  [style addLayer:polygonLayer];
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
