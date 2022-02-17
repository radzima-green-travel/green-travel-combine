//
//  IndexModel.m
//  GreenTravel
//
//  Created by Alex K on 8/27/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "IndexModel.h"
#import "CategoriesObserver.h"
#import "BookmarksObserver.h"
#import "PlaceCategory.h"
#import "PlaceItem.h"
#import "ApiService.h"
#import "CoreDataService.h"
#import "CategoryUtils.h"
#import "ArrayUtils.h"
#import "UserDefaultsService.h"
#import "PlaceDetails.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"
#import "IndexPeeks.h"
#import "IndexModelData.h"
#import "LocaleUtils.h"

@interface IndexModel ()

@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) UserDefaultsService *userDefaultsService;
@property (assign, nonatomic) BOOL loadedFromDB;
@property (assign, nonatomic) BOOL loading;
@property (assign, nonatomic) BOOL loadingRemote;
@property (strong, nonatomic) IndexModelData *indexModelDataScheduledForUpdate;
@property (strong, nonatomic) NSMutableSet<NSString *> *preservedBookmarksUUIDs;

@property (strong, nonatomic) NSString *eTagScheduledForUpdate;
- (void)copyBookmarksFromOldCategories:(NSArray<PlaceCategory *>*)oldCategories
                                   toNew:(NSArray<PlaceCategory *>*)newCategories;


@end

@implementation IndexModel

static IndexModel *instance;

- (instancetype)initWithApiService:(ApiService *)apiService
                   coreDataService:(CoreDataService *)coreDataService
               userDefaultsService:(UserDefaultsService *)userDefaultsService
{
    self = [super init];
    if (self) {
        _categoriesObservers = [[NSMutableArray alloc] init];
        _bookmarksObservers = [[NSMutableArray alloc] init];
        _detailsBatchObservers = [[NSMutableArray alloc] init];
        _coreDataService = coreDataService;
        _apiService = apiService;
        _userDefaultsService = userDefaultsService;
        _preservedBookmarksUUIDs = [[NSMutableSet alloc] init];
        _loading = YES;
    }
    return self;
}

- (void)loadCategories {
    NSLog(@"loadCategories");
    // Check whether we need to reload for new locale.
    NSString *existingLanguageCode = [self.userDefaultsService loadLanguageCode];
    if (![existingLanguageCode isEqualToString:getCurrentLocaleLanguageCode()]) {
      [self.userDefaultsService clearLanguageCode];
      // Consider data in the DB invalidated, go to remote load.
      self.loadedFromDB = YES;
      __weak typeof(self) weakSelf = self;
      [self.coreDataService loadCategoriesWithCompletion:^(NSArray<PlaceCategory *> * _Nonnull categories) {
          [weakSelf saveBookmarksUUIDs:categories];
          [weakSelf loadCategoriesRemote:YES forceRefresh:YES];
      }];
    }
    // Try to load from db first.
    if (!self.loadedFromDB) {
        self.loadedFromDB = YES;
        __weak typeof(self) weakSelf = self;
        self.loading = YES;
        [self.coreDataService loadCategoriesWithCompletion:^(NSArray<PlaceCategory *> * _Nonnull categories) {
            __strong typeof(weakSelf) strongSelf = weakSelf;
            [strongSelf updateCategories:categories];
            [strongSelf loadCategoriesRemote:[categories count] == 0 forceRefresh:NO];
        }];
        return;
    }
    // Load from remote.
    if (!self.loading) {
        [self loadCategoriesRemote:[self.categories count] == 0 forceRefresh:NO];
    }
}

#pragma mark - Load remote data
- (void)loadCategoriesRemote:(BOOL)visible
                forceRefresh:(BOOL)forceRefresh {
  self.loading = YES;
  if (visible) { [self notifyObserversCategoriesLoading:YES]; }
  __weak typeof(self) weakSelf = self;
  NSString *existingETag = [self.userDefaultsService loadETag];
  [self.apiService loadCategories:existingETag
                        forceLoad:forceRefresh
                   withCompletion:^(IndexModelData *indexModelData, NSArray<PlaceDetails *> *details, NSString *eTag) {
    NSArray<PlaceCategory *>  *categoriesFromServer = indexModelData.categoryTree;
    __strong typeof(weakSelf) strongSelf = weakSelf;
    BOOL shouldRequestCategoriesUpdate = !forceRefresh;
    if (forceRefresh || ([strongSelf.categories count] == 0 &&
                         [categoriesFromServer count] > 0)) {
      [strongSelf restoreBookmarksFromUUIDs:categoriesFromServer];
      [strongSelf.coreDataService saveCategories:categoriesFromServer];
      [strongSelf saveDetailsFromItems:indexModelData.flatItems
                             withCompletion:^{
        [weakSelf.userDefaultsService saveETag:eTag];
        [weakSelf.userDefaultsService saveLanguageCode:getCurrentLocaleLanguageCode()];
      }];
      __weak typeof(strongSelf) weakSelf = strongSelf;
      [strongSelf.coreDataService loadCategoriesWithCompletion:^(NSArray<PlaceCategory *> * _Nonnull categoriesFromDB) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [strongSelf updateCategories:categoriesFromDB];
        strongSelf.loading = NO;
        if (visible) { [strongSelf notifyObserversCategoriesLoading:NO]; }
      }];
      shouldRequestCategoriesUpdate = NO;
    } else {
      strongSelf.loading = NO;
      if (visible) { [strongSelf notifyObserversCategoriesLoading:NO]; }
    }
    NSString *existingETag = [strongSelf.userDefaultsService loadETag];
    if (![existingETag isEqualToString:eTag] && [categoriesFromServer count] > 0) {
      [strongSelf copyBookmarksFromOldCategories:strongSelf.categories
                                           toNew:indexModelData.categoryTree];
      if (shouldRequestCategoriesUpdate) {
        [strongSelf requestCategoriesUpdate:indexModelData eTag:eTag];
      }
    }
  }];
}

- (void)reloadCategoriesRemote:(void(^)(void))completion {
  self.loading = YES;
  __weak typeof(self) weakSelf = self;
  NSString *existingETag = [self.userDefaultsService loadETag];
  [self.apiService loadCategories:existingETag forceLoad:NO
                   withCompletion:^(IndexModelData *indexModelData, NSArray<PlaceDetails *> *details, NSString *eTag) {
    NSArray<PlaceCategory *>  *categoriesFromServer = indexModelData.categoryTree;
    if ([categoriesFromServer count] == 0) {
      completion();
      return;
    }
    __strong typeof(weakSelf) strongSelf = weakSelf;
    NSString *existingETag = [strongSelf.userDefaultsService loadETag];
    if (![existingETag isEqualToString:eTag]) {
      [strongSelf copyBookmarksFromOldCategories:strongSelf.categories
                                           toNew:categoriesFromServer];
      [strongSelf.coreDataService saveCategories:categoriesFromServer];
      __weak typeof(strongSelf) weakSelf = strongSelf;
      [strongSelf saveDetailsFromItems:indexModelData.flatItems
                             withCompletion:^{
        [weakSelf.userDefaultsService saveETag:eTag];
      }];
    }
    __weak typeof(strongSelf) weakSelf = strongSelf;
    [strongSelf.coreDataService loadCategoriesWithCompletion:^(NSArray<PlaceCategory *> * _Nonnull categoriesFromDB) {
      [weakSelf updateCategories:categoriesFromDB];
      weakSelf.loading = NO;
      completion();
    }];
  }];
}

- (void)saveDetailsFromItems:(NSMutableDictionary<NSString *, PlaceItem *>*)items
                   withCompletion:(nonnull void (^)(void))completion {
  [self notifyObserversDetailsBatch:DetailsLoadStateProgress error:nil];
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    [weakSelf.coreDataService saveDetailsFromItems:items
                                         withCompletion:^{
      completion();
      [weakSelf notifyObserversDetailsBatch:DetailsLoadStateSuccess error:nil];
    }];
  });
}

- (void)applyCategoriesUpdate {
  [self notifyObserversCategoriesLoading:YES];
  __weak typeof(self) weakSelf = self;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.5 * NSEC_PER_SEC),
                 dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    __strong typeof(weakSelf) strongSelf = weakSelf;
    NSArray<PlaceCategory*> *newCategories = [strongSelf.indexModelDataScheduledForUpdate.categoryTree copy];
    [strongSelf notifyObserversDetailsBatch:DetailsLoadStateProgress error:nil];
    [strongSelf.coreDataService saveCategories:newCategories];
    [strongSelf saveDetailsFromItems:strongSelf.indexModelDataScheduledForUpdate.flatItems
                      withCompletion:^{
      [weakSelf.userDefaultsService saveETag:weakSelf.eTagScheduledForUpdate];
    }];
    [strongSelf.coreDataService loadCategoriesWithCompletion:^(NSArray<PlaceCategory *> * _Nonnull categoriesFromDB) {
      __weak typeof(strongSelf) weakSelf = strongSelf;
      [weakSelf updateCategories:categoriesFromDB];
      weakSelf.indexModelDataScheduledForUpdate = nil;
      [weakSelf notifyObserversCategoriesLoading:NO];
    }];
  });
}

- (void)retryCategories {
  [self notifyObserversCategoriesLoading:YES];
  __weak typeof(self) weakSelf = self;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.5 * NSEC_PER_SEC),
                 dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    __strong typeof(weakSelf) strongSelf = weakSelf;
    [strongSelf.userDefaultsService saveETag:@""];
    [strongSelf loadCategoriesRemote:YES forceRefresh:YES];
  });
}

- (void)copyBookmarksFromOldCategories:(NSArray<PlaceCategory *>*)oldCategories
                                 toNew:(NSArray<PlaceCategory *>*)newCategories {
  [self saveBookmarksUUIDs:oldCategories];
  [self restoreBookmarksFromUUIDs:newCategories];
}

- (void)saveBookmarksUUIDs:(NSArray<PlaceCategory *>*)oldCategories {
  [self.preservedBookmarksUUIDs removeAllObjects];
  __weak typeof(self) weakSelf = self;
  traverseCategories(oldCategories, ^(PlaceCategory *category, PlaceItem *item) {
    if (item.bookmarked) {
      [weakSelf.preservedBookmarksUUIDs addObject:item.uuid];
    }
  });
}

- (void)restoreBookmarksFromUUIDs:(NSArray<PlaceCategory *>*)newCategories {
  __weak typeof(self) weakSelf = self;
  traverseCategories(newCategories, ^(PlaceCategory *category, PlaceItem *item) {
    if ([weakSelf.preservedBookmarksUUIDs containsObject:item.uuid]) {
      item.bookmarked = YES;
    }
  });
}

- (void)bookmarkItem:(PlaceItem *)item bookmark:(BOOL)bookmark {
    item.bookmarked = bookmark;
    [self.coreDataService updatePlaceItem:item bookmark:bookmark];
    [self notifyObserversBookmarks:item bookmark:bookmark];
}

- (void)updateCategories:(NSArray<PlaceCategory *> *)categories {
  NSMutableDictionary<NSString *, PlaceCategory *> *flatCategories = [[NSMutableDictionary alloc] init];
  NSMutableDictionary<NSString *, PlaceItem *> *flatItems = [[NSMutableDictionary alloc] init];
  NSMutableArray<PlaceCategory*> *randomizedCategories = [[NSMutableArray alloc] init];
  traverseCategoriesWithLevel(categories, 0, ^(PlaceCategory *category, PlaceItem *placeItem, NSUInteger level) {
    if (category != nil && placeItem == nil) {
      flatCategories[category.uuid] = category;
      if (level == 0) {
        PlaceCategory *categoryRandomized = [category copyWithZone:nil];
        categoryRandomized.items = shuffledArray(category.items);
        categoryRandomized.categories = slice(category.categories);
        [randomizedCategories addObject:categoryRandomized];
      }
    }
    if (placeItem != nil) {
      flatItems[placeItem.uuid] = placeItem;
    }
  });
  self.categories = categories;
  self.flatItems = flatItems;
  self.flatCategories = flatCategories;
  self.randomizedCategories = [randomizedCategories copy];

  [self verifyLinks];
  [self notifyObservers];
}

- (void)verifyLinks {
  traverseCategories(self.categories, ^(PlaceCategory *category, PlaceItem *placeItem) {
    if (placeItem == nil) {
      return;
    }
    placeItem.details.categoryIdToItems = [placeItem.details.categoryIdToItems filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(CategoryUUIDToRelatedItemUUIDs *  _Nullable relation, NSDictionary<NSString *,id> * _Nullable bindings) {
      if (!self.flatCategories[relation.categoryUUID]) {
        return NO;
      }
      return [[relation.relatedItemUUIDs filteredOrderedSetUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(NSString *  _Nullable placeItemUUID, NSDictionary<NSString *,id> * _Nullable bindings) {
        return self.flatItems[placeItemUUID] != nil;
      }]] count] > 0;
    }]];
  });
}

- (void)requestCategoriesUpdate:(IndexModelData *)indexModelData
                           eTag:(NSString *)eTag {
    // TODO: change this to show "new content is available" widget
    self.indexModelDataScheduledForUpdate = indexModelData;
    self.eTagScheduledForUpdate = eTag;
    [self notifyObserversNewDataAvailable];
}

- (BOOL)isEmpty {
    return [self.categories count] == 0;
}

- (void)addObserver:(nonnull id<CategoriesObserver>)observer {
    if ([self.categoriesObservers containsObject:observer]) {
        return;
    }
    [self.categoriesObservers addObject:observer];
}

- (void)notifyObservers {
    __weak typeof(self) weakSelf = self;
    [self.categoriesObservers enumerateObjectsUsingBlock:^(id<CategoriesObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onCategoriesUpdate:weakSelf.categories];
    }];
}

- (void)notifyObserversNewDataAvailable {
    [self.categoriesObservers enumerateObjectsUsingBlock:^(id<CategoriesObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onCategoriesNewDataAvailable];
    }];
}

- (void)notifyObserversCategoriesLoading:(BOOL)loading {
    [self.categoriesObservers enumerateObjectsUsingBlock:^(id<CategoriesObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onCategoriesLoading:loading];
    }];
}

- (void)removeObserver:(nonnull id<CategoriesObserver>)observer {
    if ([self.categoriesObservers containsObject:observer]) {
        return;
    }
    [self.categoriesObservers removeObject:observer];
}

- (void)notifyObserversBookmarks:(PlaceItem *)item bookmark:(BOOL)bookmark {
    [self.bookmarksObservers enumerateObjectsUsingBlock:^(id<BookmarksObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onBookmarkUpdate:item bookmark:bookmark];
    }];
}

- (void)addObserverBookmarks:(nonnull id<BookmarksObserver>)observer {
    if ([self.bookmarksObservers containsObject:observer]) {
        return;
    }
    [self.bookmarksObservers addObject:observer];
}

- (void)removeObserverBookmarks:(nonnull id<BookmarksObserver>)observer {
    if ([self.bookmarksObservers containsObject:observer]) {
        return;
    }
    [self.bookmarksObservers removeObject:observer];
}

- (void)notifyObserversDetailsBatch:(DetailsLoadState)detailsLoadState
                              error:(NSError * _Nullable)error
{
  [self.detailsBatchObservers enumerateObjectsUsingBlock:^(id<DetailsBatchObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      [obj onDetailsBatchStatusUpdate:detailsLoadState error:error];
  }];
}

- (void)addObserverDetailsBatch:(id<DetailsBatchObserver>)observer {
  if ([self.detailsBatchObservers containsObject:observer]) {
      return;
  }
  [self.detailsBatchObservers addObject:observer];
}

- (void)removeObserverDetailsBatch:(nonnull id<DetailsBatchObserver>)observer {
    if ([self.detailsBatchObservers containsObject:observer]) {
        return;
    }
    [self.detailsBatchObservers removeObject:observer];
}

@end

