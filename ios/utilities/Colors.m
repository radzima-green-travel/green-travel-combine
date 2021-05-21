//
//  Colors.m
//  TEDPlayer
//
//  Created by Alex K on 7/18/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "Colors.h"
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

UIColor* UIColorFromHEX(int hexColor) {
    return [UIColor colorWithRed:(float)((hexColor & 0xFF0000) >> 16) / 255.0
                           green:(float)((hexColor & 0x00FF00) >> 8) / 255.0
                            blue:(float)((hexColor & 0x0000FF) >> 0)  / 255.0 alpha:1.0];
}

@implementation Colors

static Colors *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.black = UIColorFromHEX(0x111111);
        self.darkGrey = UIColorFromHEX(0x232528);
        self.white = UIColorFromHEX(0xFFFFFF);
        self.red = UIColorFromHEX(0xEE686A);
        self.blue = UIColorFromHEX(0x29C2D1);
        self.green = UIColorFromHEX(0x50A021);
        self.shamrock = UIColorFromHEX(0x35C7A4);
        self.yellow = UIColorFromHEX(0xF9CC78);
        self.apple = UIColorFromHEX(0x4BA83B);
        self.pineTree = UIColorFromHEX(0x152702);
        self.heavyMetal = UIColorFromHEX(0x151614);
        self.heavyMetal35 = [self getHeavyMetal35];
        self.yellowHighlighted = UIColorFromHEX(0xFDF4E3);
        self.grey = UIColorFromHEX(0x757a7e);
        self.royalBlue = UIColorFromHEX(0x2F80ED);
        self.logCabin = UIColorFromHEX(0x0A0B0A);
        self.milkyGrey = UIColorFromHEX(0xE0E0E0);
        self.alto = UIColorFromHEX(0xD9D9D9);
        self.alabaster = UIColorFromHEX(0xF8F8F8);
        self.boulder = UIColorFromHEX(0x777777);
        self.persimmon = UIColorFromHEX(0xFF565E);
    }
    return self;
}

- (UIColor *)getHeavyMetal35 {
    CGFloat heavyMetalRed = 0.0;
    CGFloat heavyMetalBlue = 0.0;
    CGFloat heavyMetalGreen = 0.0;
    [self.heavyMetal getRed:&heavyMetalRed green:&heavyMetalGreen blue:&heavyMetalBlue alpha:nil];
    return [UIColor colorWithRed:heavyMetalRed
                           green:heavyMetalBlue
                            blue:heavyMetalGreen
                           alpha:0.35];
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[Colors alloc] init];
    return instance;
}

@end

