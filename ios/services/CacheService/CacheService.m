//
//  UserDefaultsService.m
//  GreenTravel
//
//  Created by Alex K on 1/24/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "CacheService.h"

@interface CacheService()

@end

@implementation CacheService

static CacheService *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
      _cache = [[NSCache alloc] init];
      _cache.name = @"Heavy views cache";
    }
    return self;
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[CacheService alloc] init];
    return instance;
}

@end
