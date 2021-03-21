//
//  StyleUtils.m
//  GreenTravel
//
//  Created by Alex K on 8/19/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "StyleUtils.h"
#import "Colors.h"
#import "TextUtils.h"


CAGradientLayer* createGradientLayer(UIView *view) {
    CAGradientLayer *gradient = [[CAGradientLayer alloc] init];
    gradient.frame = view.bounds;
    gradient.colors = @[(__bridge id)[Colors get].green.CGColor, (__bridge id)[Colors get].shamrock.CGColor];
    gradient.startPoint = CGPointMake(0, 0);
    gradient.endPoint = CGPointMake(1, 0);
    return gradient;
}

CAGradientLayer* createOverlayLayer(UIView *view) {
    if (CGRectEqualToRect(view.bounds, CGRectZero)) {
        return nil;
    };
    CAGradientLayer *gradient = [[CAGradientLayer alloc] init];
    gradient.frame = view.bounds;
    gradient.colors = @[(__bridge id)[Colors get].heavyMetal.CGColor, (__bridge id)UIColor.clearColor.CGColor];
    gradient.startPoint = CGPointMake(0, 0);
    gradient.endPoint = CGPointMake(0, 0.6);
    return gradient;
}

void insertGradientLayer(UIView *view, CGFloat cornerRadius) {
    CAGradientLayer *gradient = createGradientLayer(view);
    if (cornerRadius) {
        gradient.cornerRadius = cornerRadius;
    }
    if (!gradient.superlayer) {
        [view.layer insertSublayer:gradient atIndex:0];
    }
}

UIImage* getGradientImageToFillRectWithRadius(CGRect rect, CGFloat cornerRadius) {
    CAGradientLayer *gradient = [[CAGradientLayer alloc] init];
    gradient.frame = rect;
    gradient.colors = @[(__bridge id)[Colors get].green.CGColor, (__bridge id)[Colors get].shamrock.CGColor];
    gradient.startPoint = CGPointMake(0, 0);
    gradient.endPoint = CGPointMake(1, 0);
    if (cornerRadius) {
        gradient.cornerRadius = cornerRadius;
    }
    
    UIImage* gradientImage;
    UIGraphicsBeginImageContext(gradient.frame.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    
    [gradient renderInContext:context];
    gradientImage = [UIGraphicsGetImageFromCurrentImageContext() resizableImageWithCapInsets:UIEdgeInsetsZero resizingMode:UIImageResizingModeStretch];
    UIGraphicsEndImageContext();
    return gradientImage;
}

UIImage* getGradientImageToFillRect(CGRect rect) {
    return getGradientImageToFillRectWithRadius(rect, 0.0);
}

void configureNavigationBar(UINavigationBar *navigationBar) {
    navigationBar.titleTextAttributes = getTextAttributes([Colors get].white, 16.0, UIFontWeightSemibold);
    navigationBar.barStyle = UIBarStyleBlack;
    navigationBar.tintColor = [Colors get].white;
#pragma mark - Navigation item gradient
    CGRect navBarBounds = navigationBar.bounds;
    
    navBarBounds.size.height += UIApplication.sharedApplication.statusBarFrame.size.height;
    
    [navigationBar setBackgroundImage:getGradientImageToFillRect(navBarBounds) forBarPosition:UIBarPositionAny barMetrics:UIBarMetricsDefault];
}

void drawShadow(UIView *view) {
    UIBezierPath *shadowPath = [UIBezierPath bezierPathWithRect:view.bounds];
    view.layer.masksToBounds = NO;
    view.layer.shadowColor = [[Colors get].heavyMetal CGColor];
    view.layer.shadowOpacity = 0.2;
    view.layer.shadowOffset = CGSizeMake(0.0, 5.0);
    view.layer.shadowRadius = 8.0;
    view.layer.shadowPath = [shadowPath CGPath];
}
