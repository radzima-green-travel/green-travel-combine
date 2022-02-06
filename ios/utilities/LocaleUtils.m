//
//  LocaleUtils.m
//  greenTravel
//
//  Created by Alex K on 6.02.22.
//

#import "LocaleUtils.h"

NSString* getCurrentLocaleLanguageCode() {
  NSString *firstPrefferedLanguage = [[NSLocale preferredLanguages] firstObject];
  NSString *shortCode = [[firstPrefferedLanguage componentsSeparatedByString:@"-"] firstObject];
  return shortCode;
}

