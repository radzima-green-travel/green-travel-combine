//
//  MapViewState.h
//  greenTravel
//
//  Created by Alex K on 6/5/21.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
@import Mapbox;
#import "MapViewToStateIntermediary.h"

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
@property (strong, nonatomic) NSArray<CLLocation *> *directions;
- (void)saveFromMapView:(id<MapViewToStateIntermediary>)mapIntermediary;
- (void)restoreToMap:(id<MapViewToStateIntermediary>)mapIntermediary;

@end

NS_ASSUME_NONNULL_END
