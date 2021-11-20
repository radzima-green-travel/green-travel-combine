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
#import "Category.h"
#import "PlaceItem.h"
#import "ApiService.h"
#import "CoreDataService.h"
#import "CategoryUtils.h"
#import "ArrayUtils.h"
#import "UserDefaultsService.h"
#import "PlaceDetails.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"
#import "IndexPeeks.h"

@interface IndexModel () 

@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) UserDefaultsService *userDefaultsService;
@property (assign, nonatomic) BOOL loadedFromDB;
@property (assign, nonatomic) BOOL loading;
@property (assign, nonatomic) BOOL loadingRemote;
@property (strong, nonatomic) NSArray<Category *> *categoriesScheduledForUpdate;
@property (strong, nonatomic) NSString *eTagScheduledForUpdate;
- (NSArray<Category *>*)copyBookmarksFromOldCategories:(NSArray<Category *>*)oldCategories
                                   toNew:(NSArray<Category *>*)newCategories;


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
        _coreDataService = coreDataService;
        _apiService = apiService;
        _userDefaultsService = userDefaultsService;
        _loading = YES;
    }
    return self;
}

- (void)loadCategories {
    NSLog(@"loadCategories");
    if (!self.loadedFromDB) {
        self.loadedFromDB = YES;
        __weak typeof(self) weakSelf = self;
        self.loading = YES;
        [self.coreDataService loadCategoriesWithCompletion:^(NSArray<Category *> * _Nonnull categories) {
            __strong typeof(weakSelf) strongSelf = weakSelf;
            [strongSelf updateCategories:categories];
            [strongSelf loadCategoriesRemote:[categories count] == 0];
        }];
        return;
    }
    if (!self.loading) {
        [self loadCategoriesRemote:[self.categories count] == 0];
    }
}

- (void)loadCategoriesRemote:(BOOL)visible {
  self.loading = YES;
  if (visible) { [self notifyObserversCategoriesLoading:YES]; }
  __weak typeof(self) weakSelf = self;
  [self.apiService loadCategoriesWithCompletion:^(NSArray<Category *>  * _Nonnull categories,
                                                  NSArray<PlaceDetails *> * _Nonnull details,
                                                  NSString *eTag) {
    __strong typeof(weakSelf) strongSelf = weakSelf;
    BOOL shouldRequestCategoriesUpdate = YES;
    if ([strongSelf.categories count] == 0 && [categories count] > 0) {
      [strongSelf.userDefaultsService saveETag:eTag];
      [strongSelf.coreDataService saveCategories:categories];
      [strongSelf saveDetailsFromCategories:categories];
      __weak typeof(strongSelf) weakSelf = strongSelf;
      [strongSelf.coreDataService loadCategoriesWithCompletion:^(NSArray<Category *> * _Nonnull categoriesFromDB) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [strongSelf updateCategories:categoriesFromDB];
        strongSelf.loading = NO;
        if (visible) { [strongSelf notifyObserversCategoriesLoading:NO]; }
      }];
      shouldRequestCategoriesUpdate = NO;
    }
    NSString *existingETag = [strongSelf.userDefaultsService loadETag];
    if (![existingETag isEqualToString:eTag] && [categories count] > 0) {
      NSArray<Category*> *newCategories =
      [strongSelf copyBookmarksFromOldCategories:strongSelf.categories
                                           toNew:categories];
      if (shouldRequestCategoriesUpdate) {
        [strongSelf requestCategoriesUpdate:newCategories eTag:eTag];
      }
    }
  }];
}

- (void)saveDetailsFromCategories:(NSArray<Category *>*)categories {
  [self notifyObserversDetailsInProgress:YES];
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    [weakSelf.coreDataService saveDetailsFromCategories:categories];
    [weakSelf notifyObserversDetailsInProgress:NO];
  });
}

- (void)loadDetailsByUUID:(NSString *)uuid
           withCompletion:(void (^)(PlaceDetails * _Nonnull))completion {
  [self.coreDataService loadDetailsByUUID:uuid
                           withCompletion:^(PlaceDetails * _Nonnull details) {
    completion(details);
  }];
}

- (void)refreshCategories {
  [self notifyObserversCategoriesLoading:YES];
  __weak typeof(self) weakSelf = self;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC),
                 dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    __strong typeof(weakSelf) strongSelf = weakSelf;
    NSArray<Category*> *newCategories = [weakSelf.categoriesScheduledForUpdate copy];
    [strongSelf.userDefaultsService saveETag:strongSelf.eTagScheduledForUpdate];
    [strongSelf notifyObserversDetailsInProgress:YES];
    [strongSelf.coreDataService saveCategories:newCategories];
    [strongSelf saveDetailsFromCategories:newCategories];
    [strongSelf notifyObserversCategoriesLoading:NO];
    [strongSelf updateCategories:newCategories];
  });
}

- (void)retryCategories {
  [self notifyObserversCategoriesLoading:YES];
  __weak typeof(self) weakSelf = self;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.5 * NSEC_PER_SEC), dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    __strong typeof(weakSelf) strongSelf = weakSelf;
    [strongSelf.userDefaultsService saveETag:@""];
    [strongSelf loadCategoriesRemote:YES];
  });
}

- (NSArray<Category *>*)copyBookmarksFromOldCategories:(NSArray<Category *>*)oldCategories
                                   toNew:(NSArray<Category *>*)newCategories {
    NSMutableSet *uuids = [[NSMutableSet alloc] init];
    traverseCategories(oldCategories, ^(Category *category, PlaceItem *item) {
        if (item.bookmarked) {
            [uuids addObject:item.uuid];
        }
    });
    traverseCategories(newCategories, ^(Category *category, PlaceItem *item) {
        if ([uuids containsObject:item.uuid]) {
            item.bookmarked = YES;
        }
    });
    return newCategories;
}

- (void)bookmarkItem:(PlaceItem *)item bookmark:(BOOL)bookmark {
    item.bookmarked = bookmark;
    [self.coreDataService updatePlaceItem:item bookmark:bookmark];
    [self notifyObserversBookmarks:item bookmark:bookmark];
}

- (void)updateCategories:(NSArray<Category *> *)categories {
  NSMutableDictionary<NSString *, Category *> *flatCategories = [[NSMutableDictionary alloc] init];
  NSMutableDictionary<NSString *, PlaceItem *> *flatItems = [[NSMutableDictionary alloc] init];
  NSMutableArray<Category*> *randomizedCategories = [[NSMutableArray alloc] init];
  traverseCategoriesWithLevel(categories, 0, ^(Category *category, PlaceItem *placeItem, NSUInteger level) {
    if (category != nil && placeItem == nil) {
      flatCategories[category.uuid] = category;
      if (level == 0) {
        Category *categoryRandomized = [category copyWithZone:nil];
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
  traverseCategories(self.categories, ^(Category *category, PlaceItem *placeItem) {
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

- (void)requestCategoriesUpdate:(NSArray<Category *> *)categoriesScheduledForUpdate
                           eTag:(NSString *)eTag {
    // TODO: change this to show "new content is available" widget
    self.categoriesScheduledForUpdate = categoriesScheduledForUpdate;
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

- (void)notifyObserversDetailsBatch:(DetailsLoadState)detailsLoadState {
  [self.detailsBatchObservers enumerateObjectsUsingBlock:^(id<DetailsBatchObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      [obj onDetailsBatchStatusUpdate:detailsLoadState];
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

