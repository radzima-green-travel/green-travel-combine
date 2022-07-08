//
//  StyleUtils.m
//  GreenTravel
//
//  Created by Alex K on 8/19/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "StyleUtils.h"
#import "Colors.h"
#import "ColorsLegacy.h"
#import "TextUtils.h"
#import "TypographyLegacy.h"


CAGradientLayer* createGradientLayer(UIView *view) {
    CAGradientLayer *gradient = [[CAGradientLayer alloc] init];
    gradient.frame = view.bounds;
    gradient.colors = @[(__bridge id)[Colors get].navigationBarColorStart.CGColor,
                        (__bridge id)[Colors get].navigationBarColorStop.CGColor];
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
    gradient.colors = @[(__bridge id)[ColorsLegacy get].heavyMetal.CGColor, (__bridge id)UIColor.clearColor.CGColor];
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
    gradient.colors = @[(__bridge id)[Colors get].navigationBarColorStart.CGColor,
                        (__bridge id)[Colors get].navigationBarColorStop.CGColor];
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
  CGRect navBarBounds = navigationBar.bounds;
  navBarBounds.size.height += UIApplication.sharedApplication.statusBarFrame.size.height;
  
  if (@available(iOS 15.0, *)) {
    UINavigationBarAppearance *appearance = [[UINavigationBarAppearance alloc] init];
    [appearance configureWithOpaqueBackground];
    appearance.backgroundImage = getGradientImageToFillRect(navBarBounds);
    appearance.backgroundEffect = nil;
    appearance.titleTextAttributes = getTextAttributes([Colors get].navigationBarTint, 16.0, UIFontWeightSemibold);
    navigationBar.standardAppearance = appearance;
    navigationBar.scrollEdgeAppearance = navigationBar.standardAppearance;
    
  } else {
    navigationBar.titleTextAttributes = getTextAttributes([Colors get].navigationBarTint, 16.0, UIFontWeightSemibold);
    [navigationBar setBackgroundImage:getGradientImageToFillRect(navBarBounds) forBarPosition:UIBarPositionAny barMetrics:UIBarMetricsDefault];
  }
  navigationBar.tintColor = [Colors get].navigationBarTint;
  navigationBar.barStyle = UIBarStyleDefault;
}

void configureNavigationBarForModal(UINavigationBar *navigationBar) {
  if (@available(iOS 15.0, *)) {
    UINavigationBarAppearance *appearance = [[UINavigationBarAppearance alloc] init];
    [appearance configureWithOpaqueBackground];
    appearance.backgroundEffect = nil;
    appearance.backgroundColor = [Colors get].background;
    appearance.titleTextAttributes = getTextAttributes([Colors get].navigationBarTint, 16.0, UIFontWeightSemibold);
    navigationBar.standardAppearance = appearance;
    navigationBar.scrollEdgeAppearance = navigationBar.standardAppearance;
  } else {
    navigationBar.titleTextAttributes = getTextAttributes([Colors get].searchModalNavigationBarTint, 16.0, UIFontWeightSemibold);
    navigationBar.barStyle = UIBarStyleDefault;
    navigationBar.barTintColor = [Colors get].background;
    navigationBar.translucent = NO;
  }
}

void configureTabBarItem(UITabBarItem *tabBarItem, UIImage *imageNormal) {
  if (@available(iOS 15.0, *)) {} else {
    [tabBarItem setTitleTextAttributes:[TypographyLegacy get].tabBarAttributes forState:UIControlStateNormal];
    [tabBarItem setTitleTextAttributes:[TypographyLegacy get].tabBarSelectedAttributes forState:UIControlStateSelected];
  }
  [tabBarItem setImage:imageNormal];
}

API_AVAILABLE(ios(13.0))
void configureTabBarItemAppearance(UITabBarItemAppearance *tabBarItemAppearance) {
  [tabBarItemAppearance.normal setTitleTextAttributes:[TypographyLegacy get].tabBarAttributes];
  [tabBarItemAppearance.selected setTitleTextAttributes:[TypographyLegacy get].tabBarSelectedAttributes];
  [tabBarItemAppearance.selected setIconColor:[Colors get].tabBarTextSelected];
  [tabBarItemAppearance.normal setIconColor:[Colors get].tabBarText];
}

void configureTabBar(UITabBar *tabBar) {
  if (@available(iOS 15.0, *)) {
    UITabBarAppearance *appearance = [[UITabBarAppearance alloc] init];
    [appearance configureWithOpaqueBackground];
    appearance.backgroundColor = [Colors get].tabBarBackground;
    appearance.backgroundEffect = nil;
//    tabBar.tintColor = [Colors get].tabBarTextSelected;
//    tabBar.unselectedItemTintColor = [Colors get].tabBarText;
    
    configureTabBarItemAppearance(appearance.stackedLayoutAppearance);
    configureTabBarItemAppearance(appearance.inlineLayoutAppearance);
    configureTabBarItemAppearance(appearance.compactInlineLayoutAppearance);
    
    tabBar.standardAppearance = appearance;
    tabBar.scrollEdgeAppearance = tabBar.standardAppearance;
  } else {
    tabBar.barTintColor = [Colors get].tabBarBackground;
    tabBar.translucent = NO;
    tabBar.tintColor = [Colors get].tabBarTextSelected;
    tabBar.unselectedItemTintColor = [Colors get].tabBarText;
  }
}

void drawShadow(UIView *view) {
    UIBezierPath *shadowPath = [UIBezierPath bezierPathWithRect:view.bounds];
    view.layer.masksToBounds = NO;
    view.layer.shadowColor = [[ColorsLegacy get].heavyMetal CGColor];
    view.layer.shadowOpacity = 0.2;
    view.layer.shadowOffset = CGSizeMake(0.0, 5.0);
    view.layer.shadowRadius = 8.0;
    view.layer.shadowPath = [shadowPath CGPath];
}
