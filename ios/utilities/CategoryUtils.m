//
//  CategoryUtils.m
//  GreenTravel
//
//  Created by Alex K on 9/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "CategoryUtils.h"
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
