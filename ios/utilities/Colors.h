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

NSString* UIColorToHEX(UIColor *color);

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
@property (strong, nonatomic) UIColor *buttonNewDataBackgroundHighlighted;
@property (strong, nonatomic) UIColor *buttonNewDataText;
@property (strong, nonatomic) UIColor *mainText;
@property (strong, nonatomic) UIColor *auxiliaryText;
@property (strong, nonatomic) UIColor *searchCellSeparator;
@property (strong, nonatomic) UIColor *pageControlDotSelected;
@property (strong, nonatomic) UIColor *pageControlDotUnselected;
@property (strong, nonatomic) UIColor *headlineText;
@property (strong, nonatomic) UIColor *galleryNoImagePlaceholder;
@property (strong, nonatomic) UIColor *bottomSheetGrip;
@property (strong, nonatomic) UIColor *searchModalNavigationBarTint;
@property (strong, nonatomic) UIColor *categoryFilterCellBorder;
@property (strong, nonatomic) UIColor *photoCollectionViewCellBorder;
@property (strong, nonatomic) UIColor *mapBackground;
+ (instancetype)get;

@end
NS_ASSUME_NONNULL_END
