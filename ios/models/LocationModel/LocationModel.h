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

NS_ASSUME_NONNULL_BEGIN

@protocol LocationObserver;

@interface LocationModel : NSObject <LocationObservable, CLLocationManagerDelegate>

@property (assign, nonatomic) BOOL locationEnabled;
@property (strong, nonatomic) NSMutableArray<id<LocationObserver>> *locationObservers;
@property (strong, nonatomic, nullable) CLLocation *lastLocation;

- (instancetype)init;
- (void)authorize;
- (void)startMonitoring;

@end

NS_ASSUME_NONNULL_END
