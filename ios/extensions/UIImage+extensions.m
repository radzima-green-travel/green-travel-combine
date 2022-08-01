//
//  UIImage+extensions.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 29.07.22.
//

#import "UIImage+extensions.h"

@implementation UIImage (Extension)

- (UIImage *)tintedImage:(UIColor *)color {
  UIGraphicsBeginImageContextWithOptions(self.size, FALSE, self.scale);
  
  CGRect drawRect = CGRectMake(0, 0, self.size.width, self.size.height);
  [color setFill];
  UIRectFill(drawRect);
  [self drawInRect:drawRect blendMode:kCGBlendModeDestinationIn alpha:1.0];
  UIImage *tintedImage = UIGraphicsGetImageFromCurrentImageContext();
  return tintedImage;
}

@end
