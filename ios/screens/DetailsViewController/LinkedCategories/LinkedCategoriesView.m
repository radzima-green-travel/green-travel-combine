//
//  LinkedCategoriesView.m
//  GreenTravel
//
//  Created by Alex K on 11/6/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "LinkedCategoriesView.h"
#import "IndexModel.h"
#import "ApiService.h"
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

@property (strong, nonatomic) NSArray<NSArray *> *linkIds;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) UILabel *interestingLabel;
@property (strong, nonatomic) UITableView *tableView;
@property (strong, nonatomic) NSMutableArray<PlaceCategory *> *categories;
@property (strong, nonatomic) NSArray<CategoryUUIDToRelatedItemUUIDs *> *categoryIdToItems;
@property (copy, nonatomic) void(^pushToNavigationController)(PlacesViewController *);
@property (strong, nonatomic) NSLayoutConstraint *tableViewHeightConstraint;
@property (copy, nonatomic) void(^onCategoryLinkSelect)(PlaceCategory *, NSOrderedSet<NSString *> *);

@end

static NSString * const kCategoryLinkCellId = @"categoryLinkCellId";

@implementation LinkedCategoriesView

- (instancetype)initWithIndexModel:(IndexModel *)indexModel
                     apiService:(nonnull ApiService *)apiService
                       mapModel:(nonnull MapModel *)mapModel
                  locationModel:(nonnull LocationModel *)locationModel
                          title:(nonnull NSString *)title
              onCategoryLinkSelect:(void(^)(PlaceCategory *, NSOrderedSet<NSString *> *))onCategoryLinkSelect
{
    self = [super init];
    if (self) {
        self.categories = [[NSMutableArray alloc] init];
        self.apiService = apiService;
        self.indexModel = indexModel;
        self.mapModel = mapModel;
        self.locationModel = locationModel;
        self.onCategoryLinkSelect = onCategoryLinkSelect;
        self.tableView = [[UITableView alloc] init];
        [self.tableView registerClass:CategoryLinkCell.class forCellReuseIdentifier:kCategoryLinkCellId];
        self.tableView.delegate = self;
        self.tableView.dataSource = self;
        self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
        self.tableView.scrollEnabled = NO;
        self.tableView.alwaysBounceVertical = NO;
        self.title = title;
        [self setUp];
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  [self.interestingLabel setTextColor:[Colors get].headlineText];
}

- (void)setUp {
    self.interestingLabel = [[UILabel alloc] init];

    self.interestingLabel.numberOfLines = 2;
    [self.interestingLabel setFont:[UIFont fontWithName:@"Montserrat-Bold" size:20.0]];
    self.interestingLabel.translatesAutoresizingMaskIntoConstraints = NO;
    self.interestingLabel.attributedText = [[TypographyLegacy get] makeTitle1Bold:self.title];

    [self addSubview:self.interestingLabel];

    [NSLayoutConstraint activateConstraints:@[
        [self.interestingLabel.topAnchor constraintEqualToAnchor:self.topAnchor constant:0],
        [self.interestingLabel.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:16.0],
        [self.interestingLabel.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-25.0],
    ]];
    
    self.tableView.translatesAutoresizingMaskIntoConstraints = NO;
    [self addSubview:self.tableView];

    [NSLayoutConstraint activateConstraints:@[
        [self.tableView.topAnchor constraintEqualToAnchor:self.interestingLabel.bottomAnchor constant:18],
        [self.tableView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:0.0],
        [self.tableView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:0.0],
        [self.tableView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor constant:0],
    ]];
}

- (void)update:(NSArray<CategoryUUIDToRelatedItemUUIDs *>*)categoryIdToItems {
    self.categoryIdToItems = categoryIdToItems;
    [self.categories removeAllObjects];
    
    NSMutableDictionary<NSString *, PlaceCategory *> *categoryUUIDToCategoryMap =  flattenCategoriesTreeIntoCategoriesMap(self.indexModel.categories);
    __weak typeof(self) weakSelf = self;
    [categoryIdToItems enumerateObjectsUsingBlock:^(CategoryUUIDToRelatedItemUUIDs * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        PlaceCategory *category = categoryUUIDToCategoryMap[obj.categoryUUID];
        [weakSelf.categories addObject:category];
    }];
    [self.tableView reloadData];
    
    if ([self.categories count] == 0) {
        [self setHidden:YES];
    }
    
    if (self.tableViewHeightConstraint) {
        [NSLayoutConstraint deactivateConstraints:@[self.tableViewHeightConstraint]];
    }
    self.tableViewHeightConstraint = [self.tableView.heightAnchor constraintEqualToConstant:[self.categories count] * 46.0];
    [NSLayoutConstraint activateConstraints:@[
        self.tableViewHeightConstraint
    ]];
    [self setNeedsLayout];
    [self layoutIfNeeded];
}

- (void)setHidden:(BOOL)hidden {
    [super setHidden:hidden];
    if (hidden) {
        [NSLayoutConstraint activateConstraints:@[
            [self.heightAnchor constraintEqualToConstant:0.0]
        ]];
    }
}

- (nonnull UITableViewCell *)tableView:(nonnull UITableView *)tableView cellForRowAtIndexPath:(nonnull NSIndexPath *)indexPath {
    PlaceCategory *category = self.categories[indexPath.row];
    CategoryLinkCell *cell = [self.tableView dequeueReusableCellWithIdentifier:kCategoryLinkCellId];
    [cell update:category];
    return cell;
}
 
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.categories count];
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    NSOrderedSet<NSString *> *linkedItems = [self.categoryIdToItems[indexPath.row].relatedItemUUIDs copy];
    PlaceCategory *category = self.categories[indexPath.row];
    self.onCategoryLinkSelect(category, linkedItems);
    [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
}

- (NSInteger)numberOfSections {
    return 1;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 46.0;
}

@end
