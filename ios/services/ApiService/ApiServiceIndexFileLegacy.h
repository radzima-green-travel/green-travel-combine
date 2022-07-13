//
//  ApiService.h
//  GreenTravel
//
//  Created by Alex K on 8/27/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "IndexLoader.h"

NS_ASSUME_NONNULL_BEGIN

@class DetailsModel;
@class PlaceCategory;
@class PlaceDetails;

@interface ApiServiceIndexFileLegacy : NSObject<IndexLoader>

@property (strong, nonatomic) NSURLSession *session;
- (instancetype)initWithSession:(NSURLSession *)session;
- (void)loadDetailsByUUID:(NSString *)uuid withCompletion:(void(^)(PlaceDetails *))completion;
- (NSArray<PlaceCategory *>*)mapCategoriesFromJSON:(NSArray *)categories;
@end

NS_ASSUME_NONNULL_END
