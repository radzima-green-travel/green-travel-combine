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
  NSArray *preferredLocalizations = [[NSBundle mainBundle] preferredLocalizations];
  if ([preferredLocalizations count] == 0) {
    shortCode = LocaleLanguageCodeDefault;
    return shortCode;
  }
  NSString *firstPrefferedLanguageLangCode = [[preferredLocalizations[0] componentsSeparatedByString:@"-"] firstObject];
  if ([supportedLanguageCodes containsObject:firstPrefferedLanguageLangCode]) {
    shortCode = firstPrefferedLanguageLangCode;
    return shortCode;
  }
  shortCode = LocaleLanguageCodeDefault;
  return shortCode;
}

BOOL isCurrentLanguageCodeLegacy() {
  return [LocaleLanguageCodeLegacy isEqualToString:getCurrentLocaleLanguageCode()];
}

