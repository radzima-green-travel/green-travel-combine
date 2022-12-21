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
@property (strong, nonatomic) UIColor *backgroundProfileScreen;
@property (strong, nonatomic) UIColor *textFieldBackground;
@property (strong, nonatomic) UIColor *textFieldBorderColor;
@property (strong, nonatomic) UIColor *textFieldCodeBorderColor;
@property (strong, nonatomic) UIColor *navigationBarTint;
@property (strong, nonatomic) UIColor *mapDirectionsPathBackgroundLayer;
@property (strong, nonatomic) UIColor *mapDirectionsPathFrontLayer;
@property (strong, nonatomic) UIColor *navigationBarColorStart;
@property (strong, nonatomic) UIColor *navigationBarColorStop;
@property (strong, nonatomic) UIColor *navigationBarColor;
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
@property (strong, nonatomic) UIColor *bookmarkSelectedBottomSheetTintColor;
@property (strong, nonatomic) UIColor *bookmarkUnselectedBottomSheetTintColor;
@property (strong, nonatomic) UIColor *bookmarkDetailScreen;
@property (strong, nonatomic) UIColor *bookmarkIndexScreen;
@property (strong, nonatomic) UIColor *buttonNewDataBackground;
@property (strong, nonatomic) UIColor *buttonNewDataBackgroundHighlighted;
@property (strong, nonatomic) UIColor *buttonNewDataText;
@property (strong, nonatomic) UIColor *mainText;
@property (strong, nonatomic) UIColor *subText;
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
@property (strong, nonatomic) UIColor *mainTextLink;
@property (strong, nonatomic) UIColor *searchBarClearButton;
@property (strong, nonatomic) UIColor *buttonTextTint;
@property (strong, nonatomic) UIColor *areaOutline;
@property (strong, nonatomic) UIColor *areaFill;
@property (strong, nonatomic) UIColor *accountImageBlue;
@property (strong, nonatomic) UIColor *accountImageFireOrange;
@property (strong, nonatomic) UIColor *accountImageGreen;
@property (strong, nonatomic) UIColor *accountImageLightBlue;
@property (strong, nonatomic) UIColor *accountImageMustard;
@property (strong, nonatomic) UIColor *accountImageOrange;
@property (strong, nonatomic) UIColor *accountImagePink;
@property (strong, nonatomic) UIColor *accountImagePurple;
@property (strong, nonatomic) UIColor *accountImageRed;
@property (strong, nonatomic) UIColor *whiteAndBlack;
@property (strong, nonatomic) UIColor *blackAndWhite;
@property (strong, nonatomic) UIColor *loginButtonBackground;
@property (strong, nonatomic) UIColor *loginButtonBorder;
@property (strong, nonatomic) UIColor *disclaimerText;
@property (strong, nonatomic) UIColor *dividerWithText;
@property (strong, nonatomic) UIColor *dividerText;
@property (strong, nonatomic) UIColor *loginNavBar;

+ (instancetype)get;

@end
NS_ASSUME_NONNULL_END
