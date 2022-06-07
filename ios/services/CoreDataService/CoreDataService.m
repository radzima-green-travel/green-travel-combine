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
#import "StoredInformationReference+CoreDataProperties.h"

#import "PlaceItem.h"
#import "PlaceCategory.h"
#import "SearchItem.h"
#import "CategoryUtils.h"
#import "InformationReference.h"
#import "PlaceDetails.h"
#import "TextUtils.h"
#import "URLUtils.h"
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

- (void)loadCategoriesWithCompletion:(void(^)(NSArray<PlaceCategory *>*))completion {
    __weak typeof(self) weakSelf = self;
    [self.persistentContainer performBackgroundTask:^(NSManagedObjectContext *ctx) {
        NSFetchRequest *fetchRequest = [StoredCategory fetchRequest];
        fetchRequest.predicate = [NSPredicate predicateWithFormat:@"parent == %@", nil];
        NSError *error;
        NSArray<StoredCategory *> *fetchResult = [ctx executeFetchRequest:fetchRequest error:&error];
        NSMutableArray<PlaceCategory *> *categories = [weakSelf mapStoredCategoriesToCategories:fetchResult];
        completion(categories);
    }];
}

- (PlaceItem *)mapStoredPlaceItemToPlaceItem:(StoredPlaceItem *)storedItem
                                withCategory:(PlaceCategory *)category {
    PlaceItem *item = [[PlaceItem alloc] init];
    item.title = storedItem.title;
    item.uuid = storedItem.uuid;
    item.category = category;
    CLLocationCoordinate2D coords;
    [storedItem.coords getBytes:&coords length:sizeof(coords)];
    item.coords = coords;
    item.cover = storedItem.coverURL;
    item.bookmarked = storedItem.bookmarked;
    item.address = storedItem.address;
    item.length = storedItem.length.description;
    item.singularName = storedItem.singularName;
    return item;
}

- (PlaceCategory *)mapStoredCategoryToCategory:(StoredCategory *)storedCategory {
    PlaceCategory *category = [[PlaceCategory alloc] init];
    category.title = storedCategory.title;
    category.uuid = storedCategory.uuid;
    category.cover = storedCategory.coverURL;
    category.icon = storedCategory.icon;
    category.singularName = storedCategory.singularName;
    NSMutableArray *items = [[NSMutableArray alloc] init];
    [storedCategory.items enumerateObjectsUsingBlock:^(StoredPlaceItem * _Nonnull storedItem, NSUInteger idx, BOOL * _Nonnull stop) {
        [items addObject:[self mapStoredPlaceItemToPlaceItem:storedItem withCategory:category]];
    }];
    category.items = items;
    category.categories = [self mapStoredCategoriesToCategories:storedCategory.categories.array];
    return category;
}


- (NSMutableArray<PlaceCategory *>*)mapStoredCategoriesToCategories:(NSArray<StoredCategory *>*)storedCategories {
    NSMutableArray<PlaceCategory *> *categories = [[NSMutableArray alloc] init];
    __weak typeof(self) weakSelf = self;
    [storedCategories enumerateObjectsUsingBlock:^(StoredCategory * _Nonnull storedCategory, NSUInteger idx, BOOL * _Nonnull stop) {
        PlaceCategory *category = [weakSelf mapStoredCategoryToCategory:storedCategory];
        [categories addObject:category];
    }];
    return categories;
}

- (void)saveCategories:(NSArray<PlaceCategory *> *)categories {
  __weak typeof(self) weakSelf = self;
  [self.ctx performBlockAndWait:^{
    NSError *error;

    [weakSelf updateSearchItemsWhenSavingCategories:categories];
    [weakSelf reorderSearchItems];

    NSFetchRequest *fetchRequest = [StoredCategory fetchRequest];
    NSBatchDeleteRequest *deleteRequest = [[NSBatchDeleteRequest alloc] initWithFetchRequest:fetchRequest];
    [weakSelf.ctx executeRequest:deleteRequest error:&error];
    [weakSelf.ctx save:&error];
    if ([categories count]) {
      [weakSelf saveCategoriesWithinBlock:categories parentCategory:nil];
    }
  }];
}

- (void)saveDetailsFromItems:(NSMutableDictionary<NSString *, PlaceItem *> *)items
              withCompletion:(nonnull void (^)(void))completion {
  NSError *error;
  NSFetchRequest *fetchRequest = [StoredPlaceDetails fetchRequest];
  NSBatchDeleteRequest *deleteRequest = [[NSBatchDeleteRequest alloc] initWithFetchRequest:fetchRequest];
  [self.ctx executeRequest:deleteRequest error:&error];
  __weak typeof(self) weakSelf = self;
  [self.ctx performBlockAndWait:^{
    __strong typeof(weakSelf) strongSelf = weakSelf;
    if ([items count] == 0) {
      return;
    }
    NSError *error;
    [items enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key,
                                               PlaceItem * _Nonnull item,
                                               BOOL * _Nonnull stop) {
      StoredPlaceDetails *storedDetails =
      [strongSelf mapDetailsToStoredDetails:item.details];
      [strongSelf.ctx insertObject:storedDetails];
    }];
    [strongSelf.ctx save:&error];
    completion();
  }];
}

- (void)updateSearchItemsWhenSavingCategories:(NSArray<PlaceCategory *> *)categories {
    NSMutableSet<NSString *> *incomingItemUUIDs = [[NSMutableSet alloc] init];
    traverseCategories(categories, ^(PlaceCategory *category, PlaceItem *placeItem) {
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

- (void)saveCategoriesWithinBlock:(NSArray<PlaceCategory *> *)categories
        parentCategory:(StoredCategory *)parentCategory {
    __weak typeof(self) weakSelf = self;
    [categories enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
        NSError *error;
        StoredCategory *storedCategory = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCategory" inManagedObjectContext:weakSelf.ctx];
        storedCategory.title = category.title;
        storedCategory.uuid = category.uuid;
        storedCategory.icon = category.icon;
        storedCategory.singularName = category.singularName;
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
    storedItem.address = item.address;
    storedItem.length = item.length.description;
    storedItem.singularName = item.singularName;
    return storedItem;
}

#pragma mark - Mapping image URLs
NSString* mapURLsToStoredURLs(NSArray<NSString *> *urls) {
  return [urls componentsJoinedByString:@","];
}

NSArray<NSString *>* mapStoredURLsToURLs(NSString *urls) {
  NSArray<NSString *> *encodedURLs = [urls componentsSeparatedByString:@","];
  return encodedURLs;
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
  storedDetails.length = details.length.description;
  storedDetails.singularName = details.singularName;
  
  storedDetails.imageURLs = mapURLsToStoredURLs(details.images);
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
  [self addReferencesToDetails:details.references add:^(StoredInformationReference *storedReference) {
    [storedDetails addReferencesObject:storedReference];
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

- (void)addReferencesToDetails:(NSArray<InformationReference *> *)references
                                       add:(void (^)(StoredInformationReference*))add {
  __weak typeof(self) weakSelf = self;
  [references enumerateObjectsUsingBlock:^(InformationReference * _Nonnull reference, NSUInteger idx, BOOL * _Nonnull stop) {
    StoredInformationReference *storedReference = [NSEntityDescription insertNewObjectForEntityForName:@"StoredInformationReference" inManagedObjectContext:weakSelf.ctx];
    storedReference.url = reference.url;
    storedReference.title = reference.title;
    add(storedReference);
  }];
}

- (void)savePath:(NSArray<CLLocation *> *)path
   storedDetails:(StoredPlaceDetails *)storedDetails {
  __weak typeof(self) weakSelf = self;
  StoredCoordinateCollection *coordinateCollection = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCoordinateCollection" inManagedObjectContext:weakSelf.ctx];
  [path enumerateObjectsUsingBlock:^(CLLocation * _Nonnull pathPoint, NSUInteger idx, BOOL * _Nonnull stop) {
    StoredCoordinate *coordinate = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCoordinate" inManagedObjectContext:weakSelf.ctx];
    coordinate.latitude = pathPoint.coordinate.latitude;
    coordinate.longitude = pathPoint.coordinate.longitude;
    [coordinateCollection addCoordinatesObject:coordinate];
  }];
  storedDetails.path = coordinateCollection;
}

- (void)saveArea:(NSArray<NSArray<CLLocation *> *> *)area
   storedDetails:(StoredPlaceDetails *)storedDetails {
  __weak typeof(self) weakSelf = self;
  StoredArea *storedArea = [NSEntityDescription insertNewObjectForEntityForName:@"StoredArea" inManagedObjectContext:weakSelf.ctx];
  [area enumerateObjectsUsingBlock:^(NSArray<CLLocation *> * _Nonnull path, NSUInteger idx, BOOL * _Nonnull stop) {
    StoredCoordinateCollection *coordinateCollection = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCoordinateCollection" inManagedObjectContext:weakSelf.ctx];
    [path enumerateObjectsUsingBlock:^(CLLocation * _Nonnull pathPoint, NSUInteger idx, BOOL * _Nonnull stop) {
      StoredCoordinate *coordinate = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCoordinate" inManagedObjectContext:weakSelf.ctx];
      coordinate.latitude = pathPoint.coordinate.latitude;
      coordinate.longitude = pathPoint.coordinate.longitude;
      [coordinateCollection addCoordinatesObject:coordinate];
    }];
    [storedArea addCoordinateCollectionsObject:coordinateCollection];
  }];
  storedDetails.area = storedArea;
}

#pragma mark - mapStoredDetailsToDetails
- (PlaceDetails *)mapStoredDetailsToDetails:(StoredPlaceDetails *)storedDetails {
  PlaceDetails *details = [[PlaceDetails alloc] init];
  details.address = storedDetails.address;
  details.url = storedDetails.url;
  details.images = mapStoredURLsToURLs(storedDetails.imageURLs);
  details.descriptionHTML = storedDetails.descriptionHTML;
  details.length = storedDetails.length.description;
  details.singularName = storedDetails.singularName;

  details.categoryIdToItems =
      categoryIdToItemsFromStored(storedDetails.linkedCategories);
  details.categoryIdToItemsBelongsTo =
      categoryIdToItemsFromStored(storedDetails.linkedCategoriesBelongsTo);
  details.references =
      referencesFromStored(storedDetails.references);

  [self retrievePath:storedDetails.path.coordinates details:details];
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

NSMutableArray<InformationReference *>* referencesFromStored(NSOrderedSet<StoredInformationReference *> *storedReferences) {
  NSMutableArray<InformationReference *> *references = [[NSMutableArray alloc] init];
  [storedReferences enumerateObjectsUsingBlock:^(StoredInformationReference * _Nonnull storedReference, NSUInteger idx, BOOL * _Nonnull stop) {
    if ([storedReference.url length] == 0) {
      return;
    }
    InformationReference *reference = [[InformationReference alloc] init];
    reference.url = storedReference.url;
    reference.title = storedReference.title;
    [references addObject:reference];
  }];
  // TODO: preserve ordering in database.
  [references sortUsingComparator:^NSComparisonResult(InformationReference * _Nonnull a,
                                                      InformationReference * _Nonnull b) {
    if ([a.url hasPrefix:@"https"] && ![b.url hasPrefix:@"https"]) {
      return NSOrderedAscending;
    }
    if (![a.url hasPrefix:@"https"] && [b.url hasPrefix:@"https"]) {
      return NSOrderedDescending;
    }
    return [a.title localizedCaseInsensitiveCompare:b.title];
  }];
  return references;
}

- (void)retrievePath:(NSOrderedSet<StoredCoordinate *> *)storedPath
   details:(PlaceDetails *)details {
  NSMutableArray<CLLocation *> *path = [[NSMutableArray alloc] init];
  [storedPath enumerateObjectsUsingBlock:^(StoredCoordinate * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    CLLocation *location = [[CLLocation alloc] initWithLatitude:obj.latitude longitude:obj.longitude];
    [path addObject:location];
  }];
  details.path = path;
}

- (void)retrieveArea:(StoredArea *)storedArea
   details:(PlaceDetails *)details {
  NSMutableArray<NSMutableArray<CLLocation *> *> *area = [[NSMutableArray alloc] init];
  [storedArea.coordinateCollections enumerateObjectsUsingBlock:^(StoredCoordinateCollection * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    NSMutableArray<CLLocation *> *path = [[NSMutableArray alloc] init];
    [obj.coordinates enumerateObjectsUsingBlock:^(StoredCoordinate * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      CLLocation *location = [[CLLocation alloc] initWithLatitude:obj.latitude longitude:obj.longitude];
      [path addObject:location];
    }];
    [area addObject:path];
  }];

  details.area = area;
}

- (void)retrieveArea:(NSArray<NSArray<CLLocation *> *> *)area
   storedDetails:(StoredPlaceDetails *)storedDetails {
  __weak typeof(self) weakSelf = self;
  StoredArea *storedArea = [NSEntityDescription insertNewObjectForEntityForName:@"StoredArea" inManagedObjectContext:weakSelf.ctx];
  [area enumerateObjectsUsingBlock:^(NSArray<CLLocation *> * _Nonnull path, NSUInteger idx, BOOL * _Nonnull stop) {
    StoredCoordinateCollection *coordinateCollection = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCoordinateCollection" inManagedObjectContext:weakSelf.ctx];
    [path enumerateObjectsUsingBlock:^(CLLocation * _Nonnull pathPoint, NSUInteger idx, BOOL * _Nonnull stop) {
      StoredCoordinate *coordinate = [NSEntityDescription insertNewObjectForEntityForName:@"StoredCoordinate" inManagedObjectContext:weakSelf.ctx];
      coordinate.latitude = pathPoint.coordinate.latitude;
      coordinate.longitude = pathPoint.coordinate.longitude;
      [coordinateCollection addCoordinatesObject:coordinate];
    }];
    [storedArea addCoordinateCollectionsObject:coordinateCollection];
  }];
  storedDetails.area = storedArea;
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
           withCompletion:(void (^)(PlaceDetails *, NSError *))completion {
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
      completion(details, error);
      return;
    }
    completion(nil, error);
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
        storedDetails.length = details.length.description;
        storedDetails.singularName = details.singularName;
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
