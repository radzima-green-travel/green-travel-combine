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

@interface MapViewState : NSObject

@property (assign, nonatomic) BOOL saved;
@property (assign, nonatomic) double zoomLevel;
@property (assign, nonatomic) CLLocationCoordinate2D center;
@property (assign, nonatomic) BOOL showLocation;
- (void)saveWithMapView:(MGLMapView *)mapView;
- (void)restoreToMap:(MGLMapView *)mapView;

@end

NS_ASSUME_NONNULL_END
