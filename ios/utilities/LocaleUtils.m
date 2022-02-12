//
//  LocaleUtils.m
//  greenTravel
//
//  Created by Alex K on 6.02.22.
//

#import "LocaleUtils.h"

NSString *shortCode;

NSString* getCurrentLocaleLanguageCode() {
  if (shortCode == nil) {
    NSString *firstPrefferedLanguage = [[NSLocale preferredLanguages] firstObject];
    shortCode = [[firstPrefferedLanguage componentsSeparatedByString:@"-"] firstObject];
    return shortCode;
  }
  return shortCode;
}

