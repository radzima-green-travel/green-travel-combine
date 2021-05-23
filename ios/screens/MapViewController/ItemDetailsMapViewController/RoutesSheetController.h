//
//  RoutesSheet.h
//  greenTravel
//
//  Created by Alex K on 5/23/21.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@class UIAlertController;

@interface RoutesSheetController : NSObject

- (void)show:(BOOL)useSourceDestiny
locationSource:(CLLocationCoordinate2D)locationSource
locationDestination:(CLLocationCoordinate2D)locationDestination
locationTitle:(NSString *)locationTitle
   presenter:(void(^)(UIAlertController *))presenter;
+ (instancetype)get;

@end

NS_ASSUME_NONNULL_END
