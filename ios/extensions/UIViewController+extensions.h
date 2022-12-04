//
//  UIViewController+extensions.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 4.12.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIViewController (Extensions)

- (void)showAlertWith:(nullable NSString *)title message:(nullable NSString *)message actions:(nonnull NSArray *)actions handler:(void (^)(UIAlertAction*))handler;

- (void)showAlertWith:(nullable NSString *)title message:(nullable NSString *)message handler:(void (^)(NSString*))handler;

@end

NS_ASSUME_NONNULL_END
