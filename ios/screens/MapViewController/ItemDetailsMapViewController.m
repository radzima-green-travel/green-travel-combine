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
static NSString* const kPolygonLayerId = @"polygonLayerId";
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
  //[self showPopupWithItem:self.mapItem.correspondingPlaceItem];
}

- (void)viewWillDisappear:(BOOL)animated {
  [self hidePopup];
}

- (void)mapView:(MGLMapView *)mapView didFinishLoadingStyle:(MGLStyle *)style {
    [self renderMapItem:self.mapItem style:style];
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
    });
  }
}

- (void)renderMapItem:(MapItem *)mapItem
                style:(MGLStyle *)style {
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
#pragma mark - Remove sources
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
#pragma mark - Sources
  sourcePoint = [[MGLShapeSource alloc] initWithIdentifier:kSourceIdPoint
                                                  features:@[point]
                                                   options:nil];
  
  NSArray<CLLocation *> *area = mapItem.correspondingPlaceItem.details.area;
  NSMutableArray<id<MGLAnnotation>> *vertices = [[NSMutableArray alloc] init];
  if ([area count]) {
    CLLocationCoordinate2D *coordinates = malloc(sizeof(CLLocationCoordinate2D) * [area count]);
    [area enumerateObjectsUsingBlock:^(CLLocation * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      coordinates[idx] = CLLocationCoordinate2DMake(obj.coordinate.latitude, obj.coordinate.longitude);
    }];
    MGLPolygon *polygonPart = [MGLPolygon polygonWithCoordinates:coordinates count:[area count]];
    
    MGLMultiPolygonFeature *polygon = [MGLMultiPolygonFeature multiPolygonWithPolygons:@[polygonPart]];
    [vertices addObject:polygon];
    sourcePolygon = [[MGLShapeSource alloc] initWithIdentifier:kSourceIdPolygon
                                                      features:@[polygon] options:nil];
    free(coordinates);
  }
  
  NSArray<CLLocation *> *path = mapItem.correspondingPlaceItem.details.path;
  if ([path count]) {
    CLLocationCoordinate2D *coordinates = malloc(sizeof(CLLocationCoordinate2D) * [path count]);
    [path enumerateObjectsUsingBlock:^(CLLocation * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      coordinates[idx] = CLLocationCoordinate2DMake(obj.coordinate.latitude, obj.coordinate.longitude);
    }];
    
    MGLPolylineFeature *polyline = [MGLPolylineFeature polylineWithCoordinates:coordinates count:[path count]];
    [vertices addObject:polyline];
    
    sourcePath = [[MGLShapeSource alloc] initWithIdentifier:kSourceIdPolygon
                                                   features:@[polyline] options:nil];
    free(coordinates);
  }
  
  if (sourcePath) {
    [style addSource:sourcePath];
    
    MGLLineStyleLayer *pathLayer = [[MGLLineStyleLayer alloc] initWithIdentifier:kPathLayerId source:sourcePath];
    pathLayer.lineColor = [NSExpression expressionForConstantValue:[Colors get].persimmon];;
    pathLayer.lineOpacity = [NSExpression expressionForConstantValue:@1];
    pathLayer.lineCap = [NSExpression expressionForConstantValue:@"round"];
    pathLayer.lineWidth =
    [NSExpression expressionForConstantValue:@3.0];
    
    [style addLayer:pathLayer];
  };
  if (sourcePolygon) {
    [style addSource:sourcePolygon];
    
    MGLFillStyleLayer *polygonLayer = [[MGLFillStyleLayer alloc] initWithIdentifier:kPolygonLayerId source:sourcePolygon];
    polygonLayer.fillColor = [NSExpression expressionForConstantValue:[Colors get].persimmon];
    polygonLayer.fillOpacity = [NSExpression expressionForConstantValue:@0.5];
    
    [style addLayer:polygonLayer];
  }
  if (sourcePoint) {
    [style addSource:sourcePoint];
    
    MGLSymbolStyleLayer *pointLayer = [[MGLSymbolStyleLayer alloc] initWithIdentifier:kPointLayerId source:sourcePoint];
    pointLayer.iconImageName = [NSExpression expressionForConstantValue:@"mappin"];
    [style setImage:[UIImage imageNamed:@"map-pin"] forName:@"mappin"];
    
    [style addLayer:pointLayer];
  };
#pragma mark - Layers
  
  
  
  
#pragma mark - Show point, path or polygon
  if ([vertices count]) {
    [self.mapView showAnnotations:vertices animated:YES];
  } else {
    [self.mapView setCenterCoordinate:point.coordinate zoomLevel:8.0 animated:YES];
  }
}

- (IBAction)handleMapTap:(UITapGestureRecognizer *)tap {
  MGLSource *source = [self.mapView.style sourceWithIdentifier:kSourceIdPoint];
  if (![source isKindOfClass:[MGLShapeSource class]]) {
    return;
  }
  if (tap.state != UIGestureRecognizerStateEnded) {
    return;
  }
  
  CGPoint point = [tap locationInView:tap.view];
  CGFloat width = kIconSize.width;
  CGRect rect = CGRectMake(point.x - width / 2, point.y - width / 2, width, width);
  
  NSArray<id<MGLFeature>> *features = [self.mapView visibleFeaturesInRect:rect inStyleLayersWithIdentifiers:[NSSet setWithObjects:kPointLayerId, kPathLayerId, kPolygonLayerId, nil]];
  
  // Pick the first feature (which may be a port or a cluster), ideally selecting
  // the one nearest nearest one to the touch point.
  id<MGLFeature> feature = features.firstObject;
  if (feature && ([feature isKindOfClass:[MGLPointFeature class]] ||
                  [feature isKindOfClass:[MGLMultiPolygonFeature class]] ||
                  [feature isKindOfClass:[MGLPolygonFeature class]] ||
                  [feature isKindOfClass:[MGLPolylineFeature class]])) {
    [self showPopupWithItem:self.mapItem.correspondingPlaceItem];
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
