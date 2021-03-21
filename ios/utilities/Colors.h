//
//  Colors.h
//  TEDPlayer
//
//  Created by Alex K on 7/18/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class Colors;
@class UIColor;

@interface Colors : NSObject

@property (strong, nonatomic) UIColor *black;
@property (strong, nonatomic) UIColor *darkGrey;
@property (strong, nonatomic) UIColor *white;
@property (strong, nonatomic) UIColor *red;
@property (strong, nonatomic) UIColor *blue;
@property (strong, nonatomic) UIColor *green;
@property (strong, nonatomic) UIColor *shamrock;
@property (strong, nonatomic) UIColor *yellow;
@property (strong, nonatomic) UIColor *apple;
@property (strong, nonatomic) UIColor *pineTree;
@property (strong, nonatomic) UIColor *yellowHighlighted;
@property (strong, nonatomic) UIColor *heavyMetal;
@property (strong, nonatomic) UIColor *heavyMetal35;
@property (strong, nonatomic) UIColor *grey;
@property (strong, nonatomic) UIColor *royalBlue;
@property (strong, nonatomic) UIColor *logCabin;
@property (strong, nonatomic) UIColor *milkyGrey;
@property (strong, nonatomic) UIColor *alto;
@property (strong, nonatomic) UIColor *alabaster;
@property (strong, nonatomic) UIColor *boulder;

+ (instancetype)get;

@end
NS_ASSUME_NONNULL_END
