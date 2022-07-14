//
//  LinkedCategoriesView.m
//  GreenTravel
//
//  Created by Alex K on 11/6/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "LinkedCategoriesView.h"
#import "LabelledButtonGroup.h"
#import "IndexModel.h"

#import "DetailsModel.h"
#import "MapModel.h"
#import "LocationModel.h"
#import "CategoryUtils.h"
#import "PlaceItem.h"
#import "PlaceCategory.h"
#import "PlacesViewController.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"
#import "CategoryLinkCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TypographyLegacy.h"

@interface LinkedCategoriesView()

@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSMutableArray<PlaceCategory *> *categories;
@property (strong, nonatomic) NSArray<CategoryUUIDToRelatedItemUUIDs *> *categoryIdToItems;
@property (copy, nonatomic) void(^onCategoryLinkSelect)(PlaceCategory *, NSOrderedSet<NSString *> *);
@property (copy, nonatomic) void(^onPress)(NSObject * dataItem);
@property (strong, nonatomic) LabelledButtonGroup *buttonGroupView;

@end

static NSString * const kCategoryLinkCellId = @"categoryLinkCellId";

@implementation LinkedCategoriesView

- (instancetype)initWithIndexModel:(IndexModel *)indexModel
                          title:(nonnull NSString *)title
              onCategoryLinkSelect:(void(^)(PlaceCategory *, NSOrderedSet<NSString *> *))onCategoryLinkSelect
{
    self = [super initWithFrame:CGRectZero];
    if (self) {
        self.categories = [[NSMutableArray alloc] init];
        self.indexModel = indexModel;
        self.onCategoryLinkSelect = onCategoryLinkSelect;
        [self setUp:title];
    }
    return self;
}

- (void)setUp:(NSString *)title {
  __weak typeof(self) weakSelf = self;
  self.buttonGroupView = [[LabelledButtonGroup alloc] initWithConfigItems:@[] label:title cellClass:CategoryLinkCell.class onPress:^(NSObject * _Nonnull dataItem) {
    [weakSelf onPress:dataItem];
  }];
  [self addSubview:self.buttonGroupView];
  self.buttonGroupView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.topAnchor constraintEqualToAnchor:self.buttonGroupView.topAnchor],
    [self.leadingAnchor constraintEqualToAnchor:self.buttonGroupView.leadingAnchor],
    [self.trailingAnchor constraintEqualToAnchor:self.buttonGroupView.trailingAnchor],
    [self.bottomAnchor constraintEqualToAnchor:self.buttonGroupView.bottomAnchor],
  ]];
}

- (void)update:(NSArray<CategoryUUIDToRelatedItemUUIDs *>*)categoryIdToItems {
  self.categoryIdToItems = categoryIdToItems;
  [self.categories removeAllObjects];

  NSMutableDictionary<NSString *, PlaceCategory *> *categoryUUIDToCategoryMap =  flattenCategoriesTreeIntoCategoriesMap(self.indexModel.categories);
  [categoryIdToItems enumerateObjectsUsingBlock:^(CategoryUUIDToRelatedItemUUIDs * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    PlaceCategory *category = categoryUUIDToCategoryMap[obj.categoryUUID];
    [self.categories addObject:category];
  }];

  [self.buttonGroupView update:self.categories];
  [self setNeedsLayout];
  [self layoutIfNeeded];
}

- (void)onPress:(NSObject * _Nonnull)dataItem {
  PlaceCategory *category = (PlaceCategory *)dataItem;
  NSUInteger relationIndex = [self.categoryIdToItems indexOfObjectPassingTest:^BOOL(CategoryUUIDToRelatedItemUUIDs * _Nonnull relation, NSUInteger idx, BOOL * _Nonnull stop) {
    return [relation.categoryUUID isEqualToString:category.uuid];
  }];
  NSOrderedSet<NSString *> *linkedItems =
  [self.categoryIdToItems[relationIndex].relatedItemUUIDs copy];
  self.onCategoryLinkSelect(category, linkedItems);
}

@end
