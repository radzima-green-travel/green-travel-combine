//
//  BookmarksModel.h
//  GreenTravel
//
//  Created by Alex K on 8/30/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CategoriesObserver.h"
#import "BookmarksObserver.h"
#import "BookmarksGroupObservable.h"

NS_ASSUME_NONNULL_BEGIN

@class BookmarkItem;

@class IndexModel;
@protocol BookmarksGroupObserver;

@interface BookmarksGroupModel : NSObject<CategoriesObserver, BookmarksObserver, BookmarksGroupObservable>

- (instancetype)initWithIndexModel:(IndexModel *)model;
@property (strong, nonatomic) NSMutableArray<BookmarkItem *> *bookmarkItems;
@property (strong, nonatomic) NSMutableArray<id<BookmarksGroupObserver>> *bookmarksGroupObservers;

@end

NS_ASSUME_NONNULL_END
