//
//  CategoryUtils.h
//  GreenTravel
//
//  Created by Alex K on 9/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
@class Category;
@class PlaceItem;
@class StoredCategory;
@class StoredPlaceItem;

void traverseCategories(NSArray<Category *> *categories, void(^onCategoryAndItem)(Category*, PlaceItem*));
void traverseStoredCategories(NSArray<StoredCategory *> *categories, void(^onCategoryAndItem)(StoredCategory*, StoredPlaceItem*));
BOOL isCategoriesEqual(NSArray<Category *> *categoriesA, NSArray<Category *> *categoriesB);
NSMutableDictionary<NSString *, Category *>* flattenCategoriesTreeIntoCategoriesMap(NSArray<Category *> *categories);
NSMutableDictionary<NSString *, PlaceItem *>* flattenCategoriesTreeIntoItemsMap(NSArray<Category *> *categories);
