//
//  CategoriesFilterModel.m
//  GreenTravel
//
//  Created by Alex K on 2/26/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "CategoriesFilterModel.h"
#import "FilterOption.h"
#import "Category.h"
#import "IndexModel.h"
#import "MapModel.h"
#import "CategoriesFilterObserver.h"
#import "CategoryUtils.h"
#import "PlaceItem.h"
#import "MapItem.h"

@interface CategoriesFilterModel()

@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSMutableSet<NSString *> *categoryUUIDs;

@end

@implementation CategoriesFilterModel

- (instancetype)initWithMapModel:(MapModel *)mapModel
                      indexModel:(IndexModel *)indexModel
{
    self = [super init];
    if (self) {
        _mapModel = mapModel;
        _indexModel = indexModel;
        [_indexModel addObserver:self];
        self.selectedCategoryUUIDs = [[NSMutableSet alloc] init];
        self.categoryUUIDs = [[NSMutableSet alloc] init];
        self.filterOptions = [[NSMutableArray alloc] init];
        self.categoriesFilterObservers = [[NSMutableArray alloc] init];
        [self fillFilterOptionsFromCategories];
    }
    return self;
}

- (void)onCategoriesLoading:(BOOL)loading {
}

- (void)onCategoriesNewDataAvailable {
}

- (void)onCategoriesUpdate:(nonnull NSArray<Category *> *)categories {
    [self fillFilterOptionsFromCategories];
    [self notifyObservers];
}

- (void)fillFilterOptionsFromCategories {
    [self.filterOptions removeAllObjects];
    [self.categoryUUIDs removeAllObjects];
    
    FilterOption *filterOptionAll = [[FilterOption alloc] init];
    filterOptionAll.categoryId = nil;
    filterOptionAll.on = YES;
    filterOptionAll.selectAll = YES;
    filterOptionAll.title = @"Все";
    
    [self.filterOptions addObject:filterOptionAll];
    traverseCategories(self.mapModel.categories, ^(Category *category, PlaceItem *item) {
        if (category == nil || [self.categoryUUIDs containsObject:category.uuid]) {
            return;
        }
        [self.categoryUUIDs addObject:category.uuid];
        FilterOption *filterOption = [[FilterOption alloc] init];
        filterOption.categoryId = category.uuid;
        filterOption.title = category.title;
        filterOption.on = NO;
        filterOption.selectAll = NO;
        filterOption.iconName = category.icon;
        [self.filterOptions addObject:filterOption];
    });
}

- (void)addObserver:(nonnull id<CategoriesFilterObserver>)observer {
    if ([self.categoriesFilterObservers containsObject:observer]) {
        return;
    }
    [self.categoriesFilterObservers addObject:observer];
}

- (void)notifyObservers {
    [self.categoriesFilterObservers enumerateObjectsUsingBlock:^(id<CategoriesFilterObserver> _Nonnull observer, NSUInteger idx, BOOL * _Nonnull stop) {
        [observer onFilterOptionsUpdate:self.filterOptions];
    }];
}

- (void)removeObserver:(nonnull id<CategoriesFilterObserver>)observer {
    [self.categoriesFilterObservers removeObject:observer];
}

- (void)selectOptionAll:(BOOL)on {
    [self.filterOptions enumerateObjectsUsingBlock:^(FilterOption * _Nonnull option, NSUInteger idx, BOOL * _Nonnull stop) {
        if (idx == 0) {
            option.on = on;
            return;
        }
        option.on = NO;
        if (on) {
            [self.selectedCategoryUUIDs addObject:option.categoryId];
            return;
        }
        [self.selectedCategoryUUIDs removeObject:option.categoryId];
    }];
    [self notifyObservers];
}

- (void)selectOption:(FilterOption *)selectedOption {
    if (selectedOption.selectAll) {
        [self notifyObserversFilterSelect:0];
        [self selectOptionAll:!selectedOption.on];
        return;
    }
    [self.filterOptions enumerateObjectsUsingBlock:^(FilterOption * _Nonnull option, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([option.categoryId isEqualToString:selectedOption.categoryId]) {
            option.on = !option.on;
            if (option.on) {
                [self.selectedCategoryUUIDs addObject:option.categoryId];
                return;
            }
            [self.selectedCategoryUUIDs removeObject:option.categoryId];
        }
    }];
    NSPredicate *ordinaryOptionsPredicate =
    [NSPredicate predicateWithFormat:@"on = YES AND selectAll == NO"];
    NSUInteger selectedCount = [[self.filterOptions filteredArrayUsingPredicate:ordinaryOptionsPredicate] count];
    // If all options are selected.
    if (selectedCount == [self.filterOptions count] - 1) {
        [self notifyObserversFilterSelect:0];
        [self selectOptionAll:YES];
        return;
    }
    if (selectedCount != [self.filterOptions count] - 1 && [self.filterOptions firstObject].on) {
        [self.filterOptions firstObject].on = NO;
        [self.selectedCategoryUUIDs removeAllObjects];
        [self.selectedCategoryUUIDs addObject:selectedOption.categoryId];
    }
    NSUInteger selectedIndex = [self.filterOptions indexOfObjectPassingTest:^BOOL(FilterOption * _Nonnull option, NSUInteger idx, BOOL * _Nonnull stop) {
        return [selectedOption.categoryId isEqualToString:option.categoryId];
    }];
    [self notifyObserversFilterSelect:selectedIndex];
    [self notifyObservers];
}

- (void)selectOptionForPlaceItem:(PlaceItem *)item {
    NSString *categoryUUID = self.mapModel.flatMapItems[item.uuid]
        .correspondingPlaceItem.category.uuid; 
    NSUInteger optionIndex = [self.filterOptions indexOfObjectPassingTest:^BOOL(FilterOption * _Nonnull filterOption, NSUInteger idx, BOOL * _Nonnull stop) {
        return [filterOption.categoryId isEqualToString:categoryUUID];
    }];
    FilterOption *optionForItem = self.filterOptions[optionIndex];
    if (!optionForItem.on) {
        [self selectOption:optionForItem];
    }
    
}
    
    
- (void)notifyObserversFilterSelect:(NSUInteger)selectedIndex {
    [self.categoriesFilterObservers enumerateObjectsUsingBlock:^(id<CategoriesFilterObserver> _Nonnull observer, NSUInteger idx, BOOL * _Nonnull stop) {
        [observer onFilterOptionsSelect:selectedIndex];
    }];
}

@end
