//
//  SearchItemsObservable.h
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol FeedObserver;

@protocol FeedObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<FeedObserver>> *feedObservers;
- (void)addObserver:(id<FeedObserver>)observer;
- (void)removeObserver:(id<FeedObserver>)observer;
- (void)notifyObservers;

@end

NS_ASSUME_NONNULL_END

