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
  MapViewStateSaveOptionZoom = 1 << 0,
  MapViewStateSaveOptionCenter = 1 << 1,
  MapViewStateSaveOptionLocation = 1 << 2,
  MapViewStateSaveOptionDirections = 1 << 3,
  MapViewStateSaveOptionRotation = 1 << 4,
  MapViewStateSaveOptionAngle = 1 << 5,
};

@interface MapViewState : NSObject

@property (assign, nonatomic) MapViewStateSaveOption saved;
@property (assign, nonatomic) BOOL showLocation;
@property (strong, nonatomic) NSArray<CLLocation *> *directions;
@property (assign, nonatomic) double zoomLevel;
@property (assign, nonatomic) CLLocationDirection direction;  
@property (assign, nonatomic) CLLocationCoordinate2D center;
- (void)restoreToMap:(id<MapViewToStateIntermediary>)mapIntermediary;

@end

NS_ASSUME_NONNULL_END
