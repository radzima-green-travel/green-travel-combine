//
//  UIImage+extensions.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 29.07.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIImage (Extension)

- (UIImage *)tintedImage:(UIColor *)color;
- (UIImage *)named:(NSString *)imageName withTintColor:(UIColor *)color;

@end

NS_ASSUME_NONNULL_END
