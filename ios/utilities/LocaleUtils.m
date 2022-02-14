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
  NSArray<NSString *> *preferredLanguages = [NSLocale preferredLanguages];
  if ([preferredLanguages count] == 0) {
    shortCode = LocaleLanguageCodeDefault;
    return shortCode;
  }
  NSString *firstPrefferedLanguage = [[NSLocale preferredLanguages] firstObject];
  shortCode = [[firstPrefferedLanguage componentsSeparatedByString:@"-"] firstObject];
  return shortCode;
}

BOOL isCurrentLanguageCodeLegacy() {
  return [LocaleLanguageCodeLegacy isEqualToString:getCurrentLocaleLanguageCode()];
}

