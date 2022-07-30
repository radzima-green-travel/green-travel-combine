//
//  UIImage+extensions.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 29.07.22.
//

#import "UIImage+extensions.h"

@implementation UIImage (Extension)

- (UIImage *)tintedImage:(UIColor *)color {
    CGRect rect = CGRectMake(0.f, 0.f, self.size.width, self.size.height);
    CGImageRef alphaMask;

    {
        UIGraphicsBeginImageContext(rect.size);
        CGContextRef context = UIGraphicsGetCurrentContext();

        CGContextTranslateCTM(context, 0, rect.size.height);
        CGContextScaleCTM(context, 1.0, -1.0);
        [self drawInRect: rect];

        alphaMask = CGBitmapContextCreateImage(context);

        UIGraphicsEndImageContext();
    }

    UIGraphicsBeginImageContext(rect.size);

    CGContextRef context = UIGraphicsGetCurrentContext();

    [self drawInRect:rect];
    CGContextClipToMask(context, rect, alphaMask);

    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextSetFillColorSpace(context, colorSpace);
    CGContextSetFillColorWithColor(context, color.CGColor);
    UIRectFillUsingBlendMode(rect, kCGBlendModeNormal);

    UIImage *tintedImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    CGColorSpaceRelease(colorSpace);
    CGImageRelease(alphaMask);

    return tintedImage;
}

@end
