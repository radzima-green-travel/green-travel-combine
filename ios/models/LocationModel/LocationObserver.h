//
//  LocationObserver.h
//  GreenTravel
//
//  Created by Alex K on 9/2/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@class CLLocation;

@protocol LocationObserver <NSObject>

- (void)onLocationUpdate:(CLLocation *)lastLocation;
- (void)onAuthorizationStatusChange:(CLAuthorizationStatus)status; 

@end

NS_ASSUME_NONNULL_END
