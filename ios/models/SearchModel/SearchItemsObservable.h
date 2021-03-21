//
//  SearchItemsObservable.h
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol SearchItemsObserver;

@protocol SearchItemsObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<SearchItemsObserver>> *searchItemsObservers;
- (void)addObserver:(id<SearchItemsObserver>)observer;
- (void)removeObserver:(id<SearchItemsObserver>)observer;
- (void)notifyObservers;
- (void)notifyObserversOfSearchHistoryUpdate;

@end

NS_ASSUME_NONNULL_END

