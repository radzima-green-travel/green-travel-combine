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
#import "GraphQLApiService.h"
#import "ApiServiceIndexFile.h"
#import "IndexModel.h"
#import "DetailsModel.h"
#import "SearchModel.h"
#import "MapModel.h"
#import "BookmarksGroupModel.h"
#import "LocationModel.h"
#import "UserModel.h"
#import "CoreDataService.h"
#import "TypographyLegacy.h"
#import "UserDefaultsService.h"
#import "BottomSheetView.h"
#import "BottomSheetViewDetailedMap.h"
#import "MapService.h"
#import "MainViewControllerConstants.h"
#import "AnalyticsEvents.h"
#import "StyleUtils.h"
#import "MapViewControllerConstants.h"
#import "ProfileRootViewController.h"
#import "ProfileTableViewController.h"
#import "LoginViewController.h"
#import "UserController.h"
#import "AmplifyBridge.h"
#import "AuthService.h"
#import "AccessibilityIdentifiers.h"
#import "AccessibilityUtils.h"

#if PROD
static BOOL kSignUpEnabled = NO;
#else
static BOOL kSignUpEnabled = YES;
#endif

@interface MainViewController ()

@property (strong, nonatomic) id<IndexLoader> apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSURLSession *session;
@property (strong, nonatomic) UIViewController *previousViewController;
@property (strong, nonatomic) UITabBarItem *indexTabBarItem;
@property (strong, nonatomic) UITabBarItem *mapTabBarItem;
@property (strong, nonatomic) UITabBarItem *bookmarksTabBarItem;
@property (strong, nonatomic) UITabBarItem *profileTabBarItem;
@property (strong, nonatomic) UINavigationController *indexViewControllerWithNavigation;
@property (strong, nonatomic) UINavigationController *mapControllerWithNavigation;
@property (strong, nonatomic) UINavigationController *bookmarksControllerWithNavigation;
@property (strong, nonatomic) ProfileTableViewController *profileRootController;

@end

@implementation MainViewController

- (void)viewWillLayoutSubviews {

  configureTabBar(self.tabBar);

  self.view.backgroundColor = [Colors get].background;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.delegate = self;

    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    UserDefaultsService *userDefaultsService = [UserDefaultsService get];
    self.session = [NSURLSession sessionWithConfiguration:configuration];
    self.apiService = [[ApiServiceIndexFile alloc] initWithSession:self.session];
    self.mapService = [[MapService alloc] initWithSession:self.session];
    self.coreDataService = [[CoreDataService alloc] init];
    self.indexModel = [[IndexModel alloc] initWithApiService:self.apiService
                                             coreDataService:self.coreDataService
                                         userDefaultsService:userDefaultsService];
    DetailsModel *detailsModel = [[DetailsModel alloc] initWithIndexModel:self.indexModel
                                                               apiService:self.apiService
                                                          coreDataService:self.coreDataService];

    LocationModel *locationModel = [[LocationModel alloc] init];
    SearchModel *searchModel = [[SearchModel alloc]
                                initWithIndexModel:self.indexModel
                                locationModel:locationModel
                                coreDataService:self.coreDataService];
    MapModel *mapModel = [[MapModel alloc] initWithIndexModel:self.indexModel locationModel:locationModel];
    BookmarksGroupModel *bookmarksGroupsModel = [[BookmarksGroupModel alloc] initWithIndexModel:self.indexModel];
    AmplifyBridge *bridge = [AmplifyBridge new];
    AuthService *authService = [[AuthService alloc] initWithAmplifyBridge:bridge];
    UserModel *userModel = [[UserModel alloc] init];
    UserController *userController = [[UserController alloc] initWithModel:userModel authService:authService];

		if (kSignUpEnabled) {
			dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
				[bridge initialize];
				[userController fetchCurrentAuthSession];
			});
    }

#pragma mark - IndexViewController

    IndexViewController *indexController = [[IndexViewController alloc] initWithApiService:self.apiService model:self.indexModel searchModel:searchModel locationModel:locationModel mapModel:mapModel detailsModel:detailsModel coreDataService:self.coreDataService mapService:self.mapService];
    indexController.title = NSLocalizedString(@"IndexTitle", @"");
    self.indexViewControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:indexController];
    UIImage *indexImage;
    indexImage = [UIImage imageNamed:@"home"];
    self.indexTabBarItem = createTabBarItem(NSLocalizedString(@"TabBarMain", @""), 0, indexImage,
                                            AccessibilityIdentifiersTabBarMain);

    self.indexViewControllerWithNavigation.tabBarItem = self.indexTabBarItem;

    self.indexViewControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    self.indexViewControllerWithNavigation.navigationBar.titleTextAttributes =
    [TypographyLegacy get].navigationSemiboldAttributes;

#pragma mark - MapViewController

  FullMapViewController *mapController =
  [[FullMapViewController alloc] initWithMapModel:mapModel
                                    locationModel:locationModel
                                       indexModel:self.indexModel
                                      searchModel:searchModel
                                     detailsModel:detailsModel
                                       apiService:self.apiService
                                  coreDataService:self.coreDataService
                                       mapService:self.mapService
                                          mapItem:nil];
    mapController.title = NSLocalizedString(@"MapTitle", @"");
    self.mapControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:mapController];
    UIImage *mapImage;
    mapImage = [UIImage imageNamed:@"map"];
    self.mapTabBarItem = createTabBarItem(NSLocalizedString(@"TabBarMap", @""), 0, mapImage,
                                          AccessibilityIdentifiersTabBarMap);

    self.mapControllerWithNavigation.tabBarItem = self.mapTabBarItem;
    self.mapControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    self.mapControllerWithNavigation.navigationBar.titleTextAttributes =
    [TypographyLegacy get].navigationSemiboldAttributes;

#pragma mark - BookmarksViewController

    BookmarksViewController *bookmarksController =
    [[BookmarksViewController alloc] initWithModel:bookmarksGroupsModel
                                        indexModel:self.indexModel
                                        apiService:self.apiService
                                   coreDataService:self.coreDataService
                                        mapService:self.mapService
                                          mapModel:mapModel
                                       searchModel:searchModel
                                       detailsModel:detailsModel
                                     locationModel:locationModel];
    bookmarksController.title = NSLocalizedString(@"SavedTitle", @"");
    self.bookmarksControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:bookmarksController];
    UIImage *bookmarksImage;
    bookmarksImage = [UIImage imageNamed:@"bookmark-index"];
    self.bookmarksTabBarItem = createTabBarItem(NSLocalizedString(@"TabBarSaved", @""), 0, bookmarksImage,
                                                AccessibilityIdentifiersTabBarFavorites);
    self.bookmarksControllerWithNavigation.tabBarItem = self.bookmarksTabBarItem;
    self.bookmarksControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    self.bookmarksControllerWithNavigation.navigationBar.titleTextAttributes =
    [TypographyLegacy get].navigationSemiboldAttributes;

#pragma mark - ProfileRootViewController
  self.profileRootController =
  [[ProfileTableViewController alloc] initWithController:userController model:userModel];

  UIImage *profileImage;
  profileImage = [UIImage imageNamed:@"user"];
  self.profileTabBarItem = createTabBarItem(NSLocalizedString(@"TabBarProfile", @""), 0, profileImage,
                                            AccessibilityIdentifiersTabBarProfile);

  self.profileRootController.tabBarItem = self.profileTabBarItem;

  if (kSignUpEnabled) {
    self.viewControllers = @[self.indexViewControllerWithNavigation, self.mapControllerWithNavigation,
                             self.bookmarksControllerWithNavigation, self.profileRootController];
  } else {
    self.viewControllers = @[self.indexViewControllerWithNavigation, self.mapControllerWithNavigation,
                             self.bookmarksControllerWithNavigation];
  }

  self.selectedIndex = 0;

  self.bottomSheets = [[NSMutableDictionary<NSNumber *, BottomSheetView *> alloc] init];

  [NSNotificationCenter.defaultCenter addObserver:self
                                         selector:@selector(onLocaleChange:) name:NSCurrentLocaleDidChangeNotification object:nil];
}

#pragma mark - viewWillAppear
- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  populateWithAccessibilityIDs(self.tabBar);
}

UITabBarItem* createTabBarItem(NSString *title, NSUInteger tag, UIImage *image,
                               const NSString * _Nonnull accessibilityIdentifier) {
    UITabBarItem *tabBarItem = [[UITabBarItem alloc] initWithTitle:title image:image tag:tag];
    [tabBarItem setTitleTextAttributes:[TypographyLegacy get].tabBarSelectedAttributes
                                       forState:UIControlStateSelected];
    [tabBarItem setTitleTextAttributes:[TypographyLegacy get].tabBarAttributes
                                       forState:UIControlStateNormal];
    [tabBarItem setAccessibilityIdentifier:accessibilityIdentifier];
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

    [self.bottomSheets enumerateKeysAndObjectsUsingBlock:^(NSNumber * _Nonnull key,
                                                           BottomSheetView * _Nonnull bv,
                                                           BOOL * _Nonnull stop) {
      [bv setActive:NO];
    }];

    if (viewController == self.indexViewControllerWithNavigation) {
      [self.bottomSheets[@(MainViewControllerBottomSheetIndexDetailsMap)] setActive:YES];
      self.activeBottomSheetTypeByTab = MainViewControllerBottomSheetIndexDetailsMap;
      [[AnalyticsEvents get] logEvent:AnalyticsEventsNaviMain];
      return;
    }
    if (viewController == self.mapControllerWithNavigation) {
      // We may have 2 bottom sheets for Map tab.
      [self.bottomSheets[@(MainViewControllerBottomSheetFullMap)] setActive:YES];
      [self.bottomSheets[@(MainViewControllerBottomSheetFullMapDetailsMap)] setActive:YES];
      self.activeBottomSheetTypeByTab = MainViewControllerBottomSheetFullMap;
      [[AnalyticsEvents get] logEvent:AnalyticsEventsNaviMap];
      return;
    }
    if (viewController == self.bookmarksControllerWithNavigation) {
      [self.bottomSheets[@(MainViewControllerBottomSheetBookmarksDetailsMap)] setActive:YES];
      self.activeBottomSheetTypeByTab = MainViewControllerBottomSheetBookmarksDetailsMap;
      [[AnalyticsEvents get] logEvent:AnalyticsEventsNaviBookmarks];
      return;
    }
  }
}

- (BottomSheetView *)addBottomSheet:(MapViewControllerType)controllerType
                             onShow:(void(^_Nonnull)(BOOL, NSString *))onShow {
  MainViewControllerBottomSheet sheetType =
  [self bottomSheetTypeBaseOn:controllerType
                  bottomSheetTypeByTab:self.activeBottomSheetTypeByTab];
  if (self.bottomSheets[@(sheetType)] != nil) {
    return self.bottomSheets[@(sheetType)];
  }
  BottomSheetView *bottomSheet = controllerType == MapViewControllerTypeDetails ?
    [[BottomSheetViewDetailedMap alloc] init] :
    [[BottomSheetView alloc] init];
  bottomSheet.onShow = onShow;
  bottomSheet.active = YES;
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

- (MainViewControllerBottomSheet)bottomSheetTypeBaseOn:(MapViewControllerType)controllerType
                                 bottomSheetTypeByTab:(MainViewControllerBottomSheet)bottomSheetTypeByTab {
  switch (bottomSheetTypeByTab) {
    case MainViewControllerBottomSheetIndexDetailsMap:
      return MainViewControllerBottomSheetIndexDetailsMap;
    case MainViewControllerBottomSheetBookmarksDetailsMap:
      return MainViewControllerBottomSheetBookmarksDetailsMap;
    case MainViewControllerBottomSheetFullMap:
      if (controllerType == MapViewControllerTypeFull) {
        return MainViewControllerBottomSheetFullMap;
      }
      if (controllerType == MapViewControllerTypeDetails) {
        return MainViewControllerBottomSheetFullMapDetailsMap;
      }
    default:
      return MainViewControllerBottomSheetNone;
  }
}

- (void)onLocaleChange:(id)sender {
  NSLog(@"Locale update");
  //[self.indexModel loadCategories];
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
