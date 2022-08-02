//
//  UIButton+UIButton_extensions.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 2.08.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIButton (Extensions)

- (void)setImageForSelectedState:(nonnull UIImage *)imageForSelectedState imageForNormalState:(nonnull UIImage *)imageForNormalState;

@end

NS_ASSUME_NONNULL_END
