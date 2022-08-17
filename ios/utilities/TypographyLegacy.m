//
//  Typography.m
//  GreenTravel
//
//  Created by Alex K on 1/17/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "TypographyLegacy.h"
#import "TextUtils.h"
#import "ColorsLegacy.h"
#import "Colors.h"

@implementation TypographyLegacy

static TypographyLegacy *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.navigationSemiboldAttributes = getTextAttributes([ColorsLegacy get].white, 16.0, UIFontWeightSemibold);
        self.subtitle2SemiboldAttributes = getTextAttributes([ColorsLegacy get].black, 12.0, UIFontWeightSemibold);


        self.tabBarAttributes = getTextAttributes([Colors get].tabBarText, 12.0, UIFontWeightMedium);
        self.tabBarSelectedAttributes = getTextAttributes([Colors get].tabBarTextSelected, 12.0, UIFontWeightMedium);
    }
    return self;
}

- (NSAttributedString *)makeTitle1Semibold:(NSString *)input {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes([ColorsLegacy get].black, 20.0, UIFontWeightSemibold)];
}

- (NSAttributedString *)makeTitle1Bold:(NSString *)input {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes([ColorsLegacy get].black, 20.0, UIFontWeightBold)];
}


- (NSAttributedString *)makeTitle2Bold:(NSString *)input {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes([ColorsLegacy get].black, 20.0, UIFontWeightBold)];
}


- (NSAttributedString *)makeNavigationSemibold:(NSString *)input {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:self.navigationSemiboldAttributes];
}

- (NSAttributedString *)makeSubtitle1Semibold:(NSString *)input {
    return [self makeSubtitle1Semibold:input color:[ColorsLegacy get].logCabin];
}

- (NSAttributedString *)makeSubtitle1Semibold:(NSString *)input
                                        color:(UIColor *)color {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes(color, 14.0, UIFontWeightSemibold)];
}

- (NSAttributedString *)makeSubtitle2Semibold:(NSString *)input {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:self.subtitle2SemiboldAttributes];
}

- (NSAttributedString *)makeSubtitle2Regular:(NSString *)input {
    return [self makeSubtitle3Regular:(NSString *)input color:[ColorsLegacy get].white];
}

- (NSAttributedString *)makeSubtitle2Regular:(NSString *)input
                                       color:(nonnull UIColor *)color {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes(color, 13.0, UIFontWeightRegular)];
}


- (NSAttributedString *)makeSubtitle3Regular:(NSString *)input {
    return [self makeSubtitle3Regular:(NSString *)input color:[ColorsLegacy get].black];
}

- (NSAttributedString *)makeSubtitle3Regular:(NSString *)input color:(nonnull UIColor *)color{
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes(color, 14.0, UIFontWeightRegular)];
}

- (NSAttributedString *)makeButtonText:(NSString *)input {
    return [self makeButtonText:input color:[ColorsLegacy get].white];
}

- (NSAttributedString *)makeButtonText:(NSString *)input color:(UIColor *)color {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes(color, 14.0, UIFontWeightBold)];
}


- (NSAttributedString *)makeTitle2:(NSString *)input color:(UIColor *)color {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes(color, 15.0, UIFontWeightBold)];
}

- (NSAttributedString *)makeBody:(NSString *)input {
  return [self makeBody:input color:[ColorsLegacy get].logCabin];
}

- (NSAttributedString *)makeBody:(NSString *)input
                           color:(nonnull UIColor *)color {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes(color,
                                                                      15.0,
                                                                      UIFontWeightRegular)];
}

- (NSAttributedString *)makeBookmarkText:(NSString *)input {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes([Colors get].bookmarkCellText, 12.0, UIFontWeightSemibold)];
}

- (NSAttributedString *)makeLoadingScreenText:(NSString *)input {
    return [[NSAttributedString alloc] initWithString:input
                                           attributes:getTextAttributes([ColorsLegacy get].boulder, 15.0, UIFontWeightRegular)];
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[TypographyLegacy alloc] init];
    return instance;
}

@end
