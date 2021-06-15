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
#import "MapService.h"

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

@end

@implementation MainViewController

- (void)viewWillLayoutSubviews {
  self.tabBar.tintColor = [Colors get].tabBarTint;
  
  self.tabBar.barTintColor = [Colors get].tabBarBackground;
  self.tabBar.translucent = NO;
  self.view.backgroundColor = [Colors get].background;
  
  [self.indexTabBarItem setImage:[UIImage imageNamed:@"home"]];
  [self.indexTabBarItem setSelectedImage:[UIImage imageNamed:@"home-selected"]];
  [self.indexTabBarItem setTitleTextAttributes:[Typography get].tabBarSelectedAttributes
                                     forState:UIControlStateSelected];
  [self.indexTabBarItem setTitleTextAttributes:[Typography get].tabBarAttributes
                                     forState:UIControlStateNormal];
  [self.mapTabBarItem setImage:[UIImage imageNamed:@"map"]];
  [self.mapTabBarItem setSelectedImage:[UIImage imageNamed:@"map-selected"]];
  [self.mapTabBarItem setTitleTextAttributes:[Typography get].tabBarSelectedAttributes
                                     forState:UIControlStateSelected];
  [self.mapTabBarItem setTitleTextAttributes:[Typography get].tabBarAttributes
                                     forState:UIControlStateNormal];
  [self.bookmarksTabBarItem setImage:[UIImage imageNamed:@"bookmark"]];
  [self.bookmarksTabBarItem setSelectedImage:[UIImage imageNamed:@"bookmark-selected"]];
  [self.bookmarksTabBarItem setTitleTextAttributes:[Typography get].tabBarSelectedAttributes
                                     forState:UIControlStateSelected];
  [self.bookmarksTabBarItem setTitleTextAttributes:[Typography get].tabBarAttributes
                                     forState:UIControlStateNormal];
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
    indexController.title = @"Главная";
    UINavigationController *indexViewControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:indexController];
    UIImage *indexImage;
    UIImage *indexImageSelected;
    indexImage = [UIImage imageNamed:@"home"];
    indexImageSelected = [UIImage imageNamed:@"home-selected"];
    self.indexTabBarItem = createTabBarItem(@"Главная", 0, indexImage, indexImageSelected);
  
    indexViewControllerWithNavigation.tabBarItem = self.indexTabBarItem;

    indexViewControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    indexViewControllerWithNavigation.navigationBar.titleTextAttributes =
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
    mapController.title = @"Карта";
    UINavigationController *mapControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:mapController];
    UIImage *mapImage;
    UIImage *mapImageSelected;
    mapImage = [UIImage imageNamed:@"map"];
    mapImageSelected = [UIImage imageNamed:@"map-selected"];
    self.mapTabBarItem = createTabBarItem(@"Карта", 0, mapImage, mapImageSelected);

    mapControllerWithNavigation.tabBarItem = self.mapTabBarItem;
    mapControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    mapControllerWithNavigation.navigationBar.titleTextAttributes =
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
    bookmarksController.title = @"Закладки";
    UINavigationController *bookmarksControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:bookmarksController];
    UIImage *bookmarksImage;
    UIImage *bookmarksImageSelected;
    bookmarksImage = [UIImage imageNamed:@"bookmark"];
    bookmarksImageSelected = [UIImage imageNamed:@"bookmark-selected"];
    self.bookmarksTabBarItem = createTabBarItem(@"Закладки", 0, bookmarksImage, bookmarksImageSelected);

    bookmarksControllerWithNavigation.tabBarItem = self.bookmarksTabBarItem;
    bookmarksControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
    bookmarksControllerWithNavigation.navigationBar.titleTextAttributes =
    [Typography get].navigationSemiboldAttributes;

    self.viewControllers = @[indexViewControllerWithNavigation, mapControllerWithNavigation, bookmarksControllerWithNavigation];

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
  }
}

- (BottomSheetView *)addBottomSheet {
  if (self.bottomSheet != nil) {
    return self.bottomSheet;
  }
  self.bottomSheet = [[BottomSheetView alloc] init];
  [self.view addSubview:self.bottomSheet];

  NSLayoutConstraint *topAnchor = [self.bottomSheet.topAnchor constraintEqualToAnchor:self.view.bottomAnchor];
  self.bottomSheet.top = topAnchor;
  [NSLayoutConstraint activateConstraints:@[
    topAnchor,
    [self.bottomSheet.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
    [self.bottomSheet.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
  ]];
  return self.bottomSheet; 
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
