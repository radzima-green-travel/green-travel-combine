//
//  ApiServiceBase.m
//  greenTravel
//
//  Created by Alex K on 14.07.22.
//

#import "ApiServiceBase.h"

@implementation ApiServiceBase

- (instancetype) initWithSession:(NSURLSession *)session {
    self = [super init];
    if (self) {
        _session = session;
    }
    return self;
}

- (NSString *)categoriesURL {
  return @"";
}

- (void)loadDetailsByUUID:(NSString *)uuid withCompletion:(void (^)(PlaceDetails * _Nonnull))completion {}

- (void)loadCategories:(NSString *)currentHash forceLoad:(BOOL)forceLoad withCompletion:(CategoriesCompletion)completion {}

@end
