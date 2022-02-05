//
//  CategoryUtils.m
//  GreenTravel
//
//  Created by Alex K on 9/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "CategoryUtils.h"
#import "IndexModelData.h"
#import "PlaceCategory.h"
#import "PlaceItem.h"
#import "PlaceDetails.h"
#import "ImageUtils.h"
#import "StoredPlaceItem+CoreDataProperties.h"
#import "StoredCategory+CoreDataProperties.h"
#import "URLUtils.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"

void traverseCategoriesWithLevel(NSArray<PlaceCategory *> *categories, NSUInteger level, void(^onCategoryAndItem)(PlaceCategory*, PlaceItem*, NSUInteger)) {
  [categories enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
    onCategoryAndItem(category, nil, level);
    [category.items enumerateObjectsUsingBlock:^(PlaceItem * _Nonnull item, NSUInteger idx, BOOL * _Nonnull stop) {
      onCategoryAndItem(category, item, level);
    }];
    traverseCategoriesWithLevel(category.categories, level + 1,
                                onCategoryAndItem);
  }];
}

void traverseCategories(NSArray<PlaceCategory *> *categories, void(^onCategoryAndItem)(PlaceCategory*, PlaceItem*)) {
  traverseCategoriesWithLevel(categories, 0, ^(PlaceCategory *category, PlaceItem *item, NSUInteger level) {
    onCategoryAndItem(category, item);
  });
}

void traverseStoredCategories(NSArray<StoredCategory *> *categories, void(^onCategoryAndItem)(StoredCategory*, StoredPlaceItem*)) {
    [categories enumerateObjectsUsingBlock:^(StoredCategory * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
        onCategoryAndItem(category, nil);
        [category.items enumerateObjectsUsingBlock:^(StoredPlaceItem * _Nonnull item, NSUInteger idx, BOOL * _Nonnull stop) {
            onCategoryAndItem(category, item);
        }];
        traverseStoredCategories(category.categories.array, onCategoryAndItem);
    }];
}


BOOL isItemsEqual(NSArray<PlaceItem *> *itemsA, NSArray<PlaceItem *> *itemsB) {
    if ([itemsA count] != [itemsB count]) {
        return NO;
    }
    __block BOOL equal = YES;
    [itemsA enumerateObjectsUsingBlock:^(PlaceItem * _Nonnull itemA, NSUInteger idx, BOOL * _Nonnull stop) {
        if (![itemA.uuid isEqualToString:itemsB[idx].uuid]) {
            equal = NO;
            *stop = YES;
        }
    }];
    return equal;
}

BOOL isCategoriesEqual(NSArray<PlaceCategory *> *categoriesA, NSArray<PlaceCategory *> *categoriesB) {
    if ([categoriesA count] != [categoriesB count]) {
        return NO;
    }
    __block BOOL equal = YES;
    [categoriesA enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
        if (!isItemsEqual(category.items, categoriesB[idx].items)) {
            *stop = YES;
            equal = NO;
        }
        if (!isCategoriesEqual(category.categories, categoriesB[idx].categories)) {
            *stop = YES;
            equal = NO;
        }
    }];
    return equal;
}

NSMutableDictionary<NSString *, PlaceCategory *>* flattenCategoriesTreeIntoCategoriesMap(NSArray<PlaceCategory *> *categories) {
    NSMutableDictionary *flatCategories = [[NSMutableDictionary alloc] init];
    traverseCategories(categories, ^(PlaceCategory *category, PlaceItem *placeItem) {
        if (flatCategories[category.uuid]) {
            return;
        }
        [flatCategories setValue:category forKey:category.uuid];
    });
    return flatCategories;
}

NSMutableDictionary<NSString *, PlaceItem *>* flattenCategoriesTreeIntoItemsMap(NSArray<PlaceCategory *> *categories) {
    NSMutableDictionary *flatItems = [[NSMutableDictionary alloc] init];
    traverseCategories(categories, ^(PlaceCategory *category, PlaceItem *placeItem) {
        if (!placeItem || flatItems[placeItem.uuid]) {
            return;
        }
        [flatItems setValue:placeItem forKey:placeItem.uuid];
    });
    return flatItems;
}

PlaceCategory* mapRawCategoryToPlaceCategory(NSDictionary *rawCategory) {
  PlaceCategory *category = [[PlaceCategory alloc] init];
  category.title = rawCategory[@"name"];
  category.cover = getFullImageURL(rawCategory[@"cover"]);
  category.uuid = rawCategory[@"id"];
  category.icon = rawCategory[@"icon"];
  return category;
}

NSMutableArray* buildCategoryIdToItemIdsRelations(NSArray *itemIds,
                                          NSMutableDictionary<NSString*, PlaceItem*> *flatItems,
                                          NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories) {
  NSMutableArray<CategoryUUIDToRelatedItemUUIDs *>
  *categoryIdToItemsOrdered = [[NSMutableArray alloc] init];
  NSMutableDictionary<NSString *, CategoryUUIDToRelatedItemUUIDs *>
  *categoryIdToItems = [[NSMutableDictionary alloc] init];
  
  [itemIds enumerateObjectsUsingBlock:^(NSString * _Nonnull itemId,
                                        NSUInteger idx,
                                        BOOL * _Nonnull stop) {
    NSString *categoryId = flatItems[itemId].parentCategory.uuid;
    if (categoryId == nil) {
      return;
    }
    if (categoryIdToItems[categoryId] == nil) {
      CategoryUUIDToRelatedItemUUIDs *categoryUUIDToRelatedItemUUIDs = [[CategoryUUIDToRelatedItemUUIDs alloc] init];
      categoryUUIDToRelatedItemUUIDs.categoryUUID = categoryId;
      categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs = [[NSMutableOrderedSet alloc] init];
      [categoryIdToItemsOrdered addObject:categoryUUIDToRelatedItemUUIDs];
      categoryIdToItems[categoryId] = categoryUUIDToRelatedItemUUIDs;
    }
    CategoryUUIDToRelatedItemUUIDs *categoryUUIDToRelatedItemUUIDs = categoryIdToItems[categoryId];
    [categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs addObject:itemId];
  }];
  
  return categoryIdToItemsOrdered;
}

PlaceDetails* mapRawDetailsToPlaceDetails(NSDictionary *rawItem,
                                          NSMutableDictionary<NSString*, PlaceItem*> *flatItems,
                                          NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories) {
  PlaceDetails *details = [[PlaceDetails alloc] init];
  NSMutableArray *imageURLs = [[NSMutableArray alloc] init];
  if (rawItem[@"images"]) {
    [rawItem[@"images"] enumerateObjectsUsingBlock:^(id  _Nonnull imageURL,
                                                  NSUInteger idx,
                                                  BOOL * _Nonnull stop) {
      [imageURLs addObject:getFullImageURL(imageURL)];
    }];
  }
  details.uuid = rawItem[@"id"];
  details.parentItem = flatItems[details.uuid];
  details.images = [imageURLs copy];
  if (rawItem[@"address"] && ![rawItem[@"address"] isEqual:[NSNull null]]) {
    details.address = rawItem[@"address"];
  } else {
    details.address = @"";
  }
  if (rawItem[@"description"] && ![rawItem[@"description"] isEqual:[NSNull null]]) {
    details.descriptionHTML = rawItem[@"description"];
  } else {
    details.descriptionHTML = @"";
  }
  if (rawItem[@"url"] && ![rawItem[@"url"] isEqual:[NSNull null]]) {
    NSString *url = encodeURL(rawItem[@"url"]);
    details.url = url;
  } else {
    details.url = @"";
  }
  NSMutableArray<NSMutableArray<CLLocation *> *> *mappedAreaCoords = [[NSMutableArray alloc] init];
  if (rawItem[@"area"] && ![rawItem[@"area"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSArray<NSArray<NSNumber *> *> *> *> *coords = rawItem[@"area"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSArray<NSArray<NSNumber *> *> *> * _Nonnull polygonPart, NSUInteger partIdx, BOOL * _Nonnull stop) {
      [mappedAreaCoords addObject:[[NSMutableArray alloc] init]];
      [polygonPart[0] enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
        [mappedAreaCoords[partIdx] addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
      }];
    }];
    details.area = [NSArray arrayWithArray:[mappedAreaCoords copy]];
  }

  NSMutableArray<CLLocation *> *mappedPathCoords = [[NSMutableArray alloc] init];
  if (rawItem[@"routes"] && ![rawItem[@"routes"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSNumber *> *> *coords = rawItem[@"routes"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
      [mappedPathCoords addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
    }];
    details.path = [NSArray arrayWithArray:[mappedPathCoords copy]];
  }

  details.categoryIdToItems =
  buildCategoryIdToItemIdsRelations(rawItem[@"include"], flatItems, flatCategories);
  details.categoryIdToItemsBelongsTo =
  buildCategoryIdToItemIdsRelations(rawItem[@"belongsTo"], flatItems, flatCategories);
  return details;
}

CLLocationCoordinate2D mapRawCoordsToCLLocationCoordinate2D(NSDictionary *rawItem) {
  if (rawItem[@"location"] == [NSNull null] || rawItem[@"location"][@"lat"] == [NSNull null] || rawItem[@"location"][@"lon"] == [NSNull null] ) {
    return kCLLocationCoordinate2DInvalid;
  }
  return CLLocationCoordinate2DMake([rawItem[@"location"][@"lat"] doubleValue], [rawItem[@"location"][@"lon"] doubleValue]);
}

PlaceItem* mapRawItemToPlaceItem(NSDictionary *rawItem) {
  PlaceItem *placeItem = [[PlaceItem alloc] init];
  placeItem.title = rawItem[@"name"];
  placeItem.cover = getFullImageURL(rawItem[@"cover"]);
  placeItem.details = [[PlaceDetails alloc] init];
  placeItem.coords = mapRawCoordsToCLLocationCoordinate2D(rawItem);
  placeItem.uuid = rawItem[@"id"];
  if (rawItem[@"address"] && ![rawItem[@"address"] isEqual:[NSNull null]]) {
    placeItem.address = rawItem[@"address"];
  } else {
    placeItem.address = @"";
  }
  return placeItem;
}


BOOL categoryIsValid(NSDictionary *rawCategory) {
  return rawCategory[@"icon"] != nil && ![rawCategory[@"icon"] isEqual:[NSNull null]];
}

NSMutableDictionary<NSString*, PlaceCategory*>* mapToFlatCategories(NSMutableDictionary<NSString *, NSDictionary *>* rawCategories) {
  NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories = [[NSMutableDictionary alloc] init];
  [rawCategories enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawCategoryId, NSDictionary * _Nonnull rawCategory, BOOL * _Nonnull stop) {
    if (categoryIsValid(rawCategory)) {
      flatCategories[rawCategoryId] = mapRawCategoryToPlaceCategory(rawCategory);
    }
  }];
  [rawCategories enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawCategoryId, NSDictionary * _Nonnull rawCategory, BOOL * _Nonnull stop) {
    NSString *rawCategoryParentId = rawCategory[@"parent"];
    flatCategories[rawCategoryId].parentCategory = flatCategories[rawCategoryParentId];
  }];
  return flatCategories;
}

NSMutableDictionary<NSString*, PlaceItem*>* mapToFlatItems(NSMutableDictionary<NSString *, NSDictionary *>* rawItems, NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories) {
  NSMutableDictionary<NSString*, PlaceItem*> *flatItems = [[NSMutableDictionary alloc] init];
  [rawItems enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawItemId, NSDictionary * _Nonnull rawItem, BOOL * _Nonnull stop) {
    flatItems[rawItemId] = mapRawItemToPlaceItem(rawItem);
  }];
  [rawItems enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawItemId, NSDictionary * _Nonnull rawItem, BOOL * _Nonnull stop) {
    NSString *rawItemParentId = rawItem[@"categoryId"];
    flatItems[rawItemId].parentCategory = flatCategories[rawItemParentId];
  }];
  return flatItems;
}

void fillInDetails(NSMutableDictionary<NSString *, NSDictionary *>* rawItems,
                   NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories,
                   NSMutableDictionary<NSString*, PlaceItem*> *flatItems) {
  [rawItems enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawItemId, NSDictionary * _Nonnull rawItem, BOOL * _Nonnull stop) {
    PlaceItem *item = flatItems[rawItemId];
    item.details = mapRawDetailsToPlaceDetails(rawItem, flatItems,
                                               flatCategories);
  }];
}

#pragma mark - Merging into tree
NSMutableArray<PlaceCategory *>* mergeIntoCategoryTree(NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories, NSMutableDictionary<NSString*, PlaceItem*> *flatItems) {
  NSMutableArray<PlaceCategory *> *rootNodes = [[NSMutableArray alloc] init];
  [flatCategories enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, PlaceCategory * _Nonnull placeCategory, BOOL * _Nonnull stop) {
    if (placeCategory.parentCategory == nil) {
      [rootNodes addObject:placeCategory];
      return;
    }
    NSString *parentId = placeCategory.parentCategory.uuid;
    PlaceCategory *parentCategory = flatCategories[parentId];
    if (parentCategory.categories == nil) {
      parentCategory.categories = [[NSMutableArray alloc] init];
    }
    [parentCategory.categories addObject:placeCategory];
  }];
  [flatItems enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, PlaceItem * _Nonnull placeItem, BOOL * _Nonnull stop) {
    NSString *parentId = placeItem.parentCategory.uuid;
    PlaceCategory *parentCategory = flatCategories[parentId];
    if (parentCategory.items == nil) {
      parentCategory.items = [[NSMutableArray alloc] init];
    }
    [parentCategory.items addObject:placeItem];
  }];
  
  return rootNodes;
}

#pragma mark - Preparing IndexModelData
IndexModelData* rawIndexToIndexModelData(NSMutableDictionary<NSString *, NSDictionary *>* rawCategories,
                                         NSMutableDictionary<NSString *, NSDictionary *>* rawItems) {
  NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories = mapToFlatCategories(rawCategories);
  NSMutableDictionary<NSString*, PlaceItem*> *flatItems = mapToFlatItems(rawItems, flatCategories);
  fillInDetails(rawItems, flatCategories, flatItems);
  NSMutableArray<PlaceCategory *> *categoryTree = mergeIntoCategoryTree(flatCategories, flatItems);
  IndexModelData *indexModelData = [[IndexModelData alloc] init];
  indexModelData.flatCategories = flatCategories;
  indexModelData.flatItems = flatItems;
  indexModelData.categoryTree = categoryTree;
  return indexModelData;
}
