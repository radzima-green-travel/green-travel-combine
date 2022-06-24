//
//  DeviceRotationObservable.h
//  greenTravel
//
//  Created by Vitaly Nabarouski on 6/24/22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


@protocol DeviceRotationObservable <NSObject>

- (void)addDeviceOrientationObserver;
- (void)removeDeviceOrientationObserver;

@end

NS_ASSUME_NONNULL_END
