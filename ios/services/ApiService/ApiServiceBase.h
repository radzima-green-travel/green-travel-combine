//
//  ApiServiceBase.h
//  greenTravel
//
//  Created by Alex K on 14.07.22.
//

#import <Foundation/Foundation.h>
#import "IndexLoader.h"

NS_ASSUME_NONNULL_BEGIN


@class DetailsModel;
@class PlaceCategory;
@class PlaceDetails;

@interface ApiServiceBase : NSObject<IndexLoader>

@property (strong, nonatomic) NSURLSession *session;
- (instancetype)initWithSession:(NSURLSession *)session;
- (void)loadDetailsByUUID:(NSString *)uuid withCompletion:(void(^)(PlaceDetails *))completion;
@end


NS_ASSUME_NONNULL_END
