//
//  MapViewState.m
//  greenTravel
//
//  Created by Alex K on 6/5/21.
//

#import "MapViewState.h"
#import "MapViewToStateIntermediary.h"

@interface MapViewState()

@end

@implementation MapViewState

- (void)setZoomLevel:(double)zoomLevel {
  _zoomLevel = zoomLevel;
  self.saved = self.saved | MapViewStateSaveOptionZoom;
}

- (void)setCenter:(CLLocationCoordinate2D)center {
  _center = center;
  self.saved = self.saved | MapViewStateSaveOptionCenter;
}

- (void)setShowLocation:(BOOL)showLocation {
  _showLocation = showLocation;
  self.saved = self.saved | MapViewStateSaveOptionLocation;
}

- (void)setDirections:(NSArray<CLLocation *> *)directions {
  _directions = directions;
  self.saved = self.saved | MapViewStateSaveOptionDirections;
}

- (void)setDirection:(CLLocationDirection)direction {
  _direction = direction;
  self.saved = self.saved | MapViewStateSaveOptionRotation;
}

- (void)setPitch:(CGFloat)pitch {
  _pitch = pitch;
  self.saved = self.saved | MapViewStateSaveOptionPitch;
}

- (void)restoreToMap:(id<MapViewToStateIntermediary>)mapIntermediary {
  if (self.saved & MapViewStateSaveOptionLocation) {
    [mapIntermediary passShowsUserLocation:self.showLocation];
  }
  if (self.saved & MapViewStateSaveOptionPitch) {
    [mapIntermediary passPitch:self.pitch];
  } else {
    [mapIntermediary passPitch:0];
  }
  if (self.saved & MapViewStateSaveOptionZoom) {
    [mapIntermediary passZoomLevel:self.zoomLevel];
  }
  if (self.saved & MapViewStateSaveOptionCenter) {
    [mapIntermediary passCenterCoordinate:self.center];
  }
  if (self.saved & MapViewStateSaveOptionDirections) {
    [mapIntermediary passDirections:self.directions];
  }
  if (self.saved & MapViewStateSaveOptionRotation) {
    [mapIntermediary passRotation:self.direction];
  } else {
    [mapIntermediary passRotation:0];
  }
}

@end
