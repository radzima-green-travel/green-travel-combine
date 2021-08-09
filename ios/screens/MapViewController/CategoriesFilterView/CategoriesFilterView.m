//
//  CategoriesFilterView.m
//  GreenTravel
//
//  Created by Alex K on 2/25/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "CategoriesFilterView.h"
#import "CategoriesFilterCollectionViewCell.h"
#import "FilterOption.h"
#import "CategoriesFilterModel.h"
#import "TextUtils.h"
#import "ColorsLegacy.h"
#import "IconNameToImageNameMap.h"
#import "CategoriesFilterSpacerCollectionViewCell.h"
#import "CategoriesFilterViewConstants.h"

static NSString* const kCategoriesFilterCellId = @"categoriesFilterCellId";
static NSString* const kCategoriesFilterSpacerCellId = @"categoriesFilterSpacerCellId";

@interface CategoriesFilterView()

@property (strong, nonatomic) CategoriesFilterModel *model;
@property (nonatomic, copy) void(^onFilterUpdate)(NSSet<NSString *>*);

@end

static const CGFloat kSpacingWidth = 16.0;

@implementation CategoriesFilterView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithMapModel:(MapModel *)mapModel
                      indexModel:(IndexModel *)indexModel
               onFilterUpdate:(void(^)(NSSet<NSString *>*))onFilterUpdate
{
    UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];
    [flowLayout setScrollDirection:UICollectionViewScrollDirectionHorizontal];
    self = [super initWithFrame:CGRectZero collectionViewLayout:flowLayout];
    if (self) {
        [self registerClass:CategoriesFilterCollectionViewCell.class forCellWithReuseIdentifier:kCategoriesFilterCellId];
        [self registerClass:CategoriesFilterSpacerCollectionViewCell.class forCellWithReuseIdentifier:kCategoriesFilterSpacerCellId];

        self.dataSource = self;
        self.delegate = self;
        self.model = [[CategoriesFilterModel alloc] initWithMapModel:mapModel
                                                          indexModel:indexModel];
        self.onFilterUpdate = onFilterUpdate;
        [self.model addObserver:self];
        [self setBackgroundColor:UIColor.clearColor];
        self.showsHorizontalScrollIndicator = NO;
        self.alwaysBounceHorizontal = YES;
    }
    return self;
}

- (void)activateFilterForPlaceItem:(PlaceItem *)item {
    [self.model selectOptionForPlaceItem:item];
}

- (BOOL)optionSelectedForPlaceItem:(PlaceItem *)item {
  return [self.model optionSelectedForPlaceItem:item];
}

- (BOOL)empty {
    return [self.model.filterOptions count] == 0;
}

- (void)selectOptionAll:(BOOL)on {
  [self.model selectOptionAll:on];
}

#pragma mark - Collection view
- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    return 1;
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return 2 * [self.model.filterOptions count] + 1;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"cellForItemAtIndexPath method, index path: %@", indexPath);
    if (indexPath.item % 2 == 0) {
        CategoriesFilterSpacerCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:kCategoriesFilterSpacerCellId forIndexPath:indexPath];
        return cell;
    }
    FilterOption *option = self.model.filterOptions[indexPathToDataCellIndex(indexPath)];
    CategoriesFilterCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:kCategoriesFilterCellId forIndexPath:indexPath];
    [cell update:option];
    return cell;
}

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
    CGFloat height = 44.0;
    if (indexPath.item % 2 == 0) {
        return CGSizeMake(kSpacingWidth, height);
    }
    CGFloat width = 0;
    FilterOption *option = self.model.filterOptions[indexPathToDataCellIndex(indexPath)];

    width += CategoriesFilterViewLabelToCellSpacing * 2;
    CGSize textSize = [option.title sizeWithAttributes:
     getTextAttributes(option.on ? [ColorsLegacy get].white :
                       [ColorsLegacy get].logCabin, 13.0, UIFontWeightRegular)];
    width += textSize.width;

    if (!option.selectAll && [[IconNameToImageNameMap get]
                        hasFilterIconForName:option.iconName]) {
        width += CategoriesFilterViewIconWidth + CategoriesFilterViewIconToLabelSpacing;
    }
    CGSize size = CGSizeMake(width, height);
    return size;
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.item % 2 == 0) {
        return;
    }
    FilterOption *option = self.model.filterOptions[indexPathToDataCellIndex(indexPath)];
    [self.model selectOption:option];
}

- (void)onFilterOptionsSelect:(NSUInteger)selectedIndex {
    if (selectedIndex == 0) {
        [self setContentOffset:CGPointMake(0, 0) animated:YES];
        return;
    }
    NSUInteger dataCellIndex = filterOptionIndexToDataCellIndex(selectedIndex);
    CategoriesFilterCollectionViewCell *cell = (CategoriesFilterCollectionViewCell *)[self cellForItemAtIndexPath:[NSIndexPath indexPathForItem:dataCellIndex inSection:0]];
    [self scrollRectToVisible:cell.frame animated:YES];
}

- (void)onFilterOptionsUpdate:(nonnull NSArray<FilterOption *> *)filterOptions {
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
      [weakSelf reloadData];
    });
    self.onFilterUpdate(self.model.selectedCategoryUUIDs);
}

#pragma mark - UICollectionViewDelegateFlowLayout
- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section {
    return 0.0;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section {
    return 0;
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section {
    return UIEdgeInsetsMake(16.0, 0, 13.5, 0);
}

NSUInteger indexPathToDataCellIndex(NSIndexPath *indexPath) {
    return (NSUInteger) floor(indexPath.item / 2);
}

NSUInteger filterOptionIndexToDataCellIndex(NSUInteger filterOptionIndex) {
    return filterOptionIndex * 2 + 1;
}

@end
