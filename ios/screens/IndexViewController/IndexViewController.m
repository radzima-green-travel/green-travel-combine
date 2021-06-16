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
#import "Category.h"
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
#import "Typography.h"
#import "RefreshButton.h"

@interface IndexViewController ()

@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) IndexModel *model;
@property (strong, nonatomic) DetailsModel *detailsModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) UITableView *tableView;
@property (strong, nonatomic) UIScrollView *scrollView;
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

@end

static NSString * const kCollectionCellId = @"collectionCellId";
static CGFloat kDeltaCoverAndBounds = 50.0;
static CGFloat kMinHeightOfPlaceholderView = 500.0;

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

- (void)viewWillLayoutSubviews {
  self.view.backgroundColor = [Colors get].background;
  self.tableView.backgroundColor = [Colors get].background;
  self.navigationItem.rightBarButtonItem.tintColor = [Colors get].navigationBarTint;
  configureNavigationBar(self.navigationBar);
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemSearch target:self action:@selector(onSearchPress:)];
    
    self.navigationBar = self.navigationController.navigationBar;
    
    self.originalBackButtonItem = self.navigationItem.backBarButtonItem;
#pragma mark - Table view
    self.tableView = [[UITableView alloc] init];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    [self.tableView registerClass:PlacesTableViewCell.class forCellReuseIdentifier:kCollectionCellId];
    self.tableView.allowsSelection = NO;
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    self.tableView.alwaysBounceVertical = YES;
    [self.view addSubview:self.tableView];
    self.tableView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.tableView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
        [self.tableView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.tableView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        [self.tableView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
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
    
    self.placeholderImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"coffee-break"]];
    [self.placeholder addSubview:self.placeholderImageView];
    self.placeholderImageView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.placeholderImageView.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
        [self.placeholderImageView.topAnchor constraintEqualToAnchor:self.placeholder.topAnchor],
    ]];
    
    self.somethingIsWrongLabel = [[UILabel alloc] init];
    [self.placeholder addSubview:self.somethingIsWrongLabel];
    [self.somethingIsWrongLabel setAttributedText:[[Typography get] makeLoadingScreenText:@"Что-то пошло не так..."]];
    self.somethingIsWrongLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.somethingIsWrongLabel.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
        [self.somethingIsWrongLabel.topAnchor constraintEqualToAnchor:self.placeholderImageView.bottomAnchor constant:32.0],
    ]];
    
    self.retryButton = [[CommonButton alloc] initWithTarget:self
                                                     action:@selector(onRetry:)
                                                      label:@"Попробовать еще раз"];
    [self.placeholder addSubview:self.retryButton];
    self.retryButton.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.retryButton.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
        [self.retryButton.topAnchor constraintEqualToAnchor:self.somethingIsWrongLabel.bottomAnchor constant:27.28],
        [self.retryButton.bottomAnchor constraintEqualToAnchor:self.placeholder.bottomAnchor],
    ]];
#pragma mark - Activity indicator view
    self.activityIndicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    [self.view addSubview:self.activityIndicatorView];
    self.activityIndicatorView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.activityIndicatorView.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [self.activityIndicatorView.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
    ]];
#pragma mark - Refresh button
    self.refreshButton = [[RefreshButton alloc] initWithTarget:self
                                                            action:@selector(onNewDataPress:)];
    [self.view addSubview:self.refreshButton];
    self.refreshButton.translatesAutoresizingMaskIntoConstraints = NO;
    self.yPosition = [self.refreshButton.bottomAnchor constraintEqualToAnchor:self.view.topAnchor constant:0.0];
    [NSLayoutConstraint activateConstraints:@[
        [self.refreshButton.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        self.yPosition,
    ]];
    
    [self setUpWithActivityIndicator];

    [self.model addObserver:self];
    [self.model addObserverBookmarks:self];
    [self.model loadCategories];
}

- (void)showRefreshButton:(BOOL)show {
    __weak typeof(self) weakSelf = self;
    if (show) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [UIView animateWithDuration:0.5 animations:^{
            strongSelf.yPosition.constant = 50.0;
            [strongSelf.view setNeedsLayout];
            [strongSelf.view layoutIfNeeded];
        } completion:^(BOOL finished) {
        }];
        return;
    }
    [UIView animateWithDuration:0.5 animations:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        strongSelf.yPosition.constant = 0.0;
        [strongSelf.view setNeedsLayout];
        [strongSelf.view layoutIfNeeded];
    } completion:^(BOOL finished) {
    }];
}

- (void)setUpWithTable {
    [self.activityIndicatorView setHidden:YES];
    [self.activityIndicatorView stopAnimating];
    [self.scrollView setHidden:YES];
    [self.tableView setHidden:NO];
    [self.tableView reloadData];
}

- (void)setUpWithNoDataPlaceholder {
    [self.tableView setHidden:NO];
    [self.activityIndicatorView setHidden:YES];
    [self.activityIndicatorView stopAnimating];
    [self.scrollView setHidden:NO];
}

- (void)setUpWithActivityIndicator {
    [self.tableView setHidden:YES];
    [self.scrollView setHidden:YES];
    [self.activityIndicatorView setHidden:NO];
    [self.activityIndicatorView startAnimating];
}

#pragma mark - Lifecycle

- (void)viewWillAppear:(BOOL)animated {
    [self fillNavigationListeners:self.model.randomizedCategories];
}

- (void)viewDidAppear:(BOOL)animated {
    [self.navigationItem setBackBarButtonItem:self.originalBackButtonItem];
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
                                              searchModel:weakSelf.searchModel];
        detailsController.item = item;
        [weakSelf.navigationController pushViewController:detailsController animated:YES];
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
    PlacesTableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:kCollectionCellId forIndexPath:indexPath];
    
    [cell update:self.model.randomizedCategories[indexPath.row]];

    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    CGSize adaptedSize = CGSizeMake(self.view.bounds.size.width - kDeltaCoverAndBounds, self.view.bounds.size.height);
    return getCoverSize(adaptedSize).height + 2 *
            IndexViewControllerCoverInset + 50.0;
}

#pragma mark - Categories update
- (void)onCategoriesUpdate:(nonnull NSArray<Category *> *)categories {
    [self fillNavigationListeners:self.model.randomizedCategories];
    if ([categories count]) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self setUpWithTable];
        });
    }
}

- (void)onCategoriesNewDataAvailable {
    __weak typeof(self) weakSelf = self;
    if (![self.model.randomizedCategories count]) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [weakSelf setUpWithTable];
        });
        return;
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        [weakSelf showRefreshButton:YES];
    });
}

- (void)onCategoriesLoading:(BOOL)loading {
    __weak typeof(self) weakSelf = self;
    if (!loading) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if ([weakSelf.model.categories count] > 0) {
                [weakSelf setUpWithTable];
                return;
            }
            [weakSelf setUpWithNoDataPlaceholder];
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
    NSIndexSet *indexes = [self.model.randomizedCategories indexesOfObjectsPassingTest:^BOOL(Category * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        return [obj.uuid isEqualToString:item.category.uuid];
    }];
    [indexes enumerateIndexesUsingBlock:^(NSUInteger idx, BOOL * _Nonnull stop) {
        NSIndexPath *indexPathOfFoundCategory =  [NSIndexPath indexPathForRow:idx inSection:0];
        PlacesTableViewCell *cell = (PlacesTableViewCell *) [self.tableView cellForRowAtIndexPath:indexPathOfFoundCategory];
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
- (void)onRetry:(id)sender {
    [self.model retryCategories];
}

- (void)onNewDataPress:(id)sender {
    [self.model refreshCategories];
    [self showRefreshButton:NO];
}

- (void)fillNavigationListeners:(NSArray<Category *> *)categories {
    __weak typeof(self) weakSelf = self;
    [categories enumerateObjectsUsingBlock:^(Category * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        __weak typeof(obj) weakCategory = obj;
        obj.onAllButtonPress = ^void() {
            PlacesViewController *placesViewController =
            [[PlacesViewController alloc] initWithIndexModel:weakSelf.model
                                                  apiService:weakSelf.apiService
                                             coreDataService:weakSelf.coreDataService
                                                  mapService:weakSelf.mapService
                                                    mapModel:weakSelf.mapModel
                                               locationModel:weakSelf.locationModel
                                                 searchModel:weakSelf.searchModel
                                                  bookmarked:NO allowedItemUUIDs:nil];
            placesViewController.category = weakSelf.model.flatCategories[weakCategory.uuid];
            [weakSelf.navigationController pushViewController:placesViewController animated:YES];
        };
        [weakSelf fillNavigationListeners:obj.categories];
        
        [obj.categories enumerateObjectsUsingBlock:^(Category * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            __weak typeof(obj) weakCategory = obj;
            obj.onPlaceCellPress = ^void() {
                PlacesViewController *placesViewController =
                [[PlacesViewController alloc] initWithIndexModel:weakSelf.model
                                                      apiService:weakSelf.apiService
                                                 coreDataService:weakSelf.coreDataService
                                                      mapService:weakSelf.mapService
                                                        mapModel:weakSelf.mapModel
                                                   locationModel:weakSelf.locationModel
                                                     searchModel:weakSelf.searchModel
                                                      bookmarked:NO allowedItemUUIDs:nil];
                placesViewController.category = weakCategory;
                [weakSelf.navigationController pushViewController:placesViewController animated:YES];
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
                                                      searchModel:weakSelf.searchModel];
                detailsController.item = weakPlaceItem;
                [weakSelf.navigationController pushViewController:detailsController animated:YES];
            };
            placeItem.onFavoriteButtonPress = ^void() {
                [weakSelf.model bookmarkItem:weakPlaceItem
                                    bookmark:!weakPlaceItem.bookmarked];
            };
        }];
    }];
}

- (void)scrollViewDidScrollToTop:(UIScrollView *)scrollView {
  [self scrollItemsToLeft];
}

- (void)scrollItemsToLeft {
  for (NSUInteger sectionCounter = 0; sectionCounter < self.tableView.numberOfSections; sectionCounter++) {
    for (NSUInteger rowCounter = 0; rowCounter < [self.tableView numberOfRowsInSection:sectionCounter]; rowCounter++) {
      PlacesTableViewCell *cell =
      [self.tableView cellForRowAtIndexPath:
       [NSIndexPath indexPathForRow:rowCounter inSection:sectionCounter]];
      [cell.collectionView setContentOffset:CGPointMake(0, 0) animated:YES];
    }
  }
}

- (void)scrollToTop {
  [self.tableView setContentOffset:CGPointZero animated:YES];
  [self scrollItemsToLeft];
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
  
}

@end
