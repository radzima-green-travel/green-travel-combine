//
//  LocaleUtils.m
//  greenTravel
//
//  Created by Alex K on 6.02.22.
//

#import "LocaleUtils.h"
#import "LocaleConstants.h"

NSString *shortCode;

NSString* getCurrentLocaleLanguageCode() {
  if (shortCode != nil) {
    return shortCode;
  }
  NSSet<NSString *> *supportedLanguageCodes = [[NSSet alloc] initWithArray:[SupportedLanguageCodes componentsSeparatedByString:@","]];
  NSArray<NSString *> *preferredLanguages = [NSLocale preferredLanguages];
  [preferredLanguages enumerateObjectsUsingBlock:^(NSString * _Nonnull   prefferedLanguage, NSUInteger idx, BOOL * _Nonnull stop) {
    NSString *firstPrefferedLanguageLangCode = [[prefferedLanguage componentsSeparatedByString:@"-"] firstObject];
    if ([supportedLanguageCodes containsObject:firstPrefferedLanguageLangCode]) {
      shortCode = firstPrefferedLanguageLangCode;
      *stop = YES;
    }
  }];
  if (shortCode == nil) {
    shortCode = LocaleLanguageCodeDefault;
  }
  return shortCode;
}

BOOL isCurrentLanguageCodeLegacy() {
  return [LocaleLanguageCodeLegacy isEqualToString:getCurrentLocaleLanguageCode()];
}

