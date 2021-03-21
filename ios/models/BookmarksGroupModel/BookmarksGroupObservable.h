//
//  SearchItemsObservable.h
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol BookmarksGroupObserver;

@protocol BookmarksGroupObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<BookmarksGroupObserver>> *bookmarksGroupObservers;
- (void)addObserver:(id<BookmarksGroupObserver>)observer;
- (void)removeObserver:(id<BookmarksGroupObserver>)observer;
- (void)notifyObservers;

@end

NS_ASSUME_NONNULL_END

