//
//  MapViewState.m
//  greenTravel
//
//  Created by Alex K on 6/5/21.
//

#import "MapViewState.h"

@interface MapViewState()

@property (assign, nonatomic) double zoomLevel;
@property (assign, nonatomic) CLLocationCoordinate2D center;

@end

@implementation MapViewState

- (void)saveFromMapView:(MGLMapView *)mapView {
  [self setZoomLevel:mapView.zoomLevel];
  [self setCenter:mapView.centerCoordinate];
  self.saved = self.saved | MapViewStateSaveOptionZoomAndCenter;
}

- (void)setShowLocation:(BOOL)showLocation {
  self.saved = self.saved | MapViewStateSaveOptionLocation;
}

- (void)restoreToMap:(MGLMapView *)mapView {
  if (self.saved & MapViewStateSaveOptionLocation) {
    [mapView setShowsUserLocation:self.showLocation];
    [mapView setShowsUserHeadingIndicator:self.showLocation];
    [mapView updateUserLocationAnnotationView];
  }
  if (self.saved & MapViewStateSaveOptionZoomAndCenter) {
    [mapView setZoomLevel:self.zoomLevel];
    [mapView setCenterCoordinate:self.center];
  }
}

@end
