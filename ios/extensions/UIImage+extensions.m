//
//  UIImage+extensions.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 29.07.22.
//

#import "UIImage+extensions.h"
#import "Typography.h"
#import "Colors.h"

@implementation UIImage (Extension)

- (UIImage *)tintedImage:(UIColor *)color {
  UIGraphicsBeginImageContextWithOptions(self.size, NO, self.scale);
  
  CGRect imageRect = CGRectMake(0, 0, self.size.width, self.size.height);
  [color setFill];
  UIRectFill(imageRect);
  [self drawInRect:imageRect blendMode:kCGBlendModeDestinationIn alpha:1.0];
  UIImage *tintedImage = UIGraphicsGetImageFromCurrentImageContext();
  return tintedImage;
}

- (UIImage *)drawText:(NSString*)text {
  
  UIFont *font = [UIFont boldSystemFontOfSize:22];
  UIGraphicsBeginImageContextWithOptions(self.size, NO, self.scale);
  [self drawInRect:CGRectMake(0,0,self.size.width,self.size.height)];

  NSDictionary *textAttributes = @{
    NSFontAttributeName: font,
    NSForegroundColorAttributeName: [UIColor whiteColor]
  };
  CGSize textSize = [text sizeWithAttributes:textAttributes];
  CGFloat textY = (self.size.height - textSize.height) / 2;
  CGFloat textX = (self.size.width - textSize.width) / 2;
  CGRect textRect = CGRectMake(textX, textY, self.size.width, textSize.height);
  
  [text drawInRect:CGRectIntegral(textRect) withAttributes:textAttributes];
  UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  return newImage;
}

- (UIImage *)getAccountImageWithChar:(NSString*)character {
  NSArray *colorsSet = @[
    [Colors get].accountImageBlue,
    [Colors get].accountImageRed,
    [Colors get].accountImagePink,
    [Colors get].accountImageGreen,
    [Colors get].accountImageOrange,
    [Colors get].accountImageMustard,
    [Colors get].accountImagePurple,
    [Colors get].accountImageLightBlue,
    [Colors get].accountImageFireOrange
  ];
  UIColor *randomColor = colorsSet[arc4random_uniform((int)[colorsSet count])];
  UIImage* accountImage = [[[UIImage imageNamed:@"accountPhoto"] tintedImage:randomColor] drawText:character];
  return accountImage;
}

+ (UIImage *)named:(NSString *)imageName withTintColor:(UIColor *)color {
  UIImage *image = [[[UIImage imageNamed:imageName]
                     imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate]
                    tintedImage:color];
  return image;
}

@end
