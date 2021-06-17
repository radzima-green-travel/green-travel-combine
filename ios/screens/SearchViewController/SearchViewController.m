//
//  SearchViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/16/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "SearchViewController.h"
#import "UISearchControllerNoCancel.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "PlaceItem.h"
#import "Category.h"
#import "SearchCell.h"
#import "DetailsViewController.h"
#import "SearchItem.h"
#import "SearchCellConfiguration.h"
#import "WeRecommendCell.h"
#import "FullMapViewController.h"
#import "IndexModel.h"
#import "SearchModel.h"
#import "LocationModel.h"
#import "DetailsModel.h"
#import "ApiService.h"
#import "CoreDataService.h"
#import <CoreLocation/CoreLocation.h>
#import "Typography.h"

@interface SearchViewController ()

@property (strong, nonatomic) NSMutableArray<NSString *> *dataSourceHistory;
@property (strong, nonatomic) NSMutableArray<SearchItem *> *dataSourceFiltered;
@property (strong, nonatomic) UISearchController *searchController;
@property (strong, nonatomic) SearchModel *model;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) CLLocation *lastLocation;
@property (assign, nonatomic) BOOL locationIsEnabled;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) SearchItem *itemToSaveToHistory;
@property (strong, nonatomic) UITableView *tableView;
@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) NSLayoutConstraint *bottomConstraint;
@property (assign, nonatomic) BOOL searchActive;
@property (assign, nonatomic) UIEdgeInsets scrollInsets;
@property (strong, nonatomic) NSLayoutConstraint *scrollViewHeightConstraint;
@property (copy, nonatomic) void (^onSearchItemSelect)(PlaceItem *);
@property (copy, nonatomic) BOOL(^searchItemFilter)(SearchItem *);

@end

static NSString * const kPlaceholderSearch = @"";

static NSString * const kWeRecommendCellId = @"weRecommendCellId";
static NSString * const kSearchCellId = @"searchCellId";
static const int kDataSourceOrigOffset = 1;
static const CGFloat kWeRecommendRowHeight = 72.0;
static const CGFloat kSearchRowHeight = 58.0;

@implementation SearchViewController

- (instancetype)initWithModel:(SearchModel *)model
                indexModel:(IndexModel *)indexModel
                locationModel:(LocationModel *)locationModel
                     mapModel:(MapModel *)mapModel
                   apiService:(ApiService *)apiService
              coreDataService:(CoreDataService *)coreDataService
          itemsWithCoordsOnly:(BOOL)itemsWithCoordsOnly
           onSearchItemSelect:(void(^)(PlaceItem *))onSearchItemSelect
{
    self = [super init];
    if (self) {
        _model = model;
        _indexModel = indexModel;
        _locationModel = locationModel;
        _mapModel = mapModel;
        _apiService = apiService;
        _onSearchItemSelect = onSearchItemSelect;
        if (itemsWithCoordsOnly) {
          __weak typeof(self) weakSelf = self;
          _searchItemFilter = ^BOOL(SearchItem *searchItem){
              PlaceItem *item = weakSelf.indexModel.flatItems[searchItem.correspondingPlaceItemUUID];
              return item.coords.latitude != kCLLocationCoordinate2DInvalid.latitude &&
                item.coords.longitude != kCLLocationCoordinate2DInvalid.longitude;
          };
        } else {
          _searchItemFilter = ^BOOL(SearchItem *searchItem){
              return YES;
          };
        }
    }
    return self;
}

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
  self.tableView.backgroundColor = [Colors get].background;
  self.scrollView.backgroundColor = [Colors get].background;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.dataSourceHistory = [[NSMutableArray alloc] init];
    self.dataSourceFiltered = [[NSMutableArray alloc] init];
    
    self.scrollInsets = UIEdgeInsetsZero;
    [self setUpWithTable];
    
    if (@available(iOS 13.0, *)) {
        self.searchController = [[UISearchController alloc] initWithSearchResultsController:nil];
    } else {
        self.searchController = [[UISearchControllerNoCancel alloc] initWithSearchResultsController:nil];
    }
    self.searchController.searchResultsUpdater = self;
    self.searchController.obscuresBackgroundDuringPresentation = NO;
    self.searchController.hidesNavigationBarDuringPresentation = NO;
    self.searchController.searchBar.placeholder = kPlaceholderSearch;
    self.searchController.searchBar.keyboardAppearance = UIKeyboardAppearanceDefault;
    self.searchController.searchBar.delegate = self;
    if (@available(iOS 13.0, *)) {
        self.searchController.automaticallyShowsCancelButton = NO;
    }
    self.navigationItem.titleView = self.searchController.searchBar;
    self.definesPresentationContext = YES;
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onKeyboadAppear:) name:UIKeyboardDidShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onKeyboadDisappear:) name:UIKeyboardDidHideNotification object:nil];
}

- (void)updateViews {
    if ([self isSearching]) {
        if ([self.dataSourceFiltered count] > 0) {
            [self setUpWithTable];
            return;
        }
        [self setUpWithNoDataPlaceholder];
        return;
    }
    [self setUpWithTable];
}


- (void)setUpWithTable {
    [self.scrollView removeFromSuperview];
    self.scrollView = nil;
    if (self.tableView != nil) {
        [self.tableView reloadData];
        return;
    }
    
    self.tableView = [[UITableView alloc] init];
    [self.view addSubview:self.tableView];
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    self.tableView.alwaysBounceVertical = YES;
    self.tableView.rowHeight = UITableViewAutomaticDimension;
    [self.tableView registerClass:[WeRecommendCell class] forCellReuseIdentifier:kWeRecommendCellId];
    [self.tableView registerClass:[SearchCell class] forCellReuseIdentifier:kSearchCellId];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    self.tableView.translatesAutoresizingMaskIntoConstraints = NO;
    self.bottomConstraint = [self.tableView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor];
    [NSLayoutConstraint activateConstraints:@[
        [self.tableView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
        [self.tableView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.tableView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        self.bottomConstraint,
    ]];
    [self.tableView reloadData];
    [self updateInsets:self.scrollInsets];
}

- (void)setUpWithNoDataPlaceholder {
    [self.tableView removeFromSuperview];
    self.tableView = nil;
    if (self.scrollView != nil) {
        return;
    }
    
    self.scrollView = [[UIScrollView alloc] init];
    [self.view addSubview:self.scrollView];
    self.scrollView.alwaysBounceVertical = YES;
    self.scrollView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.scrollView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
        [self.scrollView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.scrollView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        [self.scrollView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor]
    ]];
    
    UIView *contentView = [[UIView alloc] init];
    [self.scrollView addSubview:contentView];
    contentView.translatesAutoresizingMaskIntoConstraints = NO;
    self.scrollViewHeightConstraint = [contentView.heightAnchor constraintEqualToAnchor:self.scrollView.heightAnchor];
    [NSLayoutConstraint activateConstraints:@[
        [contentView.topAnchor constraintEqualToAnchor:self.scrollView.topAnchor],
        [contentView.bottomAnchor constraintEqualToAnchor:self.scrollView.bottomAnchor],
        [contentView.widthAnchor constraintEqualToAnchor:self.scrollView.widthAnchor],
        self.scrollViewHeightConstraint,
    ]];
    
    UIStackView *stackView = [[UIStackView alloc] init];
    [contentView addSubview:stackView];
    stackView.translatesAutoresizingMaskIntoConstraints = NO;
    stackView.distribution = UIStackViewDistributionFill;
    stackView.alignment = UIStackViewAlignmentCenter;
    stackView.axis = UILayoutConstraintAxisVertical;
    stackView.spacing = 14.0;
    stackView.translatesAutoresizingMaskIntoConstraints = NO;
    
    UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"search"]];
    imageView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [imageView.widthAnchor constraintEqualToConstant:48.0],
        [imageView.heightAnchor constraintEqualToConstant:48.0],
    ]];
    UILabel *label = [[UILabel alloc] init];
    label.translatesAutoresizingMaskIntoConstraints = NO;
    [label setAttributedText:[[Typography get] makeBody:@"К сожалению, по вашему запросу ничего не найдено"]];
    [label setTextAlignment:NSTextAlignmentCenter];
    label.numberOfLines = 2;
    
    [stackView addArrangedSubview:imageView];
    [stackView addArrangedSubview:label];
    [NSLayoutConstraint activateConstraints:@[
        [stackView.centerYAnchor constraintEqualToAnchor:contentView.centerYAnchor],
        [stackView.heightAnchor constraintLessThanOrEqualToConstant:100.0],
        [stackView.widthAnchor constraintLessThanOrEqualToConstant:262.0],
        [stackView.leadingAnchor constraintEqualToAnchor:contentView.leadingAnchor],
        [stackView.trailingAnchor constraintEqualToAnchor:contentView.trailingAnchor],
    ]];
    [self updateInsets:self.scrollInsets];
}

- (void)updateInsets:(UIEdgeInsets)insets {
    self.tableView.contentInset = insets;
    self.tableView.scrollIndicatorInsets = insets;
    self.scrollView.contentInset = insets;
    self.scrollView.scrollIndicatorInsets = insets;
    self.scrollInsets = insets;
    self.scrollViewHeightConstraint.constant = -insets.bottom;
    [self.view layoutIfNeeded];
}

#pragma mark - Lifecycle
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self.model addObserver:self];
    [self.model loadSearchHistoryItems];
    
    [self.navigationController.view setNeedsLayout];
    [self.navigationController.view layoutIfNeeded];
    
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [self.searchController.searchBar performSelector:@selector(becomeFirstResponder)
                                          withObject:nil afterDelay:0];
    
}

// This fixes situation when next view in the navigation stack doesn't adapt to
// navigation bar of variable height. https://stackoverflow.com/a/47976999
- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    [self.navigationController.view setNeedsLayout];
    [self.navigationController.view layoutIfNeeded];
    [self.searchController.searchBar resignFirstResponder];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [self.searchController setActive:NO];
    [self.model removeObserver:self];
    if (self.itemToSaveToHistory) {
        [self.model addSearchHistoryItem:self.itemToSaveToHistory];
        self.itemToSaveToHistory = nil;
    }
    [NSNotificationCenter.defaultCenter removeObserver:self name:UIKeyboardDidShowNotification object:self];
    [NSNotificationCenter.defaultCenter removeObserver:self name:UIKeyboardWillHideNotification object:self];
}

- (void)onKeyboadAppear:(NSNotification *)notification {
    NSDictionary *userInfo = [notification userInfo];
    CGSize size = [[userInfo objectForKey:UIKeyboardFrameEndUserInfoKey] CGRectValue].size;
    UIEdgeInsets insets = UIEdgeInsetsMake(0, 0, size.height - self.tabBarController.tabBar.frame.size.height, 0);
    [self updateInsets:insets];
}

- (void)onKeyboadDisappear:(NSNotification *)notification {
    UIEdgeInsets insets = UIEdgeInsetsZero;
    [self updateInsets:insets];
}

#pragma mark - SearchModel
- (void)onSearchHistoryItemsUpdate:(NSArray<SearchItem *> *)searchHistoryItems {
    if (![self isSearching]) {
        [self updateViews];
    }
}

- (void)onSearchItemsUpdate:(nonnull NSArray<SearchItem *> *)searchItems {
    [self updateViews];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if ([self isSearching]) {
        return [self.dataSourceFiltered count];
    }
    NSUInteger searchHistoryItemsCount = [[self.model searchHistoryItemsWithFilter:self.searchItemFilter] count];
    if (searchHistoryItemsCount > 0) {
        return searchHistoryItemsCount + kDataSourceOrigOffset;
    }
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSArray<SearchItem *> *searchHistoryItems = [self.model searchHistoryItemsWithFilter:self.searchItemFilter];
    NSUInteger searchHistoryItemsCount = [searchHistoryItems count];
    if (indexPath.row == 0 && ![self isSearching] && searchHistoryItemsCount > 0) {
        WeRecommendCell *cell = [self.tableView dequeueReusableCellWithIdentifier:kWeRecommendCellId];
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        cell.userInteractionEnabled = NO;
        return cell;
    }
    SearchCell *cell = [self.tableView dequeueReusableCellWithIdentifier:kSearchCellId];
    SearchItem *item;
    SearchCellConfiguration *cellConfiguration;
    if ([self isSearching]) {
        item = self.dataSourceFiltered[indexPath.row];
        cellConfiguration = [self mapSearchCellConfigurationFromSearchItem:item];
        [cell update:cellConfiguration];
        return cell;
    }
    if (searchHistoryItemsCount) {
        item = searchHistoryItems[indexPath.row - kDataSourceOrigOffset];
        cellConfiguration = [self mapSearchCellConfigurationFromSearchItem:item];
        [cell update:cellConfiguration];
        return cell;
    }
    return cell;
}

- (SearchCellConfiguration *)mapSearchCellConfigurationFromSearchItem:(SearchItem *)item {
    SearchCellConfiguration *cellConfiguration = [[SearchCellConfiguration alloc] init];
    PlaceItem *correspondingItem = self.indexModel.flatItems[item.correspondingPlaceItemUUID];
    cellConfiguration.title = correspondingItem.title;
    cellConfiguration.categoryTitle = correspondingItem.category.title;
    cellConfiguration.iconName = correspondingItem.category.icon;
    return cellConfiguration;
}

- (CGFloat)tableView:(UITableView *)tableView
estimatedHeightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 0 && ![self isSearching]) {
        return kWeRecommendRowHeight;
    }
    return kSearchRowHeight;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    PlaceItem *item;
    if ([self isSearching]) {
        SearchItem *searchItem = self.dataSourceFiltered[indexPath.row];
        item = self.indexModel.flatItems[searchItem.correspondingPlaceItemUUID];
        self.itemToSaveToHistory = searchItem;
        self.searchController.searchBar.text = @"";
    } else {
        SearchItem *searchItem =
        [self.model searchHistoryItemsWithFilter:self.searchItemFilter][indexPath.row - kDataSourceOrigOffset];
        self.itemToSaveToHistory = searchItem;
        item = self.indexModel.flatItems[searchItem.correspondingPlaceItemUUID];
    }
    self.onSearchItemSelect(item);
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    if (![self isSearching] && indexPath.row >= kDataSourceOrigOffset) {
        return YES;
    }
    return NO;
}

- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        if (![self isSearching] && indexPath.row >= kDataSourceOrigOffset) {
            SearchItem *searchItem = [self.model searchHistoryItemsWithFilter:self.searchItemFilter][indexPath.row -kDataSourceOrigOffset];
            [self.model removeSearchHistoryItem:searchItem];
            if ([[self.model searchHistoryItemsWithFilter:self.searchItemFilter] count] > 0) {
                [self.tableView deleteRowsAtIndexPaths:@[indexPath]
                                      withRowAnimation:UITableViewRowAnimationAutomatic];
                return;
            }
            [self.tableView deleteRowsAtIndexPaths:@[
                [NSIndexPath indexPathForRow:0 inSection:0], indexPath] withRowAnimation:UITableViewRowAnimationAutomatic];
        }
    }
}

#pragma mark - Search
- (void)updateSearchResultsForSearchController:(UISearchController *)searchController {
    NSString *search = searchController.searchBar.text;
    [self.dataSourceFiltered removeAllObjects];
    self.searchActive = searchController.isActive;
    if (!searchController.isActive) {
        [self updateViews];
        return;
    }
    for (SearchItem *item in [self.model searchItemsWithFilter:self.searchItemFilter]) {
        if ([[item searchableText] localizedCaseInsensitiveContainsString:search]) {
            [self.dataSourceFiltered addObject:item];
            continue;
        }
    }
    [self updateViews];
}

- (void)searchBarCancelButtonClicked:(UISearchBar *)searchBar {
    self.searchActive = NO;
    [self updateViews];
}

- (BOOL)isSearchBarEmpty {
    NSString *search = self.searchController.searchBar.text;
    return [search length] == 0;
}

- (BOOL)isSearching {
    return self.searchActive && self.searchController.isActive &&
    ![self isSearchBarEmpty];
}

@end
 
