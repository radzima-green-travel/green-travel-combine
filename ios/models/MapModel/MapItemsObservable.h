//
//  SearchItemsObservable.h
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol MapItemsObserver;

@protocol MapItemsObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<MapItemsObserver>> *mapItemsObservers;
- (void)addObserver:(id<MapItemsObserver>)observer;
- (void)removeObserver:(id<MapItemsObserver>)observer;
- (void)notifyObservers;

@end

NS_ASSUME_NONNULL_END

