//
//  LocationService.h
//  GreenTravel
//
//  Created by Alex K on 9/2/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LocationObservable.h"
#import <CoreLocation/CoreLocation.h>
@import Mapbox;

NS_ASSUME_NONNULL_BEGIN

@protocol LocationObserver;

typedef NS_ENUM(NSInteger, LocationModelLocationStatus) {
  LocationModelLocationStatusToBeAsked = 0,
  LocationModelLocationStatusGranted = 1,
  LocationModelLocationStatusDenied = 2,
};

@interface LocationModel : NSObject <LocationObservable, CLLocationManagerDelegate, MGLLocationManager>

@property (strong, nonatomic) CLLocationManager *locationManager;
@property (assign, nonatomic) LocationModelLocationStatus locationMonitoringStatus;
@property (strong, nonatomic) NSMutableArray<id<LocationObserver>> *locationObservers;
@property (strong, nonatomic, nullable) CLLocation *lastLocation;

- (instancetype)init;
- (void)authorize;
- (void)startMonitoring;
- (void)stopMonitoring;

@end

NS_ASSUME_NONNULL_END
