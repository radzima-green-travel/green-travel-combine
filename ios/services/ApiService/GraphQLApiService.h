//
//  GraphQLApiService.h
//  greenTravel
//
//  Created by Alex K on 22.01.22.
//

#import <Foundation/Foundation.h>
#import "IndexLoader.h"

NS_ASSUME_NONNULL_BEGIN

@interface GraphQLApiService: NSObject<IndexLoader>
- (instancetype)initWithSession:(NSURLSession *)session;
@end

NS_ASSUME_NONNULL_END
