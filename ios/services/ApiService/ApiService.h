//
//  ApiService.h
//  GreenTravel
//
//  Created by Alex K on 8/27/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class DetailsModel;
@class Category;
@class PlaceDetails;

@interface ApiService : NSObject

- (instancetype)initWithSession:(NSURLSession *)session;
- (void)loadCategoriesWithCompletion:(NSString *)existingTag
                          completion:(void(^)(NSArray<Category *>*, NSArray<PlaceDetails *>*, NSString *))completion;
- (void)loadDetailsByUUID:(NSString *)uuid withCompletion:(void(^)(PlaceDetails *))completion;

@end

NS_ASSUME_NONNULL_END
