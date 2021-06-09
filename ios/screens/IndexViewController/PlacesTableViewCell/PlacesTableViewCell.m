//
//  PlacesTableViewCell.m
//  GreenTravel
//
//  Created by Alex K on 8/16/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "PlacesTableViewCell.h"
#import "PhotoCollectionViewCell.h"
#import "Colors.h"
#import "TextUtils.h"
#import "Category.h"
#import "PlaceItem.h"
#import "SizeUtils.h"
#import "Typography.h"
#import "IndexViewControllerConstants.h"

static NSString * const kPhotoCellId = @"photoCellId";
static NSInteger kMaximalNumberOfItemsInCell = 10;

@interface PlacesTableViewCell ()

@property (strong, nonatomic) UILabel *headerLabel;
@property (strong, nonatomic) UIButton *allButton;
@property (strong, nonatomic) NSArray<PlaceItem *> *dataSourceItems;
@property (strong, nonatomic) NSArray<Category *> *dataSourceCategories;
@property (strong, nonatomic) Category *item;

@end

@implementation PlacesTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (void)setUp {
    self.headerLabel = [[UILabel alloc] init];
    [self.contentView addSubview:self.headerLabel];
    [self.headerLabel setFont:[UIFont fontWithName:@"Montserrat-SemiBold" size:14.0]];
    
    self.headerLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.headerLabel.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:16.0],
        [self.headerLabel.topAnchor constraintEqualToAnchor:self.topAnchor constant:24.0]
    ]];
    
    UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];
    [flowLayout setScrollDirection:UICollectionViewScrollDirectionHorizontal];
    self.collectionView = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:flowLayout];
    [self.collectionView registerClass:PhotoCollectionViewCell.class forCellWithReuseIdentifier:kPhotoCellId];
    self.collectionView.delegate = self;
    self.collectionView.dataSource = self;
    self.collectionView.backgroundColor = [Colors get].white;
    self.collectionView.alwaysBounceHorizontal = YES;
    self.collectionView.showsHorizontalScrollIndicator = NO;
    
    [self.contentView addSubview:self.collectionView];
    self.collectionView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.collectionView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:0.0],
        [self.collectionView.topAnchor constraintEqualToAnchor:self.headerLabel.bottomAnchor constant:0.0],
        [self.collectionView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:0.0],
        [self.collectionView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor constant:0.0],
    ]];
    
    self.allButton = [[UIButton alloc] init];
    [self.contentView addSubview:self.allButton];
    [self.allButton.titleLabel setFont:[UIFont fontWithName:@"Montserrat-SemiBold" size:14.0]];
    [self.allButton setAttributedTitle:[[Typography get] makeSubtitle1Semibold:@"ВСЕ" color:[Colors get].green] forState:UIControlStateNormal];
    [self.allButton addTarget:self action:@selector(onAllButtonPress:) forControlEvents:UIControlEventTouchUpInside];
    
    self.allButton.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.allButton.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-16.0],
        [self.allButton.centerYAnchor constraintEqualToAnchor:self.headerLabel.centerYAnchor],
        [self.allButton.widthAnchor constraintEqualToConstant:44.0],
        [self.allButton.heightAnchor constraintEqualToConstant:44.0],
    ]];
    
#pragma mark - Subscribe to orientation change
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onDeviceOrientationChange:) name:UIDeviceOrientationDidChangeNotification object:nil];
}

#pragma mark - Orientation change
- (void)onDeviceOrientationChange:(id)sender {
    //[self.collectionView reloadData];
}

- (void)update:(Category *)item {
    self.headerLabel.attributedText = [[Typography get] makeSubtitle1Semibold:[item.title uppercaseString]];
    if ([item.categories count] > 0) {
        self.dataSourceCategories = [item.categories subarrayWithRange:NSMakeRange(0, MIN([item.categories count], kMaximalNumberOfItemsInCell))];
    } else {
        self.dataSourceItems = [item.items subarrayWithRange:NSMakeRange(0, MIN([item.items count], kMaximalNumberOfItemsInCell))];
    }
    [self.allButton setHidden:([self.dataSourceItems count] + [self.dataSourceCategories count] <= 1)];
    self.item = item;
    [self.collectionView reloadData];
}

- (void)traitCollectionDidChange:(UITraitCollection *)previousTraitCollection {
    [super traitCollectionDidChange:previousTraitCollection];
    [self.collectionView.collectionViewLayout invalidateLayout];
}

#pragma mark - Collection view

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    return 1;
}


- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    NSUInteger howManyCategories = [self.dataSourceCategories count];
    if (howManyCategories > 0) {
        return howManyCategories;
    }
    return [self.dataSourceItems count];
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"cellForItemAtIndexPath method, index path: %@", indexPath);
    
    PhotoCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:kPhotoCellId forIndexPath:indexPath];
    if ([self.dataSourceCategories count] > 0) {
        [cell updateCategory:self.dataSourceCategories[indexPath.row]];
        return cell;
    }
    [cell updateItem:self.dataSourceItems[indexPath.row]];
    return cell;
}

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
  CGSize screenSize = [UIScreen mainScreen].bounds.size;
  CGSize adaptedSize = CGSizeMake(screenSize.width - 50, screenSize.height);
  return getCoverSize(adaptedSize);
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"Did select item at index path: %@", indexPath);
    if ([self.dataSourceCategories count] > 0) {
        Category *category = self.dataSourceCategories[indexPath.row];
        category.onAllButtonPress();
        return;
    }
    
    PlaceItem *item = self.dataSourceItems[indexPath.row];
    item.onPlaceCellPress();
}

- (void)prepareForReuse {
    [super prepareForReuse];
    self.dataSourceCategories = @[];
    self.dataSourceItems = @[];
}

- (void)onAllButtonPress:(id)sender {
    self.item.onAllButtonPress();
}

#pragma mark - <UICollectionViewDelegate>

static const CGFloat kSpacing = 16.0;

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section {
    return 0;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section {
    return kSpacing;
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section {
    return UIEdgeInsetsMake(IndexViewControllerCoverInset,
                            IndexViewControllerCoverInset,
                            IndexViewControllerCoverInset,
                            IndexViewControllerCoverInset);
}

@end
