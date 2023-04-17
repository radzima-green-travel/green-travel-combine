//
//  Typography.m
//  GreenTravel
//
//  Created by Alex K on 1/17/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "Colors.h"
#import "Typography.h"
#import "TextUtils.h"

@implementation Typography 

static Typography *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
    }
    return self;
}

- (NSAttributedString *)mainTextLink:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainTextLink,
                                                                      15.0,
                                                                      UIFontWeightSemibold)];
}

- (NSAttributedString *)mainText:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainText,
                                                                      15.0,
                                                                      UIFontWeightRegular)];
}

- (NSAttributedString *)formHeader:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].headlineText,
                                                                      20.0,
                                                                      UIFontWeightSemibold)];
}

- (NSAttributedString *)codeConfirmationHint:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].auxiliaryText,
                                                                      15.0,
                                                                      UIFontWeightRegular)];
}

- (NSAttributedString *)textButtonLabel:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].buttonTextTint,
                                                                      16.0,
                                                                      UIFontWeightRegular)];
}

- (NSAttributedString *)socialButtonLabel:(NSString *)input
                               lightColor:(BOOL)lightColor {
  NSMutableAttributedString *text = [[NSMutableAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes(lightColor ?
                                                                      [Colors get].socialButtonText :
                                                                      [Colors get].socialButtonTextInverted,
                                                                      16.0,
                                                                      UIFontWeightRegular)];
  NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
  [paragraphStyle setAlignment:NSTextAlignmentCenter];
  NSRange textRange = NSMakeRange(0, text.length);
  [text addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:textRange];
  return [text copy];
}

- (NSAttributedString *)makeProfileTableViewCellMainTextLabelForSettingsCell:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainText, 17.0, UIFontWeightRegular)];
}

- (NSAttributedString *)makeProfileTableViewCellSubTextLabelForSettingsCell:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].subText, 17.0, UIFontWeightRegular)];
}

- (NSAttributedString *)makeProfileTableViewCellMainTextLabelForAuthCell:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainText, 22.0, UIFontWeightRegular)];
}

- (NSAttributedString *)makeProfileTableViewCellSubTextLabelForAuthCell:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainText, 13.0, UIFontWeightRegular)];
}

- (NSAttributedString *)settingsCellTitle:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainText, 17.0, UIFontWeightRegular)];
}

- (NSAttributedString *)settingsCellTitleDanger:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].actionDangerous, 17.0, UIFontWeightRegular)];
}

- (NSAttributedString *)settingsCellSubTitle:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].subText, 17.0, UIFontWeightRegular)];
}

- (NSAttributedString *)termsAndContitionsText:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].subText, 12.0, UIFontWeightRegular)];
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[Typography alloc] init];
    return instance;
}

@end
