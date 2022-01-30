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
#import "StoredPlaceItem+CoreDataProperties.h"
#import "StoredCategory+CoreDataProperties.h"

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
  category.title = rawCategory[@"i18n"][4][@"name"];
  category.cover = getFullImageURL(obj[@"cover"]);
  category.uuid = rawCategory[@"id"];
  category.icon = rawCategory[@"icon"];
  return category;
}

PlaceDetails* mapRawDetailsToPlaceDetails(NSDictionary *rawItem) {
  PlaceDetails *details = [[PlaceDetails alloc] init];
  NSMutableArray *imageURLs = [[NSMutableArray alloc] init];
  if (item[@"images"]) {
    [item[@"images"] enumerateObjectsUsingBlock:^(id  _Nonnull imageURL,
                                                  NSUInteger idx,
                                                  BOOL * _Nonnull stop) {
      [imageURLs addObject:getFullImageURL(imageURL)];
    }];
  }
  details.uuid = item[@"id"];
  details.images = [imageURLs copy];
  if (item[@"address"] && ![item[@"address"] isEqual:[NSNull null]]) {
    details.address = item[@"address"];
  } else {
    details.address = @"";
  }
  if (item[@"description"] && ![item[@"description"] isEqual:[NSNull null]]) {
    details.descriptionHTML = item[@"description"];
  } else {
    details.descriptionHTML = @"";
  }
  if (item[@"url"] && ![item[@"url"] isEqual:[NSNull null]]) {
    NSString *url = encodeURL(item[@"url"]);
    details.url = url;
  } else {
    details.url = @"";
  }
  NSMutableArray<NSMutableArray<CLLocation *> *> *mappedAreaCoords = [[NSMutableArray alloc] init];
  if (item[@"area"] && ![item[@"area"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSArray<NSArray<NSNumber *> *> *> *> *coords = item[@"area"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSArray<NSArray<NSNumber *> *> *> * _Nonnull polygonPart, NSUInteger partIdx, BOOL * _Nonnull stop) {
      [mappedAreaCoords addObject:[[NSMutableArray alloc] init]];
      [polygonPart[0] enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
        [mappedAreaCoords[partIdx] addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
      }];
    }];
    details.area = [NSArray arrayWithArray:[mappedAreaCoords copy]];
  }

  NSMutableArray<CLLocation *> *mappedPathCoords = [[NSMutableArray alloc] init];
  if (item[@"routes"] && ![item[@"routes"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSNumber *> *> *coords = item[@"routes"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
      [mappedPathCoords addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
    }];
    details.path = [NSArray arrayWithArray:[mappedPathCoords copy]];
  }

  details.categoryIdToItems = categoryIdToItemsFromJSON(item[@"include"]);
  details.categoryIdToItemsBelongsTo = categoryIdToItemsFromJSON(item[@"belongsTo"]);
  return details;
}

- (CLLocationCoordinate2D)mapRawCoordsToCLLocationCoordinate2D(NSDictionary *item) {
  if (item[@"location"] == [NSNull null] || item[@"location"][@"lat"] == [NSNull null] || item[@"location"][@"lon"] == [NSNull null] ) {
    return kCLLocationCoordinate2DInvalid;
  }
  return CLLocationCoordinate2DMake([item[@"location"][@"lat"] doubleValue], [item[@"location"][@"lon"] doubleValue]);
}

PlaceItem* mapRawItemToPlaceItem(NSDictionary *rawItem) {
  PlaceItem *placeItem = [[PlaceItem alloc] init];
  placeItem.title = rawItem[@"i18n"][4][@"name"];
  placeItem.cover = getFullImageURL(obj[@"cover"]);
  placeItem.details = mapRawDetailsToPlaceDetails(rawItem);
  placeItem.coords = mapRawCoordsToCLLocationCoordinate2D(obj);
  placeItem.uuid = rawItem[@"id"];
  if (rawItem[@"address"] && ![rawItem[@"address"] isEqual:[NSNull null]]) {
    placeItem.address = rawItem[@"address"];
  } else {
    placeItem.address = @"";
  }
  return placeItem;
}

NSMutableDictionary<NSString*, PlaceCategory*>* mapToFlatCategories(NSArray<NSDictionary *>* rawCategories) {
  NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories = [[NSMutableDictionary alloc] init];
  [rawCategories enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull rawCategory, NSUInteger idx, BOOL * _Nonnull stop) {
    flatCategories[rawCategory[@"id"]] = mapRawCategoryToPlaceCategory(rawCategory);
  }];
  [rawCategories enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull rawCategory, NSUInteger idx, BOOL * _Nonnull stop) {
    NSString *rawCategoryId = rawCategory[@"id"];
    NSString *rawCategoryParentId = rawCategory[@"parent"];
    flatCategories[rawCategoryId].parentCategory = flatCategories[rawCategoryParentId];
  }];
  return flatCategories;
}

NSMutableDictionary<NSString*, PlaceItem*>* mapToFlatItems(NSArray<NSDictionary *>* rawItems, NSMutableDictionary<NSString*, PlaceCategory*>flatCategories) {
  NSMutableDictionary<NSString*, PlaceItem*> *flatItems = [[NSMutableDictionary alloc] init];
  [rawItems enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull rawItem, NSUInteger idx, BOOL * _Nonnull stop) {
    flatItems[rawItem[@"id"]] = mapRawItemToPlaceItem(rawItem);
  }];
  [rawItems enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull rawItem, NSUInteger idx, BOOL * _Nonnull stop) {
    NSString *rawItemId = rawItem[@"id"];
    NSString *rawItemParentId = rawItem[@"categoryId"];
    flatItems[rawItemId].parentCategory = flatCategories[rawItemParentId];
  }];
  return flatItems;
}

NSMutableArray<PlaceCategory *>* mergeIntoCategoryTree(NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories, NSMutableDictionary<NSString*, PlaceItem*> *flatItems) {
  NSMutableArray<PlaceCategory *> *rootNodes = [[NSMutableArray alloc] init];
  [flatCategories enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, PlaceCategory * _Nonnull placeCategory, BOOL * _Nonnull stop) {
    if (placeCategory.parentCategory == nil) {
      [rootNodes addObject:placeCategory];
      return;
    }
    NSString *parentId = placeCategory.parentCategory.uuid;
    [flatCategories[parentId].categories addObject:placeCategory];
  }];
  [flatItems enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, PlaceItem * _Nonnull placeItem, BOOL * _Nonnull stop) {
    NSString *parentId = placeItem.parentCategory.uuid;
    [flatCategories[parentId].items addObject:placeItem];
  }];
  return rootNodes;
}

IndexModelData* rawIndexToIndexModelData(NSArray<NSDictionary *>* rawCategories,
                                         NSArray<NSDictionary *>* rawItems) {
  NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories = mapToFlatCategories(rawCategories);
  NSMutableDictionary<NSString*, PlaceItem*> *flatItems = mapToFlatItems(rawItems, flatCategories);
  NSMutableArray<PlaceCategory *> *categoryTree = mergeIntoCategoryTree(flatCategories, flatItems);
  IndexModelData *indexModelData = [[IndexModelData alloc] init];
  indexModelData.flatCategories = flatCategories;
  indexModelData.flatItems = flatItems;
  indexModelData.categoryTree = categoryTree;
  return indexModelData;
}

- (NSArray<PlaceCategory *>*)mapCategoriesFromJSON:(NSArray *)categories {
  NSMutableArray<PlaceCategory *> *mappedCategories = [[NSMutableArray alloc] init];
  [categories enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    PlaceCategory *category = [[PlaceCategory alloc] init];
    category.categories = [self mapCategoriesFromJSON:obj[@"children"]];
    category.items = [self mapItemsFromJSON:obj[@"objects"] category:category];
    if ([self categoryIsValid:category rawCategory:obj]) {
      category.title = obj[@"name"];
      category.cover = getFullImageURL(obj[@"cover"]);
      category.uuid = obj[@"id"];
      category.icon = obj[@"icon"];
      [mappedCategories addObject:category];
    }
  }];
  return mappedCategories;
}

- (BOOL)categoryIsValid:(PlaceCategory *)category
            rawCategory:(NSDictionary *)rawCategory {
  return ([category.categories count] > 0 || [category.items count] > 0) &&
  rawCategory[@"icon"] != nil && ![rawCategory[@"icon"] isEqual:[NSNull null]];
}

- (NSArray<PlaceItem *>*)mapItemsFromJSON:(NSArray *)items
                                 category:(PlaceCategory *)category{
    NSMutableArray<PlaceItem *> *mappedItems = [[NSMutableArray alloc] init];
    __weak typeof(self) weakSelf = self;
    [items enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        PlaceItem *placeItem = [[PlaceItem alloc] init];
        placeItem.title = obj[@"name"];
        placeItem.cover = getFullImageURL(obj[@"cover"]);
        placeItem.category = category;
        placeItem.details = [weakSelf mapDetailsFromJSON:obj];
        placeItem.coords = [weakSelf mapPointCoordsFromJSON:obj];
        placeItem.uuid = obj[@"id"];
        if (obj[@"address"] && ![obj[@"address"] isEqual:[NSNull null]]) {
          placeItem.address = obj[@"address"];
        } else {
          placeItem.address = @"";
        }
        [mappedItems addObject:placeItem];
    }];
    return mappedItems;
}

- (CLLocationCoordinate2D)mapPointCoordsFromJSON:(NSDictionary *)item {
    if (item[@"location"] == [NSNull null] || item[@"location"][@"lat"] == [NSNull null] || item[@"location"][@"lon"] == [NSNull null] ) {
      return kCLLocationCoordinate2DInvalid;
    }
    return CLLocationCoordinate2DMake([item[@"location"][@"lat"] doubleValue], [item[@"location"][@"lon"] doubleValue]);
}

- (PlaceDetails *)mapDetailsFromJSON:(NSDictionary *)item {
  PlaceDetails *details = [[PlaceDetails alloc] init];
  NSMutableArray *imageURLs = [[NSMutableArray alloc] init];
  if (item[@"images"]) {
    [item[@"images"] enumerateObjectsUsingBlock:^(id  _Nonnull imageURL,
                                                  NSUInteger idx,
                                                  BOOL * _Nonnull stop) {
      [imageURLs addObject:getFullImageURL(imageURL)];
    }];
  }
  details.uuid = item[@"id"];
  details.images = [imageURLs copy];
  if (item[@"address"] && ![item[@"address"] isEqual:[NSNull null]]) {
    details.address = item[@"address"];
  } else {
    details.address = @"";
  }
  if (item[@"description"] && ![item[@"description"] isEqual:[NSNull null]]) {
    details.descriptionHTML = item[@"description"];
  } else {
    details.descriptionHTML = @"";
  }
  if (item[@"url"] && ![item[@"url"] isEqual:[NSNull null]]) {
    NSString *url = encodeURL(item[@"url"]);
    details.url = url;
  } else {
    details.url = @"";
  }
  NSMutableArray<NSMutableArray<CLLocation *> *> *mappedAreaCoords = [[NSMutableArray alloc] init];
  if (item[@"area"] && ![item[@"area"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSArray<NSArray<NSNumber *> *> *> *> *coords = item[@"area"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSArray<NSArray<NSNumber *> *> *> * _Nonnull polygonPart, NSUInteger partIdx, BOOL * _Nonnull stop) {
      [mappedAreaCoords addObject:[[NSMutableArray alloc] init]];
      [polygonPart[0] enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
        [mappedAreaCoords[partIdx] addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
      }];
    }];
    details.area = [NSArray arrayWithArray:[mappedAreaCoords copy]];
  }

  NSMutableArray<CLLocation *> *mappedPathCoords = [[NSMutableArray alloc] init];
  if (item[@"routes"] && ![item[@"routes"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSNumber *> *> *coords = item[@"routes"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
      [mappedPathCoords addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
    }];
    details.path = [NSArray arrayWithArray:[mappedPathCoords copy]];
  }

  details.categoryIdToItems = categoryIdToItemsFromJSON(item[@"include"]);
  details.categoryIdToItemsBelongsTo = categoryIdToItemsFromJSON(item[@"belongsTo"]);
  return details;
}

NSMutableArray* categoryIdToItemsFromJSON(NSObject *relations) {
  NSArray<NSDictionary*> *linkedCategoriesFromAPI = (NSArray<NSDictionary*>*) relations;
  NSMutableArray *categoryIdToItems = [[NSMutableArray alloc] init];
  
  [linkedCategoriesFromAPI enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    NSString *categoryId = (NSString *) obj[@"id"];
    NSArray<NSString *> *linkedItemIds = [obj[@"objects"] copy];
    CategoryUUIDToRelatedItemUUIDs *categoryUUIDToRelatedItemUUIDs = [[CategoryUUIDToRelatedItemUUIDs alloc] init];
    categoryUUIDToRelatedItemUUIDs.categoryUUID = categoryId;
    categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs = [[NSOrderedSet alloc] initWithArray:linkedItemIds];
    [categoryIdToItems addObject:categoryUUIDToRelatedItemUUIDs];
  }];
  return categoryIdToItems;
}
