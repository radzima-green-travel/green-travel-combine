//
//  CategoriesObserver.h
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class FeedItem;

@protocol FeedObserver <NSObject>

- (void)onFeedItemsUpdate:(NSArray<FeedItem *>*)feedItems;

@end

NS_ASSUME_NONNULL_END
