//
//  MapViewState.m
//  greenTravel
//
//  Created by Alex K on 6/5/21.
//

#import "MapViewState.h"

@interface MapViewState()

@end

@implementation MapViewState

- (void)saveWithMapView:(MGLMapView *)mapView {
  [self setZoomLevel:mapView.zoomLevel];
  [self setCenter:mapView.centerCoordinate];
  [self setShowLocation:mapView.showsUserLocation];
  self.saved = YES;
}

- (void)restoreToMap:(MGLMapView *)mapView {
  if (!self.saved) {
    return;
  }
  
  [mapView setZoomLevel:self.zoomLevel];
  [mapView setCenterCoordinate:self.center];
  [mapView setShowsUserLocation:NO];
  [mapView setShowsUserLocation:self.showLocation];
  [mapView setShowsUserHeadingIndicator:NO];
  [mapView setShowsUserHeadingIndicator:self.showLocation];
  [mapView updateUserLocationAnnotationView];
}

@end
