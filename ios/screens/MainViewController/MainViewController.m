//
//  MainContentViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "MainViewController.h"
#import "IndexViewController.h"
#import "FullMapViewController.h"
#import "BookmarksViewController.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "ApiService.h"
#import "IndexModel.h"
#import "DetailsModel.h"
#import "SearchModel.h"
#import "MapModel.h"
#import "BookmarksGroupModel.h"
#import "LocationModel.h"
#import "CoreDataService.h"
#import "Typography.h"
#import "UserDefaultsService.h"
#import "BottomSheetView.h"
#import "BottomSheetViewDetailedMap.h"
#import "MapService.h"
#import "MainViewControllerConstants.h"
#import "AnalyticsEvents.h"
#import "StyleUtils.h"

@interface MainViewController ()

@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSURLSession *session;
@property (strong, nonatomic) UIViewController *previousViewController;

@property (strong, nonatomic) UITabBarItem *indexTabBarItem;
@property (strong, nonatomic) UITabBarItem *mapTabBarItem;
@property (strong, nonatomic) UITabBarItem *bookmarksTabBarItem;
@property (strong, nonatomic) UINavigationController *indexViewControllerWithNavigation;
@property (strong, nonatomic) UINavigationController *mapControllerWithNavigation;
@property (strong, nonatomic) UINavigationController *bookmarksControllerWithNavigation;

@end

@implementation MainViewController

- (void)viewWillLayoutSubviews {
  
  configureTabBar(self.tabBar);
  
  self.view.backgroundColor = [Colors get].background;
  
  configureTabBarItem(self.indexTabBarItem, [UIImage imageNamed:@"home"],
                      [UIImage imageNamed:@"home-selected"]);
  configureTabBarItem(self.mapTabBarItem, [UIImage imageNamed:@"map"],
                      [UIImage imageNamed:@"map-selected"]);
  configureTabBarItem(self.bookmarksTabBarItem, [UIImage imageNamed:@"bookmark"],
                      [UIImage imageNamed:@"bookmark-selected"]);
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.delegate = self;

    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    UserDefaultsService *userDefaultsService = [UserDefaultsService get];
    self.session = [NSURLSession sessionWithConfiguration:configuration];
    self.apiService = [[ApiService alloc] initWithSession:self.session];
    self.mapService = [[MapService alloc] initWithSession:self.session];
    self.coreDataService = [[CoreDataService alloc] init];
    self.indexModel = [[IndexModel alloc] initWithApiService:self.apiService
                                             coreDataService:self.coreDataService
                                         userDefaultsService:userDefaultsService];
    DetailsModel *detailsModel = [[DetailsModel alloc] initWithIndexModel:self.indexModel apiService:self.apiService coreDataService:self.coreDataService];

    LocationModel *locationModel = [[LocationModel alloc] init];
    SearchModel *searchModel = [[SearchModel alloc]
                                initWithIndexModel:self.indexModel
                                locationModel:locationModel
                                coreDataService:self.coreDataService];
    MapModel *mapModel = [[MapModel alloc] initWithIndexModel:self.indexModel locationModel:locationModel];
    BookmarksGroupModel *bookmarksGroupsModel = [[BookmarksGroupModel alloc] initWithIndexModel:self.indexModel];

#pragma mark - IndexViewController

    IndexViewController *indexController = [[IndexViewController alloc] initWithApiService:self.apiService model:self.indexModel searchModel:searchModel locationModel:locationModel mapModel:mapModel  detailsModel:detailsModel coreDataService:self.coreDataService mapService:self.mapService];
    indexController.title = NSLocalizedString(@"IndexTitle", @"");
    self.indexViewControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:indexController];
    UIImage *indexImage;
    UIImage *indexImageSelected;
    indexImage = [UIImage imageNamed:@"home"];
    indexImageSelected = [UIImage imageNamed:@"home-selected"];
    self.indexTabBarItem = createTabBarItem(NSLocalizedString(@"TabBarMain", @""), 0, indexImage, indexImageSelected);

    self.indexViewControllerWithNavigation.tabBarItem = self.indexTabBarItem;

    self.indexViewControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    self.indexViewControllerWithNavigation.navigationBar.titleTextAttributes =
    [Typography get].navigationSemiboldAttributes;

#pragma mark - MapViewController

  FullMapViewController *mapController =
  [[FullMapViewController alloc] initWithMapModel:mapModel
                                    locationModel:locationModel
                                       indexModel:self.indexModel
                                      searchModel:searchModel
                                       apiService:self.apiService
                                  coreDataService:self.coreDataService
                                       mapService:self.mapService
                                          mapItem:nil];
    mapController.title = NSLocalizedString(@"MapTitle", @"");
    self.mapControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:mapController];
    UIImage *mapImage;
    UIImage *mapImageSelected;
    mapImage = [UIImage imageNamed:@"map"];
    mapImageSelected = [UIImage imageNamed:@"map-selected"];
    self.mapTabBarItem = createTabBarItem(NSLocalizedString(@"TabBarMap", @""), 0, mapImage, mapImageSelected);

    self.mapControllerWithNavigation.tabBarItem = self.mapTabBarItem;
    self.mapControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    self.mapControllerWithNavigation.navigationBar.titleTextAttributes =
    [Typography get].navigationSemiboldAttributes;

#pragma mark - BookmarksViewController

    BookmarksViewController *bookmarksController =
    [[BookmarksViewController alloc] initWithModel:bookmarksGroupsModel
                                        indexModel:self.indexModel
                                        apiService:self.apiService
                                   coreDataService:self.coreDataService
                                        mapService:self.mapService
                                          mapModel:mapModel
                                       searchModel:searchModel
                                     locationModel:locationModel];
    bookmarksController.title = NSLocalizedString(@"SavedTitle", @"");
    self.bookmarksControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:bookmarksController];
    UIImage *bookmarksImage;
    UIImage *bookmarksImageSelected;
    bookmarksImage = [UIImage imageNamed:@"bookmark"];
    bookmarksImageSelected = [UIImage imageNamed:@"bookmark-selected"];
    self.bookmarksTabBarItem = createTabBarItem(NSLocalizedString(@"TabBarSaved", @""), 0, bookmarksImage, bookmarksImageSelected);

    self.bookmarksControllerWithNavigation.tabBarItem = self.bookmarksTabBarItem;
    self.bookmarksControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    self.bookmarksControllerWithNavigation.navigationBar.titleTextAttributes =
    [Typography get].navigationSemiboldAttributes;

    self.viewControllers = @[self.indexViewControllerWithNavigation, self.mapControllerWithNavigation, self.bookmarksControllerWithNavigation];

    self.selectedIndex = 0;
}

UITabBarItem* createTabBarItem(NSString *title, NSUInteger tag, UIImage *image, UIImage *imageSelected) {
    UITabBarItem *tabBarItem = [[UITabBarItem alloc] initWithTitle:title image:image tag:tag];
    [tabBarItem setTitleTextAttributes:[Typography get].tabBarSelectedAttributes
                                       forState:UIControlStateSelected];
    [tabBarItem setTitleTextAttributes:[Typography get].tabBarAttributes
                                       forState:UIControlStateNormal];
    tabBarItem.selectedImage = imageSelected;
    return tabBarItem;
}

- (void)loadCategories {
    [self.indexModel loadCategories];
}

- (void)tabBarController:(UITabBarController *)tabBarController
 didSelectViewController:(UIViewController *)viewController {
  if ([viewController isKindOfClass:UINavigationController.class]) {
    UINavigationController *navigationController = (UINavigationController *) viewController;
    UIViewController *topController = navigationController.viewControllers.lastObject;
    if (self.previousViewController == topController) {
      if ([topController respondsToSelector:@selector(scrollToTop)]) {
        [topController performSelector:@selector(scrollToTop)];
      }
    }
    self.previousViewController = topController;
    if (viewController == self.indexViewControllerWithNavigation) {
      [[AnalyticsEvents get] logEvent:AnalyticsEventsNaviMain];
      return;
    }
    if (viewController == self.mapControllerWithNavigation) {
      [[AnalyticsEvents get] logEvent:AnalyticsEventsNaviMap];
      return;
    }
    if (viewController == self.bookmarksControllerWithNavigation) {
      [[AnalyticsEvents get] logEvent:AnalyticsEventsNaviBookmarks];
      return;
    }
  }
}

- (BottomSheetView *)addBottomSheet:(MainViewControllerBottomSheet)sheetType
                             onShow:(void(^_Nonnull)(BOOL, NSString *))onShow {
  if (self.bottomSheets[@(sheetType)] != nil) {
    return self.bottomSheets[@(sheetType)];
  }
  BottomSheetView *bottomSheet = sheetType == MainViewControllerBottomSheetDetailsMap ?
    [[BottomSheetViewDetailedMap alloc] init] :
    [[BottomSheetView alloc] init];
  bottomSheet.onShow = onShow;
  [self.view addSubview:bottomSheet];
  NSLayoutConstraint *topAnchor = [bottomSheet.topAnchor constraintEqualToAnchor:self.view.bottomAnchor];
  bottomSheet.top = topAnchor;
  [NSLayoutConstraint activateConstraints:@[
    topAnchor,
    [bottomSheet.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
    [bottomSheet.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
  ]];
  self.bottomSheets[@(sheetType)] = bottomSheet;
  return bottomSheet;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
