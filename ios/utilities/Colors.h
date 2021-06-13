//
//  Colors.h
//  TEDPlayer
//
//  Created by Alex K on 7/18/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class UIColor;

@interface Colors : NSObject

@property (strong, nonatomic) UIColor *background;
@property (strong, nonatomic) UIColor *navigationBarTint;
@property (strong, nonatomic) UIColor *navigationBarColorStart;
@property (strong, nonatomic) UIColor *navigationBarColorStop;
@property (strong, nonatomic) UIColor *tabBarBackground;
@property (strong, nonatomic) UIColor *tabBarTint;
+ (instancetype)get;

@end
NS_ASSUME_NONNULL_END
