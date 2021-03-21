//
//  DiscoveryModel.h
//  GreenTravel
//
//  Created by Alex K on 3/7/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FeedObservable.h"
#import "FeedObserver.h"
#import "CategoriesObserver.h"

@class FeedItem;
@class IndexModel;

NS_ASSUME_NONNULL_BEGIN

@interface FeedModel : NSObject<FeedObservable, CategoriesObserver>

@property (strong, nonatomic) NSArray<FeedItem *> *feedItems;
@property (strong, nonatomic) NSMutableArray<id<FeedObserver>> *feedObservers;
- (instancetype)initWithIndexModel:(IndexModel *)indexModel; 

@end

NS_ASSUME_NONNULL_END
