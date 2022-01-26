//
//  BookmarksViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "BookmarksViewController.h"
#import "Colors.h"
#import "StyleUtils.h"
#import "BookmarkCell.h"
#import "Category.h"
#import "PlacesViewController.h"
#import "BookmarksGroupModel.h"
#import "BookmarkItem.h"
#import "IndexModel.h"
#import "TypographyLegacy.h"
#import "AnalyticsEvents.h"
#import "AnalyticsUIScrollViewDelegate.h"

@interface BookmarksViewController ()

@property (strong, nonatomic) BookmarksGroupModel *model;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) DetailsModel *detailsModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) UICollectionView *collectionView;
@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) UIView *contentView;
@property (strong, nonatomic) UIImageView *placeholderImageView;
@property (strong, nonatomic) UILabel *somethingIsWrongLabel;
@property (strong, nonatomic) UIView *placeholder;

@end

static NSString * const kBookmarkCellId = @"bookmarkCellId";
static const CGFloat kCellAspectRatio = 166.0 / 104.0;
static const CGFloat kMinHeightOfPlaceholderView = 400.0;

@implementation BookmarksViewController

- (instancetype)initWithModel:(BookmarksGroupModel *)model
                   indexModel:(IndexModel *)indexModel
                   apiService:(ApiService *)apiService
              coreDataService:(CoreDataService *)coreDataService
                   mapService:(MapService *)mapService
                     mapModel:(MapModel *)mapModel
                  searchModel:(SearchModel *)searchModel
                  detailsModel:(DetailsModel *)detailsModel
                locationModel:(LocationModel *)locationModel
{
    self = [super init];
    if (self) {
        UICollectionViewFlowLayout *layout = [[UICollectionViewFlowLayout alloc] init];
        layout.scrollDirection = UICollectionViewScrollDirectionVertical;
        _collectionView = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:layout];
        _model = model;
        _indexModel = indexModel;
        _apiService = apiService;
        _coreDataService = coreDataService;
        _mapModel = mapModel;
        _searchModel = searchModel;
        _detailsModel = detailsModel;
        _locationModel = locationModel;
        _mapService = mapService;
    }
    return self;
}

- (void)viewWillLayoutSubviews {
  self.collectionView.backgroundColor = [Colors get].background;
  configureNavigationBar(self.navigationController.navigationBar);
}

- (UIStatusBarStyle)preferredStatusBarStyle {
    return UIStatusBarStyleLightContent;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    UINavigationBar *navigationBar = self.navigationController.navigationBar;
    configureNavigationBar(navigationBar);
#pragma mark - Collection view
    [self.collectionView registerClass:BookmarkCell.class forCellWithReuseIdentifier:kBookmarkCellId];
    self.collectionView.alwaysBounceVertical = YES;
    self.collectionView.delegate = self;
    self.collectionView.dataSource = self;
    [self.view addSubview:self.collectionView];
    self.collectionView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.collectionView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
        [self.collectionView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.collectionView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        [self.collectionView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
    ]];
#pragma mark - No data view
    self.scrollView = [[UIScrollView alloc] init];
    [self.view addSubview:self.scrollView];
    self.scrollView.translatesAutoresizingMaskIntoConstraints = NO;
    self.scrollView.alwaysBounceVertical = YES;
    [NSLayoutConstraint activateConstraints:@[
        [self.scrollView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
        [self.scrollView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.scrollView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        [self.scrollView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
    ]];
    self.contentView = [[UIView alloc] init];
    [self.scrollView addSubview:self.contentView];
    self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.scrollView addSubview:self.contentView];
    [NSLayoutConstraint activateConstraints:@[
        [self.contentView.topAnchor constraintEqualToAnchor:self.scrollView.topAnchor],
        [self.contentView.bottomAnchor constraintEqualToAnchor:self.scrollView.bottomAnchor],
        [self.contentView.widthAnchor constraintEqualToAnchor:self.scrollView.widthAnchor],
        [self.contentView.heightAnchor constraintGreaterThanOrEqualToAnchor:self.scrollView.heightAnchor],
        [self.contentView.heightAnchor constraintGreaterThanOrEqualToConstant:kMinHeightOfPlaceholderView],
    ]];
    self.placeholder = [[UIView alloc] init];
    [self.contentView addSubview:self.placeholder];
    self.placeholder.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.placeholder.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
        [self.placeholder.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
        [self.placeholder.widthAnchor constraintEqualToAnchor:self.contentView.widthAnchor],
    ]];

    UIImage *placeholderImage = [UIImage imageNamed:arc4random_uniform(2) > 0 ?
                                 @"fox-in-the-jungle" : @"trekking"];
    self.placeholderImageView = [[UIImageView alloc] initWithImage:placeholderImage];
    [self.placeholder addSubview:self.placeholderImageView];
    self.placeholderImageView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.placeholderImageView.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
        [self.placeholderImageView.topAnchor constraintEqualToAnchor:self.placeholder.topAnchor],
    ]];
    self.somethingIsWrongLabel = [[UILabel alloc] init];
    [self.placeholder addSubview:self.somethingIsWrongLabel];
    [self.somethingIsWrongLabel setAttributedText:
     [[TypographyLegacy get] makeLoadingScreenText:
      NSLocalizedString(@"BookmarksScreenNoBookmarksAdded", "")]];
    self.somethingIsWrongLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.somethingIsWrongLabel.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
        [self.somethingIsWrongLabel.topAnchor constraintEqualToAnchor:self.placeholderImageView.bottomAnchor constant:32.0],
        [self.somethingIsWrongLabel.bottomAnchor constraintEqualToAnchor:self.placeholder.bottomAnchor],
    ]];

    [self.model addObserver:self];
    [self updateMainView];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  [[AnalyticsEvents get] logEvent:AnalyticsEventsScreenBookmarks];
}

- (void)updateMainView {
    [self.collectionView reloadData];
    [self.collectionView setHidden:[self.model.bookmarkItems count] == 0];
    [self.scrollView setHidden:[self.model.bookmarkItems count] > 0];
}

- (void)setUpWithCollectionView {

}

- (void)setUpWithNoDataPlaceholder {

}

#pragma mark <UICollectionViewDataSource>

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    return ceil((float)[self.model.bookmarkItems count] / 2.0);
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return 2;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"cellForItemAtIndexPath method, index path: %@", indexPath);
    BookmarkCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:kBookmarkCellId forIndexPath:indexPath];

    long index = indexPath.row + indexPath.section * 2;

    if (index >= [self.model.bookmarkItems count]) {
        return cell;
    }

    [cell update:self.model.bookmarkItems[index]];
    return cell;
}

#pragma mark <UICollectionViewDelegateFlowLayout>

static const CGFloat kInsetHorizontal = 16.0;
static const CGFloat kInsetVertical = 24.0;

- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
    [self.collectionView.collectionViewLayout invalidateLayout];
}

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
    CGSize layoutGuide = [self.view.safeAreaLayoutGuide layoutFrame].size;
    CGFloat baseWidth = self.collectionView.bounds.size.width;
    NSLog(@"Base width: %f", self.collectionView.bounds.size.width);
    NSLog(@"Bounds: %@", @(self.collectionView.bounds));
    NSLog(@"Safe are layout guide size: %@", @([self.view.safeAreaLayoutGuide layoutFrame].size));
    //CGFloat baseWidth = layoutGuide.width;

    long index = indexPath.row + indexPath.section * 2;
    if (index >= [self.model.bookmarkItems count]) {
        return CGSizeZero;
    }

    CGSize cellSize = CGSizeMake((baseWidth - 3 * kInsetHorizontal) / 2,
                                 ((baseWidth - 3 * kInsetHorizontal) / kCellAspectRatio ) / 2);

    return cellSize;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section {
    return 0;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section {
    return 0;
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section {
    if (section > 0) {
        return UIEdgeInsetsMake(0, kInsetHorizontal, kInsetVertical, kInsetHorizontal);
    }
    return UIEdgeInsetsMake(kInsetVertical, kInsetHorizontal, kInsetVertical, kInsetHorizontal);
}

#pragma mark <UICollectionViewDelegate>


// Uncomment this method to specify if the specified item should be highlighted during tracking
- (BOOL)collectionView:(UICollectionView *)collectionView shouldHighlightItemAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}



// Uncomment this method to specify if the specified item should be selected
- (BOOL)collectionView:(UICollectionView *)collectionView shouldSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"Selected cell at index path: %@", indexPath);

    long index = indexPath.row + indexPath.section * 2;

    if (index >= [self.model.bookmarkItems count]) {
        return;
    }
    BookmarkItem *bookmarkItem = self.model.bookmarkItems[index];
    if (bookmarkItem.howMany == 0) {
        return;
    }

    PlacesViewController *placesViewController =
    [[PlacesViewController alloc] initWithIndexModel:self.indexModel
                                          apiService:self.apiService
                                     coreDataService:self.coreDataService
                                     mapService:self.mapService
                                            mapModel:self.mapModel
                                       locationModel:self.locationModel
                                         searchModel:self.searchModel
                                        detailsModel:self.detailsModel
                                          bookmarked:YES allowedItemUUIDs:nil];
    Category *category = bookmarkItem.correspondingCategory;
    placesViewController.category = category;
    [self.navigationController pushViewController:placesViewController animated:YES];
    [[AnalyticsEvents get] logEvent:AnalyticsEventsPressSavedCategory withParams:@{
      AnalyticsEventsParamCategoryName: category.title
    }];
}

/*
 #pragma mark - Navigation

 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

- (void)onBookmarksUpdate:(nonnull NSArray<BookmarkItem *> *)bookmarkItems {
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        [weakSelf updateMainView];
    });

}

- (void)scrollToTop {
  [self.collectionView setContentOffset:CGPointZero animated:YES];
}

@end
