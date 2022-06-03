//
//  IndexViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/15/20

#import "Colors.h"
#import "TextUtils.h"
#import "IndexViewController.h"
#import "PlacesTableViewCell.h"
#import "PhotoCollectionViewCell.h"
#import "PlaceItem.h"
#import "PlaceCategory.h"
#import "DetailsViewController.h"
#import "SearchViewController.h"
#import "PlacesViewController.h"
#import "StyleUtils.h"
#import "SizeUtils.h"
#import "PlacesTableViewCellConstants.h"
#import "IndexModel.h"
#import "DetailsModel.h"
#import "SearchModel.h"
#import "ApiService.h"
#import "LocationModel.h"
#import "CoreDataService.h"
#import "IndexViewControllerConstants.h"
#import "CommonButton.h"
#import "TypographyLegacy.h"
#import "RefreshButton.h"
#import "AnalyticsEvents.h"
#import "ScrollViewUtils.h"
#import "AnalyticsTimeTracer.h"
#import "NoDataView.h"

@interface IndexViewController ()

@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) IndexModel *model;
@property (strong, nonatomic) DetailsModel *detailsModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) NoDataView *noDataView;
@property (strong, nonatomic) UIRefreshControl *refreshControl;
@property (strong, nonatomic) UIView *contentView;
@property (strong, nonatomic) UIBarButtonItem *originalBackButtonItem;
@property (strong, nonatomic) UIImageView *placeholderImageView;
@property (strong, nonatomic) UILabel *somethingIsWrongLabel;
@property (strong, nonatomic) CommonButton *retryButton;
@property (strong, nonatomic) UIActivityIndicatorView *activityIndicatorView;
@property (strong, nonatomic) UIView *placeholder;
@property (strong, nonatomic) RefreshButton *refreshButton;
@property (strong, nonatomic) NSLayoutConstraint *yPosition;
@property (strong, nonatomic) UINavigationBar *navigationBar;
@property (strong, nonatomic) AnalyticsTimeTracer *timeTracer;
@property (assign, nonatomic) UIInterfaceOrientation prevOrientation;

@end

static NSString * const kCollectionCellId = @"collectionCellId";
static CGFloat kDeltaCoverAndBounds = 50.0;
static CGFloat kMinHeightOfPlaceholderView = 500.0;
static CGFloat kNewDataButtonOffScreenOffsetY = 0.0;
static CGFloat kNewDataButtonOnScreenOffsetY = 50.0;

@implementation IndexViewController 

- (instancetype) initWithApiService:(ApiService *)apiService
                              model:(nonnull IndexModel *)model
                        searchModel:(SearchModel *)searchModel
                      locationModel:(LocationModel *)locationModel
                           mapModel:(MapModel *)mapModel
                       detailsModel:(DetailsModel *)detailsModel
                    coreDataService:(CoreDataService *)coreDataService
                         mapService:(MapService *)mapService
{
    self = [super init];
    _apiService = apiService;
    _model = model;
    _searchModel = searchModel;
    _locationModel = locationModel;
    _mapModel = mapModel;
    _detailsModel = detailsModel;
    _coreDataService = coreDataService;
    _mapService = mapService;
    return self;
}

- (UIStatusBarStyle)preferredStatusBarStyle {
    return UIStatusBarStyleLightContent;
}

- (UIInterfaceOrientation)windowInterfaceOrientation {
  if (@available(iOS 13, *)) {
    return [[[[[UIApplication sharedApplication] windows] firstObject] windowScene] interfaceOrientation];
  }
  return [[UIApplication sharedApplication] statusBarOrientation];
}

- (void)viewWillLayoutSubviews {
  self.view.backgroundColor = [Colors get].background;
  self.dataView.backgroundColor = [Colors get].background;
  self.navigationItem.rightBarButtonItem.tintColor = [Colors get].navigationBarTint;
  configureNavigationBar(self.navigationBar);
}

#pragma mark - Lifecycle
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemSearch target:self action:@selector(onSearchPress:)];
    
    self.navigationBar = self.navigationController.navigationBar;
    
    self.originalBackButtonItem = self.navigationItem.backBarButtonItem;
#pragma mark - Table view
    self.dataView = [[UITableView alloc] init];
    UITableView *dataView = (UITableView *) self.dataView;
    dataView.delegate = self;
    dataView.dataSource = self;
    [dataView registerClass:PlacesTableViewCell.class forCellReuseIdentifier:kCollectionCellId];
    dataView.allowsSelection = NO;
    dataView.separatorStyle = UITableViewCellSeparatorStyleNone;
    dataView.alwaysBounceVertical = YES;
    [self.view addSubview:dataView];
    dataView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [dataView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
        [dataView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [dataView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        [dataView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
    ]];
    self.refreshControl = [[UIRefreshControl alloc] init];
    [self.refreshControl addTarget:self action:@selector(onRefresh:)
                  forControlEvents:UIControlEventValueChanged];
    dataView.refreshControl = self.refreshControl;
#pragma mark - Refresh button
    self.refreshButton = [[RefreshButton alloc] initWithTarget:self
                                                            action:@selector(onNewDataPress:)];
    [self.view addSubview:self.refreshButton];
    self.refreshButton.translatesAutoresizingMaskIntoConstraints = NO;
    self.yPosition = [self.refreshButton.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor constant:kNewDataButtonOffScreenOffsetY];
    [NSLayoutConstraint activateConstraints:@[
        [self.refreshButton.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        self.yPosition,
    ]];
    
    [self setUpWithActivityIndicator];

    [self.model addObserver:self];
    [self.model addObserverBookmarks:self];
    [self.model loadCategories];
    self.timeTracer = [[AnalyticsTimeTracer alloc]
                   initWithEventName:AnalyticsEventsLifeTimeHomeScreen];
}

- (void)showRefreshButton:(BOOL)show {
    __weak typeof(self) weakSelf = self;
    if (show) {
        [self.refreshButton setEnabled:YES];
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [UIView animateWithDuration:0.5 animations:^{
            strongSelf.yPosition.constant = kNewDataButtonOnScreenOffsetY;
            [strongSelf.view setNeedsLayout];
            [strongSelf.view layoutIfNeeded];
        } completion:^(BOOL finished) {
        }];
        return;
    }
    [self.refreshButton setEnabled:NO];
    [UIView animateWithDuration:0.5 animations:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        strongSelf.yPosition.constant = kNewDataButtonOffScreenOffsetY;
        [strongSelf.view setNeedsLayout];
        [strongSelf.view layoutIfNeeded];
    } completion:^(BOOL finished) {
    }];
}

- (void)setUpWithDataView {
  [super setUpWithDataView];
  [(UITableView *)self.dataView reloadData];
}

#pragma mark - Lifecycle

- (void)viewWillAppear:(BOOL)animated {
  [self fillNavigationListeners:self.model.randomizedCategories];
  [self fillNavigationListeners:self.model.categories];
  [self.timeTracer traceStart];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  [[AnalyticsEvents get] logEvent:AnalyticsEventsScreenHome];
  [self.navigationItem setBackBarButtonItem:self.originalBackButtonItem];
}

- (void)viewDidDisappear:(BOOL)animated {
  [super viewDidDisappear:animated];
  [self.timeTracer traceEnd];
}

- (void)onSearchPress:(id)sender {
    [self.navigationItem setBackBarButtonItem:[[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil]];
    __weak typeof(self) weakSelf = self;
    [self.navigationController pushViewController:
     [[SearchViewController alloc] initWithModel:self.searchModel
                                      indexModel:self.model
                                   locationModel:self.locationModel
                                        mapModel:self.mapModel
                                      apiService:self.apiService
                                 coreDataService:self.coreDataService
                             itemsWithCoordsOnly:NO
                              onSearchItemSelect:^(PlaceItem * _Nonnull item) {
        DetailsViewController *detailsController =
        [[DetailsViewController alloc] initWithApiService:weakSelf.apiService
                                          coreDataService:weakSelf.coreDataService
                                               mapService:weakSelf.mapService
                                               indexModel:weakSelf.model
                                                 mapModel:weakSelf.mapModel
                                            locationModel:weakSelf.locationModel
                                              searchModel:weakSelf.searchModel
                                             detailsModel:weakSelf.detailsModel];
        detailsController.item = item;
        [weakSelf.navigationController pushViewController:detailsController animated:YES];
    } onViewDidDisappearWithSelectedItem:^(PlaceItem * _Nonnull item) {
    }] animated:NO];
}

#pragma mark - Table data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.model.randomizedCategories count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    PlacesTableViewCell *cell = [(UITableView *)self.dataView dequeueReusableCellWithIdentifier:kCollectionCellId forIndexPath:indexPath];
    [cell update:self.model.randomizedCategories[indexPath.row]];

    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    CGSize adaptedSize = CGSizeMake(self.view.bounds.size.width - kDeltaCoverAndBounds, self.view.bounds.size.height);
    return getCoverSize(adaptedSize).height + 2 *
            IndexViewControllerCoverInset + 50.0;
}

#pragma mark - Categories update
- (void)onCategoriesUpdate:(nonnull NSArray<PlaceCategory *> *)categories {
    [self fillNavigationListeners:self.model.randomizedCategories];
    [self fillNavigationListeners:self.model.categories];
    if ([categories count]) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self setUpWithDataView];
        });
    }
}

- (void)onCategoriesNewDataAvailable {
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        [weakSelf showRefreshButton:YES];
    });
}

- (void)onCategoriesLoading:(BOOL)loading {
    __weak typeof(self) weakSelf = self;
    if (!loading) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if ([weakSelf.model.categories count] == 0) {
                [weakSelf setUpWithNoDataPlaceholder];
            }
        });
        return;
    }
    if (loading) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf setUpWithActivityIndicator];
        });
    }
}

#pragma mark - Bookmarks update
- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {
    NSIndexSet *indexes = [self.model.randomizedCategories indexesOfObjectsPassingTest:^BOOL(PlaceCategory * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        return [obj.uuid isEqualToString:item.category.uuid];
    }];
    [indexes enumerateIndexesUsingBlock:^(NSUInteger idx, BOOL * _Nonnull stop) {
        NSIndexPath *indexPathOfFoundCategory =  [NSIndexPath indexPathForRow:idx inSection:0];
        PlacesTableViewCell *cell = (PlacesTableViewCell *) [(UITableView *) self.dataView cellForRowAtIndexPath:indexPathOfFoundCategory];
        NSIndexSet *indexes = [self.model.randomizedCategories[idx].items indexesOfObjectsPassingTest:^BOOL(PlaceItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            return [obj.uuid isEqualToString:item.uuid];
        }];
        [indexes enumerateIndexesUsingBlock:^(NSUInteger idx, BOOL * _Nonnull stop) {
            NSIndexPath *indexPathOfFoundItem =  [NSIndexPath indexPathForRow:idx inSection:0];
            PhotoCollectionViewCell *photoCollectionViewCell = (PhotoCollectionViewCell *) [cell.collectionView cellForItemAtIndexPath:indexPathOfFoundItem];
            [photoCollectionViewCell updateBookmark:bookmark];
        }];
    }];
}

#pragma mark - Listeners
- (void)onRetry {
    [self.model retryCategories];
}

- (void)onNewDataPress:(id)sender {
    [self.model applyCategoriesUpdate];
    [self showRefreshButton:NO];
}

- (void)onRefresh:(id)sender {
  [self showRefreshButton:NO];
  __weak typeof(self) weakSelf = self;
  [self.model reloadCategoriesRemote:^{
    dispatch_async(dispatch_get_main_queue(), ^{
      [weakSelf.refreshControl endRefreshing];
      [weakSelf scrollItemsToLeft:NO];
    });
  }];
}

- (void)fillNavigationListeners:(NSArray<PlaceCategory *> *)categories {
    __weak typeof(self) weakSelf = self;
    [categories enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        __weak typeof(obj) weakParentCategory = obj;
        obj.onAllButtonPress = ^void() {
            PlacesViewController *placesViewController =
            [[PlacesViewController alloc] initWithIndexModel:weakSelf.model
                                                  apiService:weakSelf.apiService
                                             coreDataService:weakSelf.coreDataService
                                                  mapService:weakSelf.mapService
                                                    mapModel:weakSelf.mapModel
                                               locationModel:weakSelf.locationModel
                                                 searchModel:weakSelf.searchModel
                                                 detailsModel:weakSelf.detailsModel
                                                  bookmarked:NO allowedItemUUIDs:nil];
            PlaceCategory *foundCategory = weakSelf.model.flatCategories[weakParentCategory.uuid];
            placesViewController.category = foundCategory;
            [weakSelf.navigationController pushViewController:placesViewController animated:YES];
            [[AnalyticsEvents get] logEvent:AnalyticsEventsSeeAll withParams:@{
              AnalyticsEventsParamCardCategory:foundCategory.title
            }];
        };
        [weakSelf fillNavigationListeners:obj.categories];
        
        [obj.categories enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
            __weak typeof(category) weakCategory = category;
            category.onPlaceCellPress = ^void() {
                PlacesViewController *placesViewController =
                [[PlacesViewController alloc] initWithIndexModel:weakSelf.model
                                                      apiService:weakSelf.apiService
                                                 coreDataService:weakSelf.coreDataService
                                                      mapService:weakSelf.mapService
                                                        mapModel:weakSelf.mapModel
                                                   locationModel:weakSelf.locationModel
                                                     searchModel:weakSelf.searchModel
                                                    detailsModel:weakSelf.detailsModel
                                                      bookmarked:NO allowedItemUUIDs:nil];
                placesViewController.category = weakCategory;
                [weakSelf.navigationController pushViewController:placesViewController animated:YES];
                [[AnalyticsEvents get] logEvent:AnalyticsEventsPressCard withParams:@{
                    AnalyticsEventsParamCardName:weakCategory.title,
                    AnalyticsEventsParamCardCategory:weakParentCategory.title,
                }];
            };
        }];
        
        [obj.items enumerateObjectsUsingBlock:^(PlaceItem * _Nonnull placeItem, NSUInteger idx, BOOL * _Nonnull stop) {
            __weak typeof(placeItem) weakPlaceItem = placeItem;
            placeItem.onPlaceCellPress = ^void() {
                DetailsViewController *detailsController =
                [[DetailsViewController alloc] initWithApiService:weakSelf.apiService
                                                  coreDataService:weakSelf.coreDataService
                                                       mapService:weakSelf.mapService
                                                       indexModel:weakSelf.model
                                                         mapModel:weakSelf.mapModel
                                                    locationModel:weakSelf.locationModel
                                                      searchModel:weakSelf.searchModel
                                                     detailsModel:weakSelf.detailsModel];
                detailsController.item = weakPlaceItem;
                [weakSelf.navigationController pushViewController:detailsController animated:YES];
                [[AnalyticsEvents get] logEvent:AnalyticsEventsPressCard withParams:@{
                    AnalyticsEventsParamCardName:weakPlaceItem.title,
                    AnalyticsEventsParamCardCategory:weakParentCategory.title,
                }];
            };
            placeItem.onFavoriteButtonPress = ^void() {
              [weakSelf.model bookmarkItem:weakPlaceItem
                                  bookmark:!weakPlaceItem.bookmarked];
              NSString *bookmarkEvent = weakPlaceItem.bookmarked ? AnalyticsEventsUnsaveCard : AnalyticsEventsSaveCard;
              [[AnalyticsEvents get] logEvent:bookmarkEvent
                                   withParams:@{
                                     AnalyticsEventsParamCardName:weakPlaceItem.title,
                                     AnalyticsEventsParamCardCategory:weakPlaceItem.category.title,
                                   }];
            };
        }];
    }];
}

- (void)scrollViewDidScrollToTop:(UIScrollView *)scrollView {
  [self scrollItemsToLeft:YES];
}

- (void)scrollItemsToLeft:(BOOL)animated {
  [self iterateOverCells:^(PlacesTableViewCell *cell) {
    [cell.collectionView setContentOffset:CGPointMake(0, 0) animated:animated];
  }];
}

- (void)scrollToTop {
  [self.dataView setContentOffset:CGPointZero animated:YES];
  [self scrollItemsToLeft:YES];
}

#pragma mark - viewWillTransitionToSize
- (void)viewWillTransitionToSize:(CGSize)size
       withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
  [super viewWillTransitionToSize:size withTransitionCoordinator:coordinator];
  [coordinator animateAlongsideTransition:^(id<UIViewControllerTransitionCoordinatorContext>  _Nonnull context) {
    UIInterfaceOrientation orientation = [self windowInterfaceOrientation];
    if ([self windowInterfaceOrientation] == UIInterfaceOrientationUnknown) {
      return;
    }
    if (
        (self.prevOrientation == UIInterfaceOrientationUnknown && orientation != UIInterfaceOrientationUnknown) ||
        (UIInterfaceOrientationIsPortrait(self.prevOrientation) && !UIInterfaceOrientationIsPortrait(orientation)) ||
        (UIInterfaceOrientationIsLandscape(self.prevOrientation) && !UIInterfaceOrientationIsLandscape(orientation))) {
          self.prevOrientation = orientation;
          [self iterateOverCells:^(PlacesTableViewCell *cell) {
            [cell scrollToMostExposedCell];
          }];
        }
  } completion:^(id<UIViewControllerTransitionCoordinatorContext>  _Nonnull context) {
  }];
}

- (void)iterateOverCells:(void(^)(PlacesTableViewCell *))onCellVisit {
  UITableView *dataView = (UITableView *)self.dataView;
  for (NSUInteger sectionCounter = 0; sectionCounter < dataView.numberOfSections; sectionCounter++) {
    for (NSUInteger rowCounter = 0; rowCounter < [dataView numberOfRowsInSection:sectionCounter]; rowCounter++) {
      PlacesTableViewCell *cell =
      [dataView cellForRowAtIndexPath:
       [NSIndexPath indexPathForRow:rowCounter inSection:sectionCounter]];
      onCellVisit(cell);
    }
  }
}

@end
