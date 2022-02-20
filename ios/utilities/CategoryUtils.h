//
//  CategoryUtils.h
//  GreenTravel
//
//  Created by Alex K on 9/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
@class PlaceCategory;
@class PlaceItem;
@class StoredCategory;
@class StoredPlaceItem;
@class IndexModelData;

void traverseCategories(NSArray<PlaceCategory *> *categories, void(^onCategoryAndItem)(PlaceCategory*, PlaceItem*));
void traverseCategoriesWithLevel(NSArray<PlaceCategory *> *categories, NSUInteger level, void(^onCategoryAndItem)(PlaceCategory*, PlaceItem*, NSUInteger level));
void traverseStoredCategories(NSArray<StoredCategory *> *categories, void(^onCategoryAndItem)(StoredCategory*, StoredPlaceItem*));
BOOL isCategoriesEqual(NSArray<PlaceCategory *> *categoriesA, NSArray<PlaceCategory *> *categoriesB);
NSMutableDictionary<NSString *, PlaceCategory *>* flattenCategoriesTreeIntoCategoriesMap(NSArray<PlaceCategory *> *categories);
NSMutableDictionary<NSString *, PlaceItem *>* flattenCategoriesTreeIntoItemsMap(NSArray<PlaceCategory *> *categories);
IndexModelData* rawIndexToIndexModelData(NSMutableDictionary<NSString *, NSDictionary *>* rawCategories,
                                         NSMutableDictionary<NSString *, NSDictionary *>* rawItems);
extern NSComparisonResult (^titleCompare)(NSString *, NSString *); 
