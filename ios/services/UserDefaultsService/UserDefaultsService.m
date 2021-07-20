//
//  UserDefaultsService.m
//  GreenTravel
//
//  Created by Alex K on 1/24/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "UserDefaultsService.h"

@interface UserDefaultsService()

@property (strong, nonatomic) NSUserDefaults *userDefaults;

@end

@implementation UserDefaultsService

NSString * const kKeyETag = @"eTag";
NSString * const kKeyFramework = @"framework";
NSString * const kUserId = @"userId";

static UserDefaultsService *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
        _userDefaults = [NSUserDefaults standardUserDefaults];
    }
    return self;
}

- (void)saveETag:(NSString *)eTag {
    [self.userDefaults setValue:eTag forKey:kKeyETag];
}

- (NSString *)loadETag {
    return [self.userDefaults valueForKey:kKeyETag];
}

- (void)saveUserId:(NSString *)userId {
  [self.userDefaults setValue:userId forKey:kUserId];
}

- (NSString *)loadUserId {
  return [self.userDefaults valueForKey:kUserId];
}

- (void)saveFrameworkValue:(NSString *)framework {
  [self.userDefaults setValue:framework forKey:kKeyFramework];
}

- (NSString *)loadFrameworkValue {
  NSString *frameworkValue = [self.userDefaults valueForKey:kKeyFramework];
  return frameworkValue;
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[UserDefaultsService alloc] init];
    return instance;
}

@end
