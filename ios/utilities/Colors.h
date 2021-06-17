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
@property (strong, nonatomic) UIColor *cardPlaceholder;
@property (strong, nonatomic) UIColor *cardPlaceholderText;
@property (strong, nonatomic) UIColor *bookmarkTintEmptyCell;
@property (strong, nonatomic) UIColor *bookmarkCard;
@property (strong, nonatomic) UIColor *tabBarText;
@property (strong, nonatomic) UIColor *tabBarTextSelected;
@property (strong, nonatomic) UIColor *buttonAll;
@property (strong, nonatomic) UIColor *categoryTitleText;
@property (strong, nonatomic) UIColor *bookmarkCellText;
@property (strong, nonatomic) UIColor *bookmarkTintFullCell;
@property (strong, nonatomic) UIColor *buttonNewDataBackground;
@property (strong, nonatomic) UIColor *buttonNewDataText;
+ (instancetype)get;

@end
NS_ASSUME_NONNULL_END
