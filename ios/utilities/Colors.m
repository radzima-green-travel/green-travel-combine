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

NSString* UIColorToHEX(UIColor *color) {
  CGFloat red = 0;
  CGFloat blue = 0;
  CGFloat green = 0;
  CGFloat alpha = 0;
  [color getRed:&red green:&green blue:&blue alpha:&alpha];
  NSInteger rgb = (NSInteger)(red*255)<<16 | (NSInteger)(green*255)<<8 | (NSInteger)(blue*255)<<0;
  return [NSString stringWithFormat:@"%06lx", (long)rgb];
}

@implementation Colors

static Colors *instance;

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.background = [UIColor colorNamed:@"background"];
    self.backgroundProfileScreen = [UIColor colorNamed:@"backgroundProfileScreen"];
    self.textFieldBackground = [UIColor colorNamed:@"textFieldBackground"];
    self.textFieldBorderColor = [UIColor colorNamed:@"textFieldBorderColor"];
    self.navigationBarTint = [UIColor colorNamed:@"navigationBarTint"];
    self.navigationBarColorStart = [UIColor colorNamed:@"navigationBarColorStart"];
    self.navigationBarColor = [UIColor colorNamed:@"navigationBarColor"];
    self.mapDirectionsPathBackgroundLayer = [UIColor colorNamed:@"mapDirectionsPathBackgroundLayer"];
    self.mapDirectionsPathFrontLayer = [UIColor colorNamed:@"mapDirectionsPathFrontLayer"];
    self.navigationBarColorStop = [UIColor colorNamed:@"navigationBarColorStop"];
    self.tabBarBackground = [UIColor colorNamed:@"tabBarBackground"];
    self.tabBarTint = [UIColor colorNamed:@"tabBarTint"];
    self.cardPlaceholder = [UIColor colorNamed:@"cardPlaceholder"];
    self.bookmarkTintEmptyCell = [UIColor colorNamed:@"bookmarkTintEmptyCell"];
    self.cardPlaceholderText = [UIColor colorNamed:@"cardPlaceholderText"];
    self.bookmarkCard = [UIColor colorNamed:@"bookmarkCard"];
    self.bookmarkSelectedBottomSheetTintColor = [UIColor colorNamed:@"bookmarkSelectedBottomSheetTintColor"];
    self.bookmarkUnselectedBottomSheetTintColor = [UIColor colorNamed:@"bookmarkUnselectedBottomSheetTintColor"];
    self.bookmarkDetailScreen = [UIColor colorNamed:@"bookmarkDetailScreen"];
    self.bookmarkIndexScreen = [UIColor colorNamed:@"bookmarkIndexScreen"];
    self.tabBarText = [UIColor colorNamed:@"tabBarText"];
    self.tabBarTextSelected = [UIColor colorNamed:@"tabBarTextSelected"];
    self.buttonAll = [UIColor colorNamed:@"buttonAll"];
    self.categoryTitleText = [UIColor colorNamed:@"categoryTitleText"];
    self.bookmarkCellText = [UIColor colorNamed:@"bookmarkCellText"];
    self.bookmarkTintFullCell = [UIColor colorNamed:@"bookmarkTintFullCell"];
    self.buttonNewDataBackground = [UIColor colorNamed:@"buttonNewDataBackground"];
    self.buttonNewDataText = [UIColor colorNamed:@"buttonNewDataText"];
    self.mainText = [UIColor colorNamed:@"mainText"];
    self.subText = [UIColor colorNamed:@"subText"];
    self.auxiliaryText = [UIColor colorNamed:@"auxiliaryText"];
    self.searchCellSeparator = [UIColor colorNamed:@"searchCellSeparator"];
    self.pageControlDotSelected = [UIColor colorNamed:@"pageControlDotSelected"];
    self.pageControlDotUnselected = [UIColor colorNamed:@"pageControlDotUnselected"];
    self.headlineText = [UIColor colorNamed:@"headlineText"];
    self.galleryNoImagePlaceholder = [UIColor colorNamed:@"galleryNoImagePlaceholder"];
    self.bottomSheetGrip = [UIColor colorNamed:@"bottomSheetGrip"];
    self.searchModalNavigationBarTint = [UIColor colorNamed:@"searchModalNavigationBarTint"];
    self.categoryFilterCellBorder = [UIColor colorNamed:@"categoryFilterCellBorder"];
    self.photoCollectionViewCellBorder = [UIColor colorNamed:@"photoCollectionViewCellBorder"];
    self.mapBackground = [UIColor colorNamed:@"mapBackground"];
    self.mainTextLink = [UIColor colorNamed:@"mainTextLink"];
    self.searchBarClearButton = [UIColor colorNamed:@"searchBarClearButton"];
    self.textFieldCodeBorderColor = [UIColor colorNamed:@"textFieldCodeBorderColor"];
    self.buttonTextTint = [UIColor colorNamed:@"buttonTextTint"];
    self.areaOutline = [UIColor colorNamed:@"areaOutline"];
    self.areaFill = [UIColor colorNamed:@"areaFill"];
    self.accountImageBlue = [UIColor colorNamed:@"accountImageBlue"];
    self.accountImageRed = [UIColor colorNamed:@"accountImageRed"];
    self.accountImagePink = [UIColor colorNamed:@"accountImagePink"];
    self.accountImageGreen = [UIColor colorNamed:@"accountImageGreen"];
    self.accountImageOrange = [UIColor colorNamed:@"accountImageOrange"];
    self.accountImageMustard = [UIColor colorNamed:@"accountImageMustard"];
    self.accountImagePurple = [UIColor colorNamed:@"accountImagePurple"];
    self.accountImageLightBlue = [UIColor colorNamed:@"accountImageLightBlue"];
    self.accountImageFireOrange = [UIColor colorNamed:@"accountImageFireOrange"];
    
  }
  return self;
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[Colors alloc] init];
    return instance;
}

@end

