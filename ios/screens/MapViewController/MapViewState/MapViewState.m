//
//  MapViewState.m
//  greenTravel
//
//  Created by Alex K on 6/5/21.
//

#import "MapViewState.h"
#import "MapViewToStateIntermediary.h"

@interface MapViewState()

@property (assign, nonatomic) double zoomLevel;
@property (assign, nonatomic) CLLocationCoordinate2D center;

@end

@implementation MapViewState

- (void)saveFromMapView:(id<MapViewToStateIntermediary>)mapIntermediary {
  [self setZoomLevel:[mapIntermediary retrieveZoomLevel]];
  [self setCenter:[mapIntermediary retrieveCenterCoordinate]];
  self.saved = self.saved | MapViewStateSaveOptionZoomAndCenter;
}

- (void)setShowLocation:(BOOL)showLocation {
  _showLocation = showLocation;
  self.saved = self.saved | MapViewStateSaveOptionLocation;
}

- (void)setDirections:(NSArray<CLLocation *> *)directions {
  _directions = directions;
  self.saved = self.saved | MapViewStateSaveOptionDirections;
}

- (void)restoreToMap:(id<MapViewToStateIntermediary>)mapIntermediary {
  if (self.saved & MapViewStateSaveOptionLocation) {
    [mapIntermediary passShowsUserLocation:self.showLocation];
  }
  if (self.saved & MapViewStateSaveOptionZoomAndCenter) {
    [mapIntermediary passZoomLevel:self.zoomLevel];
    [mapIntermediary passCenterCoordinate:self.center];
  }
  if (self.saved & MapViewStateSaveOptionDirections) {
    [mapIntermediary passDirections:self.directions];
  }
}

@end
