//
//  MapViewStateOwner.h
//  MapViewStateOwner
//
//  Created by Alex K on 27.09.21.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

#ifndef MapViewStateOwner_h
#define MapViewStateOwner_h


#endif /* MapViewStateOwner_h */

@protocol MapViewToStateIntermediary <NSObject>

- (void)passShowsUserLocation:(BOOL)showsUserLocation;
- (void)passDirections:(NSArray<CLLocation *> *)directions;
- (void)passRotation:(CLLocationDirection)direction;
- (void)passZoomLevel:(CGFloat)zoomLevel;
- (void)passCenterCoordinate:(CLLocationCoordinate2D)centerCoordinate;

@end
