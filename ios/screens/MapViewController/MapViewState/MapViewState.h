//
//  MapViewState.h
//  greenTravel
//
//  Created by Alex K on 6/5/21.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
@import Mapbox;

NS_ASSUME_NONNULL_BEGIN

typedef NS_OPTIONS(NSUInteger, MapViewStateSaveOption) {
  MapViewStateSaveOptionZoomAndCenter = 1 << 0,
  MapViewStateSaveOptionLocation = 1 << 1,
  MapViewStateSaveOptionDirections = 1 << 2,
  MapViewStateSaveOptionRotation = 1 << 3,
  MapViewStateSaveOptionAngle = 1 << 4,
};

@interface MapViewState : NSObject

@property (assign, nonatomic) MapViewStateSaveOption saved;
@property (assign, nonatomic) BOOL showLocation;
- (void)saveFromMapView:(MGLMapView *)mapView;
- (void)restoreToMap:(MGLMapView *)mapView;

@end

NS_ASSUME_NONNULL_END
