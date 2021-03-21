//
//  LocationService.m
//  GreenTravel
//
//  Created by Alex K on 9/2/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "LocationModel.h"
#import <CoreLocation/CoreLocation.h>
#import "LocationObserver.h"

@interface LocationModel ()

@property (strong, nonatomic) CLLocationManager *locationManager;

@end


@implementation LocationModel

- (instancetype)init
{
    self = [super init];
    if (self) {
        _locationManager = [[CLLocationManager alloc] init];
        _locationManager.delegate = self;
        _locationObservers = [[NSMutableArray alloc] init];
    }
    return self;
}

- (void)addObserver:(nonnull id<LocationObserver>)observer {
    if ([self.locationObservers containsObject:observer]) {
        return;
    }
    [self.locationObservers addObject:observer];
}

- (void)notifyObservers {
    __weak typeof(self) weakSelf = self;
    [self.locationObservers enumerateObjectsUsingBlock:^(id<LocationObserver>  _Nonnull observer, NSUInteger idx, BOOL * _Nonnull stop) {
        [observer onLocationUpdate:weakSelf.lastLocation];
    }];
}

- (void)removeObserver:(nonnull id<LocationObserver>)observer {
    [self.locationObservers removeObject:observer];
}

- (void)authorize {
    if([CLLocationManager significantLocationChangeMonitoringAvailable]) {
        [self.locationManager requestWhenInUseAuthorization];
    }
}

- (void)startMonitoring {
    [self.locationManager startMonitoringSignificantLocationChanges];
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {
    if (status == kCLAuthorizationStatusAuthorizedWhenInUse) {
        self.locationEnabled = YES;
        [self.locationObservers enumerateObjectsUsingBlock:^(id<LocationObserver>  _Nonnull observer, NSUInteger idx, BOOL * _Nonnull stop) {
            [observer onAuthorizationStatusChange:status];
        }];
    }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
    if ([locations count] > 0) {
        self.lastLocation = locations[[locations count] - 1];
    } else {
        self.lastLocation = nil;
    }
    [self notifyObservers];
}

@end
