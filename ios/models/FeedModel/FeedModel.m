//
//  DiscoveryModel.m
//  GreenTravel
//
//  Created by Alex K on 3/7/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "FeedModel.h"
#import "CategoriesObservable.h"
#import "FeedObserver.h"
#import "IndexModel.h"

@interface FeedModel()

@property (strong, nonatomic) IndexModel *indexModel;

@end

@implementation FeedModel
 
- (instancetype)initWithIndexModel:(IndexModel *)indexModel
{
    self = [super init];
    if (self) {
        _feedObservers = [[NSMutableArray alloc] init];
        _indexModel = indexModel;
        [_indexModel addObserver:self];
    }
    return self;
}

- (void)addObserver:(nonnull id<FeedObserver>)observer {
    if ([self.feedObservers containsObject:observer]) {
        return;
    }
    [self.feedObservers addObject:observer];
}

- (void)notifyObservers {
    __weak typeof(self) weakSelf = self;
    [self.feedObservers enumerateObjectsUsingBlock:^(id<FeedObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onFeedItemsUpdate:weakSelf.feedItems];
    }];
}

- (void)removeObserver:(nonnull id<FeedObserver>)observer {
    if ([self.feedObservers containsObject:observer]) {
        return;
    }
    [self.feedObservers removeObject:observer];
}

- (void)onCategoriesLoading:(BOOL)loading {
    
}

- (void)onCategoriesNewDataAvailable {
    
}

- (void)onCategoriesUpdate:(nonnull NSArray<PlaceCategory *> *)categories {
    
}

- (void)onDetailsLoading:(BOOL)loading {}

- (NSArray<FeedItem *>*)mapCategoriesToFeedItems:(NSArray<PlaceCategory *>*)categories {
    return @[];
}

@end
