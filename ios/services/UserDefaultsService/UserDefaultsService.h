//
//  UserDefaultsService.h
//  GreenTravel
//
//  Created by Alex K on 1/24/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface UserDefaultsService : NSObject

- (void)saveFrameworkValue:(NSString *)framework;
- (NSString *)loadFrameworkValue;
- (void)saveETag:(NSString *)eTag;
- (NSString *)loadETag;
- (void)saveUserId:(NSString *)userId;
- (NSString *)loadUserId;
- (void)saveVersion:(NSString *)version;
- (void)saveBuildNumber:(NSString *)buildNumber;
- (void)saveLanguageCode:(NSString *)languageCode;
- (NSString *)loadLanguageCode;
- (void)clearLanguageCode;
+ (instancetype)get;

@end

NS_ASSUME_NONNULL_END
