//
//  GalleryView.m
//  GreenTravel
//
//  Created by Alex K on 11/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "GalleryView.h"
#import "SlideCollectionViewCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "StyleUtils.h"
#import "GalleryPageControl.h"
#import "GalleryImagePlaceholder.h"

typedef NS_ENUM(NSInteger, PageControlState) {
    PageControlStateLeftDots5,
    PageControlStateLeftDots6,
    PageControlStateDots7,
    PageControlStateRightDots6,
    PageControlStateRightDots5
};

@interface GalleryView ()

@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) UIView *contentView;
@property (strong, nonatomic) GalleryImagePlaceholder *placeHolderView;
@property (strong, nonatomic) NSArray<NSString *> *imageURLs;
@property (assign, nonatomic) CGFloat aspectRatio;
@property (assign, nonatomic) CGFloat indexOfScrolledItem;
@property (strong, nonatomic) NSLayoutConstraint *scrollViewWidthConstraint;
@property (copy, nonatomic) void(^onPageChange)(void);

@end

static NSString * const kSlideCellIdentifier = @"slideCellId";
static const CGFloat kPageControlHeight = 41.0;
static const CGFloat kPreviewImageAspectRatio = 310.0 / 375.0;

@implementation GalleryView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame
                    imageURLs:(NSArray<NSString *>*)imageURLs
                 onPageChange:(nonnull void (^)(void))onPageChange
{

    self = [super initWithFrame:frame];
    if (self) {
        [self setUp:imageURLs];
        self.onPageChange = onPageChange;
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.collectionView.backgroundColor = [Colors get].background;
  self.collectionView.alwaysBounceHorizontal = YES;
}

- (void)setUp:(NSArray<NSString *>*)imageURLs {
    self.translatesAutoresizingMaskIntoConstraints = NO;
    NSLayoutConstraint *aspectRatioConstraint = [self.heightAnchor
                                  constraintEqualToAnchor:self.widthAnchor
                                  multiplier:kPreviewImageAspectRatio
                                  constant:kPageControlHeight];
    [NSLayoutConstraint activateConstraints:@[
        aspectRatioConstraint,
    ]];

    UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];
    [flowLayout setScrollDirection:UICollectionViewScrollDirectionHorizontal];
    self.collectionView = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:flowLayout];
    [self addSubview:self.collectionView];
    self.collectionView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.collectionView.topAnchor constraintEqualToAnchor:self.topAnchor],
        [self.collectionView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
        [self.collectionView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
        [self.collectionView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor constant:-kPageControlHeight],
    ]];

    [self.collectionView setPagingEnabled:YES];
    self.collectionView.showsHorizontalScrollIndicator = NO;
    [self.collectionView registerClass:SlideCollectionViewCell.class forCellWithReuseIdentifier:kSlideCellIdentifier];
    self.collectionView.dataSource = self;
    self.collectionView.delegate = self;
    [self.collectionView setHidden:[imageURLs count] == 0];
#pragma mark - Placeholder
    self.placeHolderView = [[GalleryImagePlaceholder alloc] init];
    [self addSubview:self.placeHolderView];
    self.placeHolderView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.placeHolderView.topAnchor constraintEqualToAnchor:self.topAnchor],
        [self.placeHolderView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
        [self.placeHolderView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
        [self.placeHolderView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor constant:-kPageControlHeight],
    ]];
    [self.placeHolderView setHidden:[imageURLs count] > 0];

#pragma mark - Page control
    self.pageControl = [[GalleryPageControl alloc] initWithNumberOfPages:[imageURLs count]];
    [self addSubview:self.pageControl];
    self.pageControl.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.pageControl.topAnchor constraintEqualToAnchor:self.collectionView.bottomAnchor constant:20.0],
        [self.pageControl.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
        [self.pageControl.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
    ]];
    [self.pageControl setHidden:[imageURLs count] <= 1];
    [self setUpWithPictureURLs:imageURLs];
}

- (void)setUpWithPictureURLs:(NSArray<NSString *>*)pictureURLs {
  self.imageURLs = [[NSArray alloc] initWithArray:pictureURLs];
  [self.collectionView reloadData];
  NSUInteger numberOfPages = [self.imageURLs count];
  [self.pageControl setHidden:numberOfPages <= 1];
  [self.pageControl setNumberOfPages:numberOfPages];
  [self.placeHolderView setHidden:numberOfPages > 0];
  [self.collectionView setHidden:numberOfPages == 0];
}

- (nonnull __kindof UICollectionViewCell *)collectionView:(nonnull UICollectionView *)collectionView
                                   cellForItemAtIndexPath:(nonnull NSIndexPath *)indexPath {
    SlideCollectionViewCell *cell = [self.collectionView
                                     dequeueReusableCellWithReuseIdentifier:kSlideCellIdentifier
                                     forIndexPath:indexPath];
    [cell setUpWithImageURL:self.imageURLs[indexPath.row]];
    return cell;
}

#pragma mark - Collection view

- (NSInteger)collectionView:(nonnull UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return [self.imageURLs count];
}

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
    CGFloat width = self.safeAreaLayoutGuide.layoutFrame.size.width;
    return CGSizeMake(self.safeAreaLayoutGuide.layoutFrame.size.width, kPreviewImageAspectRatio * width);
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section {
    return 0.0;
}

- (void)toggleSkipAnimation {
    [self.pageControl toggleSkipAnimation]; 
}

#pragma mark - Scroll view delegate

- (CGFloat)getIndexOfScrolledItem {
    CGFloat indexOfScrolledItem = ABS(round(self.collectionView.contentOffset.x / self.frame.size.width));
    return indexOfScrolledItem;
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    CGFloat indexOfScrolledItem = [self getIndexOfScrolledItem];
    BOOL shouldLogPageFlip = NO;
    while (indexOfScrolledItem > self.indexOfScrolledItem) {
        self.indexOfScrolledItem++;
        [self.pageControl moveToNextPage];
        shouldLogPageFlip = YES;
    }
    while (indexOfScrolledItem < self.indexOfScrolledItem) {
        self.indexOfScrolledItem--;
        [self.pageControl moveToPrevPage];
        shouldLogPageFlip = YES;
    }
    if (shouldLogPageFlip) {
      self.onPageChange();
    }
}

- (UIImageView *)getCurrentImageView {
  NSUInteger index = (NSUInteger) [self getIndexOfScrolledItem];
  NSIndexPath *indexPath = [NSIndexPath indexPathForRow:index inSection:0];
  SlideCollectionViewCell *cell = (SlideCollectionViewCell *)
  [self.collectionView cellForItemAtIndexPath:indexPath];
  return cell.imageView;
}

#pragma mark - ZoomableImageCollectionViewCellDelegate
- (void)setZooming:(BOOL)zooming {
  [self.collectionView setScrollEnabled:!zooming];
}

@end
 
