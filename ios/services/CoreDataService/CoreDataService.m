//
//  CoreDataService.m
//  GreenTravel
//
//  Created by Alex K on 9/6/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "CoreDataService.h"
#import <CoreData/CoreData.h>
#import "StoredPlaceItem+CoreDataProperties.h"
#import "StoredCategory+CoreDataProperties.h"
#import "StoredSearchItem+CoreDataProperties.h"
#import "StoredPlaceDetails+CoreDataProperties.h"
#import "StoredCategoryUUIDToRelatedItemUUIDs+CoreDataProperties.h"
#import "StoredRelatedItemUUID+CoreDataProperties.h"
#import "StoredCoordinate+CoreDataProperties.h"
#import "StoredCoordinateCollection+CoreDataProperties.h"
#import "StoredArea+CoreDataProperties.h"

#import "PlaceItem.h"
#import "Category.h"
#import "SearchItem.h"
#import "CategoryUtils.h"
#import "PlaceDetails.h"
#import "TextUtils.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"

@interface CoreDataService ()

{
NSPersistentContainer *_persistentContainer;
}

@property (strong, nonatomic) NSManagedObjectContext *ctx;

@end

@implementation CoreDataService

- (NSPersistentContainer *)persistentContainer {
    @synchronized (self) {
        if (_persistentContainer == nil) {
            _persistentContainer = [NSPersistentContainer  persistentContainerWithName:@"GreenTravel"];

            [_persistentContainer loadPersistentStoresWithCompletionHandler:
             ^(NSPersistentStoreDescription *storeDescription, NSError *error) {
              if (error != nil) {
                NSLog(@"Failed to load store: %@", error);
                abort();
              }
            }];

            _ctx = _persistentContainer.newBackgroundContext;
        }
    }
    return _persistentContainer;
}

#pragma mark - PlaceItem

- (void)updatePlaceItem:(PlaceItem *)placeItem bookmark:(BOOL)bookmark {
    [self.persistentContainer performBackgroundTask:^(NSManagedObjectContext *ctx) {
        NSFetchRequest *fetchRequest = [StoredCategory fetchRequest];
        NSError *error;
        NSArray<StoredCategory *> *fetchResult = [ctx executeFetchRequest:fetchRequest error:&error];
        fetchRequest.predicate = [NSPredicate predicateWithFormat:@"parent == %@", nil];
        traverseStoredCategories(fetchResult,
                                 ^(StoredCategory *category, StoredPlaceItem *storedPlaceItem) {
            if([storedPlaceItem.uuid isEqualToString:placeItem.uuid]){
                storedPlaceItem.bookmarked = bookmark;
            }
        });
        [ctx save:&error];
    }];
}

#pragma mark - Categories

- (void)loadCategoriesWithCompletion:(void(^)(NSArray<Category *>*))completion {
    __weak typeof(self) weakSelf = self;
    [self.persistentContainer performBackgroundTask:^(NSManagedObjectContext *ctx) {
        NSFetchRequest *fetchRequest = [StoredCategory fetchRequest];
        fetchRequest.predicate = [NSPredicate predicateWithFormat:@"parent == %@", nil];
        NSError *error;
        double startTime = [[NSDate now] timeIntervalSince1970];
        NSArray<StoredCategory *> *fetchResult = [ctx executeFetchRequest:fetchRequest error:&error];
        double total = [[NSDate now] timeIntervalSince1970] - startTime;
        NSLog(@"Fetch time: %f", total);
        startTime = [[NSDate now] timeIntervalSince1970];
        NSMutableArray<Category *> *categories = [weakSelf mapStoredCategoriesToCategories:fetchResult];
        total = [[NSDate now] timeIntervalSince1970] - startTime;
        NSLog(@"Map time: %f", total);
        completion(categories);
    }];
}

- (PlaceItem *)mapStoredPlaceItemToPlaceItem:(StoredPlaceItem *)storedItem
                                withCategory:(Category *)category {
    PlaceItem *item = [[PlaceItem alloc] init];
    item.title = storedItem.title;
    item.uuid = storedItem.uuid;
    item.category = category;
    CLLocationCoordinate2D coords;
    [storedItem.coords getBytes:&coords length:sizeof(coords)];
    item.coords = coords;
    item.cover = storedItem.coverURL;
    item.bookmarked = storedItem.bookmarked;
    // item.details = [self mapStoredDetailsToDetails:storedItem.details];
    return item;
}

- (Category *)mapStoredCategoryToCategory:(StoredCategory *)storedCategory {
    Category *category = [[Category alloc] init];
    category.title = storedCategory.title;
    category.uuid = storedCategory.uuid;
    category.cover = storedCategory.coverURL;
    category.icon = storedCategory.icon;
    NSMutableArray *items = [[NSMutableArray alloc] init];
    [storedCategory.items enumerateObjectsUsingBlock:^(StoredPlaceItem * _Nonnull storedItem, NSUInteger idx, BOOL * _Nonnull stop) {
        [items addObject:[self mapStoredPlaceItemToPlaceItem:storedItem withCategory:category]];
    }];
    category.items = items;
    category.categories = [self mapStoredCategoriesToCategories:storedCategory.categories.array];
    return category;
}


- (NSMutableArray<Category *>*)mapStoredCategoriesToCategories:(NSArray<StoredCategory *>*)storedCategories {
    NSMutableArray<Category *> *categories = [[NSMutableArray alloc] init];
    __weak typeof(self) weakSelf = self;
    [storedCategories enumerateObjectsUsingBlock:^(StoredCategory * _Nonnull storedCategory, NSUInteger idx, BOOL * _Nonnull stop) {
        Category *category = [weakSelf mapStoredCategoryToCategory:storedCategory];
        [categories addObject:category];
    }];
    return categories;
}

- (void)saveCategories:(NSArray<Category *> *)categories {
  __weak typeof(self) weakSelf = self;
  [self.ctx performBlockAndWait:^{
    NSError *error;
    
    [weakSelf updateSearchItemsWhenSavingCategories:categories];
    [weakSelf reorderSearchItems];
    
    NSFetchRequest *fetchRequest = [StoredCategory fetchRequest];
    NSBatchDeleteRequest *deleteRequest = [[NSBatchDeleteRequest alloc] initWithFetchRequest:fetchRequest];
    [weakSelf.ctx executeRequest:deleteRequest error:&error];
    
    if ([categories count]) {
      [weakSelf saveCategoriesWithinBlock:categories parentCategory:nil];
    }
  }];
}

- (void)saveDetailsFromCategories:(NSArray<Category *> *)categories {
  NSError *error;
  NSFetchRequest *fetchRequest = [StoredPlaceDetails fetchRequest];
  NSBatchDeleteRequest *deleteRequest = [[NSBatchDeleteRequest alloc] initWithFetchRequest:fetchRequest];
  [self.ctx executeRequest:deleteRequest error:&error];
  __weak typeof(self) weakSelf = self;
  [self.ctx performBlockAndWait:^{
    if ([categories count]) {
      traverseCategories(categories, ^(Category *cat, PlaceItem *item) {
        if (item != nil) {
          NSError *error;
          StoredPlaceDetails *storedDetails = [weakSelf mapDetailsToStoredDetails:item.details];
          [weakSelf.ctx insertObject:storedDetails];
        }
      });
      [weakSelf.ctx save:&error];
    }
  }];
}

- (void)updateSearchItemsWhenSavingCategories:(NSArray<Category *> *)categories {
    NSMutableSet<NSString *> *incomingItemUUIDs = [[NSMutableSet alloc] init];
    traverseCategories(categories, ^(Category *category, PlaceItem *placeItem) {
        if (placeItem == nil) {
            return;
        }
        [incomingItemUUIDs addObject:placeItem.uuid];
    });
    NSError *error;
    NSFetchRequest *fetchRequest = [StoredSearchItem fetchRequest];
    NSArray<StoredSearchItem *> *fetchResultSearchItem = [self.ctx executeFetchRequest:fetchRequest error:&error];
    
    [fetchResultSearchItem enumerateObjectsUsingBlock:^(StoredSearchItem * _Nonnull searchItem, NSUInteger idx, BOOL * _Nonnull stop) {
        NSError *error;
        if ([incomingItemUUIDs containsObject:searchItem.correspondingPlaceItemUUID]) {
            return;
        }
        [self.ctx deleteObject:searchItem];
        [self.ctx save:&error];
    }];
}

- (void)saveCategoriesWithinBlock:(NSArray<Category *> *)categories
        parentCategory:(StoredCategory *)parentCategory {
    __weak typeof(self) weakSelf = self;
    [categories enumerateObjectsUsingBlock:^(Category * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
        NSError *error;
        StoredCategory *storedCategory = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCategory" inManagedObjectContext:weakSelf.ctx];
        storedCategory.title = category.title;
        storedCategory.uuid = category.uuid;
        storedCategory.icon = category.icon;
        storedCategory.coverURL = category.cover != nil && category.cover != [NSNull null] ? category.cover : @"";
        storedCategory.parent = parentCategory;
        [category.items enumerateObjectsUsingBlock:^(PlaceItem * _Nonnull item, NSUInteger idx, BOOL * _Nonnull stop) {
            StoredPlaceItem *storedItem = [weakSelf mapPlaceItemToStoredPlaceItem:item];
            [storedCategory addItemsObject:storedItem];
        }];
        [parentCategory addCategoriesObject:storedCategory];
        if ([category.categories count]) {
            [weakSelf saveCategoriesWithinBlock:category.categories parentCategory:storedCategory];
        }
        [weakSelf.ctx save:&error];
    }];
}

#pragma mark - mapPlaceItemToStoredPlaceItem
- (StoredPlaceItem *)mapPlaceItemToStoredPlaceItem:(PlaceItem *)item {
    StoredPlaceItem *storedItem = (StoredPlaceItem*)[NSEntityDescription insertNewObjectForEntityForName:@"StoredPlaceItem" inManagedObjectContext:self.ctx];
    storedItem.title = item.title;
    CLLocationCoordinate2D coords = item.coords;
    NSData *coordsAsData = [NSData dataWithBytes:&coords
                                          length:sizeof(item.coords)];
    storedItem.coords = coordsAsData;
    storedItem.coverURL = item.cover != nil && item.cover != [NSNull null] ? item.cover : @"";
    storedItem.uuid = item.uuid;
    storedItem.bookmarked = item.bookmarked;
    // storedItem.details = [self mapDetailsToStoredDetails:item.details];
    return storedItem;
}
 
#pragma mark - mapDetailsToStoredDetails
- (StoredPlaceDetails *)mapDetailsToStoredDetails:(PlaceDetails *)details {
  __weak typeof(self) weakSelf = self;
  StoredPlaceDetails *storedDetails = [NSEntityDescription insertNewObjectForEntityForName:@"StoredPlaceDetails"
                                                                    inManagedObjectContext:weakSelf.ctx];
  storedDetails.uuid = details.uuid;
  storedDetails.address = details.address;
  storedDetails.url = details.url;
  storedDetails.descriptionHTML = details.descriptionHTML;
  storedDetails.imageURLs = [details.images componentsJoinedByString:@","];
  // Save linked categories.
  [self addLinkedCategoriesObjectToDetails:details.categoryIdToItems
                                       add:^(StoredCategoryUUIDToRelatedItemUUIDs*
                                             relatedCategoryUUIDs) {
    [storedDetails addLinkedCategoriesObject:relatedCategoryUUIDs];
  }];
  [self addLinkedCategoriesObjectToDetails:details.categoryIdToItemsBelongsTo
                                       add:^(StoredCategoryUUIDToRelatedItemUUIDs*
                                             relatedCategoryUUIDs) {
    [storedDetails addLinkedCategoriesBelongsToObject:relatedCategoryUUIDs];
  }];
  
  [weakSelf savePath:details.path storedDetails:storedDetails];
  [weakSelf saveArea:details.area storedDetails:storedDetails];
  
  return storedDetails;
}

- (void)addLinkedCategoriesObjectToDetails:(NSArray<CategoryUUIDToRelatedItemUUIDs *> *)categoryIdToItems
                                       add:(void (^)(StoredCategoryUUIDToRelatedItemUUIDs*))add {
  __weak typeof(self) weakSelf = self;
  [categoryIdToItems enumerateObjectsUsingBlock:^(CategoryUUIDToRelatedItemUUIDs * _Nonnull categoryUUIDToRelatedItemUUIDs, NSUInteger idx, BOOL * _Nonnull stop) {
    StoredCategoryUUIDToRelatedItemUUIDs *relatedCategoryUUIDs = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCategoryUUIDToRelatedItemUUIDs" inManagedObjectContext:weakSelf.ctx];
    relatedCategoryUUIDs.uuid = categoryUUIDToRelatedItemUUIDs.categoryUUID;
    [categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      StoredRelatedItemUUID *relatedItemUUID = [NSEntityDescription insertNewObjectForEntityForName:@"StoredRelatedItemUUID" inManagedObjectContext:weakSelf.ctx];
      relatedItemUUID.uuid = obj;
      [relatedCategoryUUIDs addRelatedItemUUIDsObject:relatedItemUUID];
    }];
    add(relatedCategoryUUIDs);
  }];
}

- (void)savePath:(NSArray<CLLocation *> *)path
   storedDetails:(StoredPlaceDetails *)storedDetails {
  NSError *error;
  NSDictionary *rootObject = @{@"root": path};
  NSData *pathData = [NSKeyedArchiver archivedDataWithRootObject:rootObject
                                           requiringSecureCoding:NO
                                                           error:&error];
  NSLog(@"Archiving error: %@", error);
  storedDetails.path = pathData;
}

- (void)saveArea:(NSArray<NSArray<CLLocation *> *> *)area
   storedDetails:(StoredPlaceDetails *)storedDetails {
  NSError *error;
  NSDictionary *rootObject = @{@"root": area};
  NSData *areaData = [NSKeyedArchiver archivedDataWithRootObject:rootObject
                                           requiringSecureCoding:NO
                                                           error:&error];
  NSLog(@"Archiving error: %@", error);
  storedDetails.area = areaData;
}

#pragma mark - mapStoredDetailsToDetails
- (PlaceDetails *)mapStoredDetailsToDetails:(StoredPlaceDetails *)storedDetails {
  PlaceDetails *details = [[PlaceDetails alloc] init];
  details.address = storedDetails.address;
  details.url = storedDetails.url;
  details.images = [storedDetails.imageURLs componentsSeparatedByString:@","];
  details.descriptionHTML = storedDetails.descriptionHTML;
  
  details.categoryIdToItems =
      categoryIdToItemsFromStored(storedDetails.linkedCategories);
  details.categoryIdToItemsBelongsTo =
      categoryIdToItemsFromStored(storedDetails.linkedCategoriesBelongsTo);
  
  [self retrievePath:storedDetails.path details:details];
  [self retrieveArea:storedDetails.area details:details];
  
  return details;
}

NSMutableArray<CategoryUUIDToRelatedItemUUIDs *>* categoryIdToItemsFromStored(NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *linkedCategories) {
  NSMutableArray<CategoryUUIDToRelatedItemUUIDs *> *categoryIdToItems = [[NSMutableArray alloc] init];
  [linkedCategories enumerateObjectsUsingBlock:^(StoredCategoryUUIDToRelatedItemUUIDs * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    CategoryUUIDToRelatedItemUUIDs *categoryUUIDToRelatedItemUUIDs = [[CategoryUUIDToRelatedItemUUIDs alloc] init];
    categoryUUIDToRelatedItemUUIDs.categoryUUID = obj.uuid;
    NSMutableArray<NSString *> *relatedItemUUIDs = [[NSMutableArray alloc] init];
    [obj.relatedItemUUIDs enumerateObjectsUsingBlock:^(StoredRelatedItemUUID * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      [relatedItemUUIDs addObject:obj.uuid];
    }];
    categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs = [[NSOrderedSet alloc] initWithArray:relatedItemUUIDs];
    [categoryIdToItems addObject:categoryUUIDToRelatedItemUUIDs];
  }];
  return categoryIdToItems;
}

- (void)retrievePath:(NSData *)storedPath
   details:(PlaceDetails *)details {
  NSError *error;
  if (@available(iOS 14.0, *)) {
    NSKeyedUnarchiver *unarchiver =
    [[NSKeyedUnarchiver alloc] initForReadingFromData:storedPath error:&error];
    NSArray<CLLocation *> *path =
    [unarchiver decodeObjectOfClasses:[NSSet setWithArray:@[[NSArray class],
                                                            [CLLocation class]]]
                               forKey:@"root"];
    details.path = path;
    return;
  }
}
  
- (void)retrieveArea:(NSData *)storedArea
             details:(PlaceDetails *)details {
  NSError *error;
  if (@available(iOS 14.0, *)) {
    NSKeyedUnarchiver *unarchiver =
    [[NSKeyedUnarchiver alloc] initForReadingFromData:storedArea error:&error];
    NSArray<NSArray<CLLocation *> *> *area =
    [unarchiver decodeObjectOfClasses:[NSSet setWithArray:@[[NSArray class],
                                                            [CLLocation class]]]
                               forKey:@"root"];
    NSLog(@"Unarchiving error: %@", error);
    details.area = area;
    return;
  }
}

#pragma mark - Search items

- (void)addSearchItem:(SearchItem *)searchItem {
    __weak typeof(self) weakSelf = self;
    [self.persistentContainer performBackgroundTask:^(NSManagedObjectContext *ctx) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        NSError *error;
        // Delete dublicate.
        [strongSelf removeSearchItem:searchItem];
        // Request order.
        NSFetchRequest *fetchRequestSearchItem = [StoredSearchItem fetchRequest];
        NSUInteger count = [strongSelf.ctx
                            countForFetchRequest:fetchRequestSearchItem
                            error:&error];
        // Create new search item.
        StoredSearchItem *storedSearchItem =
        [NSEntityDescription insertNewObjectForEntityForName:@"StoredSearchItem" inManagedObjectContext:ctx];
        storedSearchItem.order = count;
        storedSearchItem.correspondingPlaceItemUUID =
        searchItem.correspondingPlaceItemUUID;
        [ctx save:&error];
    }];
}

- (void)removeSearchItem:(SearchItem *)searchItem {
    __weak typeof(self) weakSelf = self;
    __block StoredSearchItem *foundItem;
    [self.ctx performBlockAndWait:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        NSError *error;
        NSFetchRequest *fetchRequestSearchItem = [StoredSearchItem fetchRequest];
        fetchRequestSearchItem.predicate = [NSPredicate predicateWithFormat:@"correspondingPlaceItemUUID == %@",
                                  searchItem.correspondingPlaceItemUUID];
        NSArray<StoredSearchItem *> *fetchResultSearchItem = [strongSelf.ctx
                                                              executeFetchRequest:fetchRequestSearchItem
                                                              error:&error];
        foundItem = [fetchResultSearchItem firstObject];
        if (foundItem) {
            [weakSelf.ctx deleteObject:foundItem];
            [weakSelf.ctx save:&error];
        }
    }];
    if (foundItem) {
        [weakSelf reorderSearchItems];
    }
}

- (void)reorderSearchItems {
    __weak typeof(self) weakSelf = self;
    [self.ctx performBlockAndWait:^{
        NSError *error;
        NSFetchRequest *fetchRequestSearchItem = [StoredSearchItem fetchRequest];
        NSSortDescriptor *sortByOrder = [[NSSortDescriptor alloc] initWithKey:@"order" ascending:YES];
        fetchRequestSearchItem.sortDescriptors = @[sortByOrder];
        NSArray<StoredSearchItem *> *fetchResultSearchItem = [weakSelf.ctx executeFetchRequest:fetchRequestSearchItem error:&error];
        [fetchResultSearchItem enumerateObjectsUsingBlock:^(StoredSearchItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            obj.order = idx;
        }];
        [weakSelf.ctx save:&error];
    }];
}

- (void)loadSearchItemsWithCompletion:(void (^)(NSArray<SearchItem *> * _Nonnull))completion {
    __weak typeof(self) weakSelf = self;
    [self.ctx performBlockAndWait:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        NSError *error;
        NSMutableArray *searchItems = [[NSMutableArray alloc] init];
        NSFetchRequest *fetchRequestSearchItem = [StoredSearchItem fetchRequest];
        NSSortDescriptor *sortByOrder = [[NSSortDescriptor alloc] initWithKey:@"order" ascending:NO];
        fetchRequestSearchItem.sortDescriptors = @[sortByOrder];
        NSArray<StoredSearchItem *> *fetchResultSearchItem = [strongSelf.ctx executeFetchRequest:fetchRequestSearchItem error:&error];
        [fetchResultSearchItem enumerateObjectsUsingBlock:^(StoredSearchItem * _Nonnull storedSearchItem, NSUInteger idx, BOOL * _Nonnull stop) {
            SearchItem *searchItem = [[SearchItem alloc] init];
            searchItem.correspondingPlaceItemUUID = storedSearchItem.correspondingPlaceItemUUID;
            [searchItems addObject:searchItem];
        }];
        completion(searchItems);
    }];
}

- (void)loadDetailsByUUID:(NSString *)uuid
           withCompletion:(void (^)(PlaceDetails *))completion {
  __weak typeof(self) weakSelf = self;
  [self.ctx performBlockAndWait:^{
    __strong typeof(weakSelf) strongSelf = weakSelf;
    NSError *error;
    NSFetchRequest *fetchRequestSearchItem = [StoredPlaceDetails fetchRequest];
    fetchRequestSearchItem.predicate = [NSPredicate predicateWithFormat:@"uuid == %@", uuid];
    NSArray<StoredPlaceDetails *> *fetchResult = [strongSelf.ctx executeFetchRequest:fetchRequestSearchItem error:&error];
    StoredPlaceDetails *storedDetails = [fetchResult firstObject];
    if (storedDetails) {
      PlaceDetails *details = [strongSelf mapStoredDetailsToDetails:storedDetails];
      completion(details);
      return;
    }
    completion(nil);
  }];
}

- (void)savePlaceDetails:(PlaceDetails *)details forUUID:(NSString *)uuid {
    __weak typeof(self) weakSelf = self;
    [self.ctx performBlockAndWait:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        NSError *error;
        NSFetchRequest *fetchRequestSearchItem = [StoredPlaceDetails fetchRequest];
        fetchRequestSearchItem.predicate = [NSPredicate predicateWithFormat:@"uuid == %@", uuid];
        NSArray<StoredPlaceDetails *> *fetchResult = [strongSelf.ctx executeFetchRequest:fetchRequestSearchItem error:&error];
        StoredPlaceDetails *storedDetails = [fetchResult firstObject];
        if (storedDetails) {
            [strongSelf.ctx deleteObject:storedDetails];
            [strongSelf.ctx save:&error];
        };
        storedDetails = [NSEntityDescription insertNewObjectForEntityForName:@"StoredPlaceDetails" inManagedObjectContext:strongSelf.ctx];
        storedDetails.uuid = uuid;
        storedDetails.address = details.address;
        storedDetails.descriptionHTML = details.descriptionHTML;
        storedDetails.imageURLs = [details.images componentsJoinedByString:@","];
        // Save linked categories.
        [details.categoryIdToItems enumerateObjectsUsingBlock:^(CategoryUUIDToRelatedItemUUIDs * _Nonnull categoryUUIDToRelatedItemUUIDs, NSUInteger idx, BOOL * _Nonnull stop) {
            StoredCategoryUUIDToRelatedItemUUIDs *relatedCategoryUUIDs = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCategoryUUIDToRelatedItemUUIDs" inManagedObjectContext:strongSelf.ctx];
            relatedCategoryUUIDs.uuid = categoryUUIDToRelatedItemUUIDs.categoryUUID;
            [categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                StoredRelatedItemUUID *relatedItemUUID = [NSEntityDescription insertNewObjectForEntityForName:@"StoredRelatedItemUUID" inManagedObjectContext:strongSelf.ctx];
                relatedItemUUID.uuid = obj;
                [relatedCategoryUUIDs addRelatedItemUUIDsObject:relatedItemUUID];
            }];

            [storedDetails addLinkedCategoriesObject:relatedCategoryUUIDs];
        }];
        [strongSelf.ctx save:&error];
    }];
}

@end
