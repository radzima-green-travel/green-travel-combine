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
#import "UserDefaultsService.h"

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
  if (visible) { [self notifyObserversLoading:YES]; }
  __weak typeof(self) weakSelf = self;
  NSString *existingETag = [self.userDefaultsService loadETag];
  [self.apiService loadCategoriesWithCompletion:existingETag
                                     completion:^(NSArray<Category *>  * _Nonnull categories, NSString *eTag) {
    __strong typeof(weakSelf) strongSelf = weakSelf;
    if ([strongSelf.categories count] == 0 && [categories count] > 0) {
      [strongSelf.userDefaultsService saveETag:eTag];
      [strongSelf updateCategories:categories];
      [strongSelf.coreDataService saveCategories:categories];
      strongSelf.loading = NO;
      if (visible) { [strongSelf notifyObserversLoading:NO]; }
      return;
    }
    if (![existingETag isEqualToString:eTag] && [categories count] > 0) {
      NSArray<Category*> *newCategories =
      [strongSelf copyBookmarksFromOldCategories:strongSelf.categories
                                           toNew:categories];
      [strongSelf requestCategoriesUpdate:newCategories eTag:eTag];
    }
    strongSelf.loading = NO;
    if (visible) { [strongSelf notifyObserversLoading:NO]; }
  }];
}

- (void)refreshCategories {
    [self notifyObserversLoading:YES];
    __weak typeof(self) weakSelf = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC), dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        NSArray<Category*> *newCategories = [weakSelf.categoriesScheduledForUpdate copy];
        [strongSelf.userDefaultsService saveETag:strongSelf.eTagScheduledForUpdate];
        [strongSelf.coreDataService saveCategories:newCategories];
        [strongSelf notifyObserversLoading:NO];
        [strongSelf updateCategories:newCategories];
    });
}

- (void)retryCategories {
  [self notifyObserversLoading:YES];
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
    traverseCategories(categories, ^(Category *category, PlaceItem *placeItem) {
        if (category != nil) {
            flatCategories[category.uuid] = category;
        }
        if (placeItem != nil) {
            flatItems[placeItem.uuid] = placeItem;
        }
    });
    self.categories = categories;
    self.flatItems = flatItems;
    self.flatCategories = flatCategories;
    [self notifyObservers];
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

- (void)notifyObserversLoading:(BOOL)loading {
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



@end

