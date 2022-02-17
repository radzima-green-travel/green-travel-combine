//
//  PlacesViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/19/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "PlacesViewController.h"
#import "PlaceCategory.h"
#import "PhotoCollectionViewCell.h"
#import "Colors.h"
#import "PlaceItem.h"
#import "DetailsViewController.h"
#import "IndexModel.h"
#import "MapModel.h"
#import "LocationModel.h"
#import "CategoryUtils.h"
#import "StyleUtils.h"
#import "AnalyticsEvents.h"

@interface PlacesViewController ()

@property (assign, nonatomic) BOOL bookmarked;
@property (strong, nonatomic) NSMutableArray<PlaceItem *> *bookmarkedItems;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) DetailsModel *detailsModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSOrderedSet<NSString *> *allowedItemUUIDs;
@property (strong, nonatomic) NSMutableArray<PlaceItem *> *allowedItems;

@end

@implementation PlacesViewController

static NSString * const kPhotoCellId = @"photoCellId";
static const CGFloat kCellAspectRatio = 324.0 / 144.0;

- (instancetype)initWithIndexModel:(IndexModel *)indexModel
                        apiService:(ApiService *)apiService
                        coreDataService:(CoreDataService *)coreDataService
                   mapService:(MapService *)mapService
                          mapModel:(MapModel *)mapModel
                     locationModel:(LocationModel *)locationModel
                     searchModel:(SearchModel *)searchModel
                      detailsModel:(DetailsModel *)detailsModel
                        bookmarked:(BOOL)bookmarked
                  allowedItemUUIDs:(NSOrderedSet<NSString *> *)allowedItemUUIDs;
{
    self = [super init];
    if (self) {
        UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];
        [flowLayout setScrollDirection:UICollectionViewScrollDirectionVertical];
        self = [self initWithCollectionViewLayout:flowLayout];
        _bookmarked = bookmarked;
        _indexModel = indexModel;
        _apiService = apiService;
        _coreDataService = coreDataService;
        _mapModel = mapModel;
        _locationModel = locationModel;
        _searchModel = searchModel;
        _detailsModel = detailsModel;
        _allowedItemUUIDs = allowedItemUUIDs;
        _mapService = mapService;
    }
    return self;
}

- (void)viewWillLayoutSubviews {
  self.collectionView.backgroundColor = [Colors get].background;
  configureNavigationBar(self.navigationController.navigationBar);
}

- (void)viewDidLoad {
    [super viewDidLoad];

    // Uncomment the following line to preserve selection between presentations
    // self.clearsSelectionOnViewWillAppear = NO;
    // Register cell classes
    [self.collectionView registerClass:[PhotoCollectionViewCell class] forCellWithReuseIdentifier:kPhotoCellId];
    self.collectionView.alwaysBounceVertical = YES;

    self.title = self.category.title;

    if (!self.bookmarked) {
        [self.collectionView reloadData];
    }
    [self.indexModel addObserverBookmarks:self];
}

- (void)viewWillAppear:(BOOL)animated {
    if (self.bookmarked) {
        self.bookmarkedItems = [[NSMutableArray alloc] initWithArray:[self.category.items
        filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"bookmarked == YES"]]];
        [self.collectionView reloadData];
        if ([self.bookmarkedItems count] == 0) {
            [self.navigationController popViewControllerAnimated:YES];
        }
    }
    if (self.allowedItemUUIDs) {
        __weak typeof(self) weakSelf = self;
        self.allowedItems = [[NSMutableArray alloc] init];
        NSDictionary<NSString*, PlaceItem*> *flatItems = flattenCategoriesTreeIntoItemsMap(self.indexModel.categories);
        [self.allowedItemUUIDs enumerateObjectsUsingBlock:^(NSString * _Nonnull itemUUID, NSUInteger idx, BOOL * _Nonnull stop) {
            if (!flatItems[itemUUID]) {
                return;
            }
            [weakSelf.allowedItems addObject:flatItems[itemUUID]];
        }];
    }
    traverseCategories(@[self.category], ^(PlaceCategory *category, PlaceItem *item) {
        category.onPlaceCellPress = ^{};
        item.onPlaceCellPress = ^{};
    });
  
  NSArray *indexSource;
  if ([self.category.categories count] > 0) {
    indexSource = self.category.categories;
    [self.category.categories enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      [obj.title characterAtIndex:0];
    }];
  }
  if (self.bookmarked) {
    indexSource = self.bookmarkedItems;
  }
  if (self.allowedItemUUIDs) {
    indexSource = self.allowedItems;
  } else {
    indexSource = self.category.items
  }
  [indexSource enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      
  }];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

#pragma mark <UICollectionViewDataSource>

- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
    [self.collectionView.collectionViewLayout invalidateLayout];
}

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    return 1;
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    NSUInteger howManyCategories = [self.category.categories count];
    if (howManyCategories > 0) {
        return howManyCategories;
    }
    if (self.bookmarked) {
        return [self.bookmarkedItems count];
    }
    if (self.allowedItemUUIDs) {
        return [self.allowedItems count];
    }
    return [self.category.items count];
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    PhotoCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:kPhotoCellId forIndexPath:indexPath];

    if ([self.category.categories count] > 0) {
        [cell updateCategory:self.category.categories[indexPath.row]];
    } else if (self.bookmarked) {
        [cell updateItem:self.bookmarkedItems[indexPath.row]];
    } else if (self.allowedItemUUIDs) {
        [cell updateItem:self.allowedItems[indexPath.row]];
    } else {
        [cell updateItem:self.category.items[indexPath.row]];
    }

    return cell;
}

- (NSArray<NSString *> *)indexTitlesForCollectionView:(UICollectionView *)collectionView {
  
}

- (NSIndexPath *)collectionView:(UICollectionView *)collectionView indexPathForIndexTitle:(NSString *)title atIndex:(NSInteger)index {
  
}

#pragma mark <UICollectionViewDelegate>

static const CGFloat kInset = 16.0;
static const CGFloat kInsetVertical = 32.0;
static const CGFloat kSpacing = 32.0;

- (CGSize)collectionView:(UICollectionView *)collectionView
                  layout:(UICollectionViewLayout *)collectionViewLayout
  sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
  CGFloat baseWidth = self.view.bounds.size.width - self.view.safeAreaInsets.left -
      self.view.safeAreaInsets.right;
  return CGSizeMake((baseWidth - kInset * 2),
                    ((baseWidth - kInset * 2) / kCellAspectRatio));
}

- (void)collectionView:(UICollectionView *)collectionView
didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"Did select item at index path: %@", indexPath);
    if ([self.category.categories count] > 0) {
        PlaceCategory *category = self.category.categories[indexPath.row];

        PlacesViewController *placesViewController =
        [[PlacesViewController alloc] initWithIndexModel:self.indexModel
                                              apiService:self.apiService
                                         coreDataService:self.coreDataService
                                         mapService:self.mapService
                                                mapModel:self.mapModel
                                           locationModel:self.locationModel
                                             searchModel:self.searchModel
                                            detailsModel:self.detailsModel
                                              bookmarked:NO
                                        allowedItemUUIDs:nil];
        placesViewController.category = category;
        [self.navigationController pushViewController:placesViewController animated:YES];
        [[AnalyticsEvents get] logEvent:AnalyticsEventsPressCard withParams:@{
            AnalyticsEventsParamCardName:category.title,
            AnalyticsEventsParamCardCategory:self.category.title,
        }];
        return;
    }
    PlaceItem *item;
    if (self.bookmarked) {
        item = self.bookmarkedItems[indexPath.row];
    } else if (self.allowedItems) {
        item = self.allowedItems[indexPath.row];
    } else {
        item = self.category.items[indexPath.row];
    }
    DetailsViewController *detailsController =
    [[DetailsViewController alloc] initWithApiService:self.apiService
                                      coreDataService:self.coreDataService
                                           mapService:self.mapService
                                           indexModel:self.indexModel
                                             mapModel:self.mapModel
                                        locationModel:self.locationModel
                                          searchModel:self.searchModel
                                         detailsModel:self.detailsModel];
    detailsController.item = item;
    [self.navigationController pushViewController:detailsController animated:YES];
    if (self.bookmarked) {
      [[AnalyticsEvents get] logEvent:AnalyticsEventsPressCardSaved withParams:@{
          AnalyticsEventsParamCardName:item.title,
          AnalyticsEventsParamCardCategory:self.category.title,
      }];
      return;
    }
    [[AnalyticsEvents get] logEvent:AnalyticsEventsPressCard withParams:@{
        AnalyticsEventsParamCardName:item.title,
        AnalyticsEventsParamCardCategory:self.category.title,
    }];
}

- (void)collectionView:(UICollectionView *)collectionView
didHighlightItemAtIndexPath:(NSIndexPath *)indexPath {
  __weak PhotoCollectionViewCell *cell = (PhotoCollectionViewCell *)[self.collectionView cellForItemAtIndexPath:indexPath];
  [UIView animateWithDuration:0.3 animations:^{
    cell.alpha = 0.8;
  }];
}

- (void)collectionView:(UICollectionView *)collectionView didUnhighlightItemAtIndexPath:(NSIndexPath *)indexPath {
  __weak PhotoCollectionViewCell *cell = (PhotoCollectionViewCell *)[self.collectionView cellForItemAtIndexPath:indexPath];
  [UIView animateWithDuration:0.3 animations:^{
    cell.alpha = 1;
  }];
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section {
    return 0;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section {
    return kSpacing;
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section {
    if (section > 0) {
        return UIEdgeInsetsMake(0, kInset, kInset, kInset);
    }
    return UIEdgeInsetsMake(kInsetVertical, kInset, kInsetVertical, kInset);
}

#pragma mark - BookmarkObserver
- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {
    NSUInteger foundIndex = NSNotFound;
    BOOL(^indexOfObjectPassingTest)(PlaceItem *, NSUInteger , BOOL*) = ^BOOL(PlaceItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        return [obj.uuid isEqualToString:item.uuid];
    };
    if (self.bookmarked) {
        foundIndex = [self.bookmarkedItems indexOfObjectPassingTest:indexOfObjectPassingTest];
    } else if ([self.allowedItems count]) {
        foundIndex = [self.allowedItems indexOfObjectPassingTest:indexOfObjectPassingTest];
    } else {
        foundIndex = [self.category.items indexOfObjectPassingTest:indexOfObjectPassingTest];
    }

    if (foundIndex == NSNotFound) {
        return;
    }
    NSIndexPath *indexPathOfFoundIndex =  [NSIndexPath indexPathForItem:foundIndex inSection:0];
    PhotoCollectionViewCell *cell = (PhotoCollectionViewCell *) [self.collectionView cellForItemAtIndexPath:indexPathOfFoundIndex];
    [cell updateBookmark:bookmark];
    if (!self.bookmarked) {
        return;
    }
    if (!bookmark) {
        __weak typeof(self) weakSelf = self;
        [self.collectionView performBatchUpdates:^{
            [weakSelf.bookmarkedItems removeObjectAtIndex:indexPathOfFoundIndex.item];
            [weakSelf.collectionView deleteItemsAtIndexPaths:@[indexPathOfFoundIndex]];
        } completion:^(BOOL finished) {
        }];
    }

    if (self.viewIfLoaded.window != nil && [self.bookmarkedItems count] == 0) {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

@end
