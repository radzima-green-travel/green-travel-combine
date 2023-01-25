//
//  IndexFileApiService.h
//  greenTravel
//
//  Created by Alex K on 10.07.22.
//

#import <Foundation/Foundation.h>
#import "IndexLoader.h"

NS_ASSUME_NONNULL_BEGIN

@interface ApiServiceIndexFile: NSObject<IndexLoader>
- (instancetype)initWithSession:(NSURLSession *)session;
@end

NS_ASSUME_NONNULL_END

