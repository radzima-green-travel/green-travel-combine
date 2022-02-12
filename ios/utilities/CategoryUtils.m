//
//  CategoryUtils.m
//  GreenTravel
//
//  Created by Alex K on 9/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "CategoryUtils.h"
#import "LocaleUtils.h"
#import "IndexModelData.h"
#import "PlaceCategory.h"
#import "PlaceItem.h"
#import "PlaceDetails.h"
#import "ImageUtils.h"
#import "StoredPlaceItem+CoreDataProperties.h"
#import "StoredCategory+CoreDataProperties.h"
#import "URLUtils.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"
#import "InformationReference.h"

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
 
#pragma mark - Mapping category
PlaceCategory* mapRawCategoryToPlaceCategory(NSDictionary *rawCategory) {
  PlaceCategory *category = [[PlaceCategory alloc] init];
  category.title = rawCategory[@"name"];
  category.cover = getFullImageURL(rawCategory[@"cover"]);
  category.uuid = rawCategory[@"id"];
  category.icon = rawCategory[@"icon"];
  category.index = [(NSNumber *) rawCategory[@"index"] intValue];
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

#pragma mark - Mapping details
NSDictionary* findLocalizedEntry(NSArray<NSDictionary *> *translations, NSString *languageCode) {
  NSUInteger indexOfLocaleEntry =
  [translations indexOfObjectPassingTest:^BOOL(NSDictionary  * _Nonnull entry,
                                               NSUInteger idx, BOOL * _Nonnull stop) {
    return [languageCode isEqualToString:entry[@"locale"]];
  }];
  if (indexOfLocaleEntry == NSNotFound) {
    return nil;
  }
  return translations[indexOfLocaleEntry];
}

void fillReferencesIntoDetails(PlaceDetails *details, NSDictionary *rawItem) {
  NSMutableArray *references = [[NSMutableArray alloc] init];
  if (rawItem[@"url"] && ![rawItem[@"url"] isEqual:[NSNull null]]) {
    InformationReference *officialSite = [[InformationReference alloc] init];
    officialSite.url = encodeURL(rawItem[@"url"]);
    officialSite.title = NSLocalizedString(@"DetailsScreenOfficialSite", @"");
    [references addObject:officialSite];
  }
  if (rawItem[@"origins"] && ![rawItem[@"origins"] isEqual:[NSNull null]]) {
    
    NSArray<NSDictionary *> *rawReferences = (NSArray<NSDictionary *>*) rawItem[@"origins"];
    [rawReferences enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull rawReference,
                                                NSUInteger idx, BOOL * _Nonnull stop) {
      InformationReference *reference = [[InformationReference alloc] init];
      reference.url = rawReference[@"value"];
      reference.title = rawReference[@"name"];
      [references addObject:reference];
    }];
  }
  details.references = [references copy];
}

PlaceDetails* mapRawDetailsToPlaceDetails(NSDictionary *rawItem,
                                          NSMutableDictionary<NSString*, PlaceItem*> *flatItems,
                                          NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories) {
  PlaceDetails *details = [[PlaceDetails alloc] init];
  NSMutableArray *imageURLs = [[NSMutableArray alloc] init];
  NSArray *i18n = rawItem[@"i18n"];
  NSDictionary *localizedEntry = findLocalizedEntry(i18n, getCurrentLocaleLanguageCode());
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
  if (localizedEntry[@"address"] && ![localizedEntry[@"address"] isEqual:[NSNull null]]) {
    details.address = localizedEntry[@"address"];
  } else {
    details.address = @"";
  }
  if (localizedEntry[@"description"] && ![localizedEntry[@"description"] isEqual:[NSNull null]]) {
    details.descriptionHTML = localizedEntry[@"description"];
  } else {
    details.descriptionHTML = @"";
  }
  details.url = @"";
  fillReferencesIntoDetails(details, rawItem);
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

#pragma mark - Mapping item
PlaceItem* mapRawItemToPlaceItem(NSDictionary *rawItem) {
  PlaceItem *placeItem = [[PlaceItem alloc] init];
  NSArray *i18n = rawItem[@"i18n"];
  NSDictionary *localizedEntry = findLocalizedEntry(i18n, getCurrentLocaleLanguageCode());
  placeItem.title = localizedEntry[@"name"];
  placeItem.cover = getFullImageURL(rawItem[@"cover"]);
  placeItem.details = [[PlaceDetails alloc] init];
  placeItem.coords = mapRawCoordsToCLLocationCoordinate2D(rawItem);
  placeItem.uuid = rawItem[@"id"];
  if (localizedEntry[@"address"] && ![localizedEntry[@"address"] isEqual:[NSNull null]]) {
    placeItem.address = localizedEntry[@"address"];
  } else {
    placeItem.address = @"";
  }
  return placeItem;
}


BOOL rawCategoryIsValid(NSDictionary *rawCategory) {
  return rawCategory[@"icon"] != nil &&
  ![rawCategory[@"icon"] isEqual:[NSNull null]] &&
  rawCategory[@"index"] != nil &&
  ![rawCategory[@"index"] isEqual:[NSNull null]];
}

NSMutableDictionary<NSString*, PlaceCategory*>* mapToFlatCategories(NSMutableDictionary<NSString *, NSDictionary *>* rawCategories) {
  NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories = [[NSMutableDictionary alloc] init];
  [rawCategories enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawCategoryId, NSDictionary * _Nonnull rawCategory, BOOL * _Nonnull stop) {
    if (rawCategoryIsValid(rawCategory)) {
      flatCategories[rawCategoryId] = mapRawCategoryToPlaceCategory(rawCategory);
    }
  }];
  [rawCategories enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawCategoryId, NSDictionary * _Nonnull rawCategory, BOOL * _Nonnull stop) {
    NSString *rawCategoryParentId = rawCategory[@"parent"];
    flatCategories[rawCategoryId].parentCategory = flatCategories[rawCategoryParentId];
  }];
  return flatCategories;
}

BOOL rawItemIsValid(NSDictionary *rawItem) {
  if (rawItem[@"i18n"] == nil ||
      [rawItem[@"i18n"] isEqual:[NSNull null]]) {
    return NO;
  };
  NSArray *translations = (NSArray * ) rawItem[@"i18n"];
  NSDictionary *translationEntry = findLocalizedEntry(translations, getCurrentLocaleLanguageCode());
  if (translationEntry == nil) {
    return NO;
  }
  if (translationEntry[@"name"] == nil || translationEntry[@"description"] == nil) {
    return NO;
  }
  return YES;
}

NSMutableDictionary<NSString*, PlaceItem*>* mapToFlatItems(NSMutableDictionary<NSString *, NSDictionary *>* rawItems, NSMutableDictionary<NSString*, PlaceCategory*> *flatCategories) {
  NSMutableDictionary<NSString*, PlaceItem*> *flatItems = [[NSMutableDictionary alloc] init];
  [rawItems enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull rawItemId, NSDictionary * _Nonnull rawItem, BOOL * _Nonnull stop) {
    if (rawItemIsValid(rawItem)) {
      flatItems[rawItemId] = mapRawItemToPlaceItem(rawItem);
    }
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
  [flatItems enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull itemId, PlaceItem * _Nonnull item, BOOL * _Nonnull stop) {
    NSDictionary *rawItem = rawItems[itemId];
    item.details = mapRawDetailsToPlaceDetails(rawItem, flatItems,
                                               flatCategories);
  }];
}

BOOL categoryIsValid(PlaceCategory *category) {
  return [category.items count] > 0 || [category.categories count] > 0;
}

BOOL itemIsValid(PlaceItem *item) {
  return [item.details.descriptionHTML length] > 0 &&
  [item.details.images count] > 0;
}

#pragma mark - Merging into tree
void filterInvalidItems(NSMutableArray<PlaceItem *> *rootNodes) {
  [rootNodes filterUsingPredicate:
   [NSPredicate predicateWithBlock:^BOOL(PlaceItem * _Nullable item,
                                         NSDictionary<NSString *,id> * _Nullable bindings) {
    return itemIsValid(item);
  }]];
  
}

void filterInvalidCategories(NSMutableArray<PlaceCategory *> *rootNodes) {
  [rootNodes filterUsingPredicate:
   [NSPredicate predicateWithBlock:^BOOL(PlaceCategory * _Nullable category,
                                         NSDictionary<NSString *,id> * _Nullable bindings) {
    filterInvalidCategories(category.categories);
    filterInvalidItems(category.items);
    return categoryIsValid(category);
  }]];
}

void sortTree(NSMutableArray<PlaceCategory *> *rootNodes) {
  [rootNodes enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull placeCategory, NSUInteger idx, BOOL * _Nonnull stop) {
    sortTree(placeCategory.categories);
    [placeCategory.items sortUsingComparator:^NSComparisonResult(PlaceItem * _Nonnull i1,
                                                                 PlaceItem * _Nonnull i2) {
      return [i1.title localizedCaseInsensitiveCompare:i2.title];
    }];
  }];
  [rootNodes sortUsingComparator:^NSComparisonResult(PlaceCategory *  _Nonnull c1,
                                                     PlaceCategory *  _Nonnull c2) {
    return c1.index - c2.index;
  }];
}

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
  filterInvalidCategories(categoryTree);
  sortTree(categoryTree);
  
  IndexModelData *indexModelData = [[IndexModelData alloc] init];
  indexModelData.flatCategories = flatCategories;
  indexModelData.flatItems = flatItems;
  indexModelData.categoryTree = categoryTree;
  return indexModelData;
}
