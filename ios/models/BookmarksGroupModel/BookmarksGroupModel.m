//
//  BookmarksModel.m
//  GreenTravel
//
//  Created by Alex K on 8/30/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "BookmarksGroupModel.h"
#import "IndexModel.h"
#import "BookmarksGroupObserver.h"
#import "BookmarkItem.h"
#import "PlaceCategory.h"
#import "PlaceItem.h"
#import "CategoryUtils.h"

@interface BookmarksGroupModel ()

@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSMutableSet<NSString*> *itemUUIDs;
@property (strong, nonatomic) NSMutableDictionary<NSString*, NSNumber*> *categoryTypeToBookmark;

@end

@implementation BookmarksGroupModel

- (instancetype)initWithIndexModel:(IndexModel *)indexModel {
    self = [super init];
    if (self) {
        _indexModel = indexModel;
        _bookmarkItems = [[NSMutableArray alloc] init];
        _categoryTypeToBookmark = [[NSMutableDictionary alloc] init];
        _itemUUIDs = [[NSMutableSet alloc] init];
        _bookmarksGroupObservers = [[NSMutableArray alloc] init];
        [self.indexModel addObserver:self];
        [self.indexModel addObserverBookmarks:self];
    }
    return self;
}

#pragma mark - Observers
- (void)onCategoriesUpdate:(nonnull NSArray<PlaceCategory *> *)categories {
    [self fillBookmarkItemsFromCategories:categories];
    [self notifyObservers];
}

- (void)onCategoriesLoading:(BOOL)loading {}

- (void)onCategoriesNewDataAvailable {}

- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark { 
    [self fillBookmarkItemsFromCategories:self.indexModel.categories];
    [self notifyObservers];
}

- (void)fillBookmarkItemsFromCategories:(NSArray<PlaceCategory *> *)categories {
    __weak typeof(self) weakSelf = self;
    self.bookmarkItems = [[NSMutableArray alloc] init];
    self.categoryTypeToBookmark = [[NSMutableDictionary alloc] init];
    self.itemUUIDs = [[NSMutableSet alloc] init];
    traverseCategories(categories, ^(PlaceCategory *category, PlaceItem *item) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (item && item.bookmarked && ![strongSelf.itemUUIDs containsObject:item.uuid]) {
            [strongSelf.itemUUIDs addObject:item.uuid];
            if (!strongSelf.categoryTypeToBookmark[category.uuid] && [category.categories count] == 0) {
                strongSelf.categoryTypeToBookmark[category.uuid] = @0;
                BookmarkItem *bookmarkItem = [[BookmarkItem alloc] init];
                bookmarkItem.correspondingCategory = category;
                bookmarkItem.howMany = 0;
                bookmarkItem.title = category.title;
                bookmarkItem.uuid = category.uuid;
                [strongSelf.bookmarkItems addObject:bookmarkItem];
            }
            strongSelf.categoryTypeToBookmark[category.uuid] = @([strongSelf.categoryTypeToBookmark[category.uuid] intValue] + 1);
        }
    });
    
    [self.bookmarkItems enumerateObjectsUsingBlock:^(BookmarkItem * _Nonnull bookmarkItem, NSUInteger idx, BOOL * _Nonnull stop) {
        bookmarkItem.howMany = [weakSelf.categoryTypeToBookmark[bookmarkItem.uuid] intValue];
    }];
}

- (void)addObserver:(nonnull id<BookmarksGroupObserver>)observer {
    if ([self.bookmarksGroupObservers containsObject:observer]) {
        return;
    }
    [self.bookmarksGroupObservers addObject:observer];
}

- (void)notifyObservers {
    [self.bookmarksGroupObservers enumerateObjectsUsingBlock:^(id<BookmarksGroupObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onBookmarksUpdate:self.bookmarkItems];
    }];
}

- (void)removeObserver:(nonnull id<BookmarksGroupObserver>)observer {
    [self.bookmarksGroupObservers removeObject:observer];
}

@end
