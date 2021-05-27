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
@class Directions;

@interface RoutesSheetController : NSObject

- (void)show:(Directions *)directions
   presenter:(void(^)(UIAlertController *))presenter;
+ (instancetype)get;

@end

NS_ASSUME_NONNULL_END
