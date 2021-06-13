//
//  GradientOverlayView.m
//  GreenTravel
//
//  Created by Alex K on 1/15/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "GradientOverlayView.h"
#import "ColorsLegacy.h"

@implementation GradientOverlayView

+ (Class)layerClass {
    return CAGradientLayer.class;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)setUp {
    CAGradientLayer *gradient = (CAGradientLayer *) self.layer;
    gradient.colors = @[(__bridge id)[ColorsLegacy get].heavyMetal.CGColor, (__bridge id)UIColor.clearColor.CGColor];
    gradient.startPoint = CGPointMake(0, 0);
    gradient.endPoint = CGPointMake(0, 0.6);
}

@end
