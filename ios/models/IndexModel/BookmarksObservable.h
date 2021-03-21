//
//  BookmarksObservable.h
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol BookmarksObserver;
@class PlaceItem;

@protocol BookmarksObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<BookmarksObserver>> *bookmarksObservers;
- (void)addObserverBookmarks:(id<BookmarksObserver>)observer;
- (void)removeObserverBookmarks:(id<BookmarksObserver>)observer;
- (void)notifyObserversBookmarks:(PlaceItem *)item bookmark:(BOOL)bookmark;

@end

NS_ASSUME_NONNULL_END
