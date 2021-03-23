//
//  MainContentViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "MainViewController.h"
#import "IndexViewController.h"
#import "MapViewController.h"
#import "BookmarksViewController.h"
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

@interface MainViewController ()

@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) UserDefaultsService *userDefaultsService;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSURLSession *session;


@end

@implementation MainViewController

- (instancetype)initWithUserDefaultsService:(UserDefaultsService *)userDefaultsService
{
  self = [super init];
  if (self) {
    _userDefaultsService = userDefaultsService;
  }
  return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    self.tabBar.tintColor = [Colors get].green;
    self.tabBar.barTintColor = [Colors get].white;

    self.view.backgroundColor = [Colors get].white;

    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    self.session = [NSURLSession sessionWithConfiguration:configuration];
    self.apiService = [[ApiService alloc] initWithSession:self.session];
    self.coreDataService = [[CoreDataService alloc] init];
    self.indexModel = [[IndexModel alloc] initWithApiService:self.apiService
                                             coreDataService:self.coreDataService
                                         userDefaultsService:self.userDefaultsService];
    DetailsModel *detailsModel = [[DetailsModel alloc] initWithIndexModel:self.indexModel apiService:self.apiService coreDataService:self.coreDataService];

    LocationModel *locationModel = [[LocationModel alloc] init];
    SearchModel *searchModel = [[SearchModel alloc]
                                initWithIndexModel:self.indexModel
                                locationModel:locationModel
                                coreDataService:self.coreDataService];
    MapModel *mapModel = [[MapModel alloc] initWithIndexModel:self.indexModel locationModel:locationModel];
    BookmarksGroupModel *bookmarksGroupsModel = [[BookmarksGroupModel alloc] initWithIndexModel:self.indexModel];

#pragma mark - IndexViewController

    IndexViewController *indexController = [[IndexViewController alloc]   initWithApiService:self.apiService model:self.indexModel searchModel:searchModel locationModel:locationModel mapModel:mapModel detailsModel:detailsModel coreDataService:self.coreDataService];
    indexController.title = @"Главная";
    UINavigationController *indexViewControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:indexController];
    UIImage *indexImage;
    UIImage *indexImageSelected;
    indexImage = [UIImage imageNamed:@"home"];
    indexImageSelected = [UIImage imageNamed:@"home-selected"];
    UITabBarItem *indexTabBarItem = createTabBarItem(@"Главная", 0, indexImage, indexImageSelected);
    
    indexViewControllerWithNavigation.tabBarItem = indexTabBarItem;

    indexViewControllerWithNavigation.navigationBar.barTintColor = [Colors get].green;
    indexViewControllerWithNavigation.navigationBar.titleTextAttributes =
    [Typography get].navigationSemiboldAttributes;

#pragma mark - MapViewController

    MapViewController *mapController = [[MapViewController alloc] initWithMapModel:mapModel
                                                                     locationModel:locationModel
                                                                        indexModel:self.indexModel
                                                                       searchModel:searchModel
                                                                        apiService:self.apiService
                                                                   coreDataService:self.coreDataService
                                                                           mapItem:nil];
    mapController.title = @"Карта";
    UINavigationController *mapControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:mapController];
    UIImage *mapImage;
    UIImage *mapImageSelected;
    mapImage = [UIImage imageNamed:@"map"];
    mapImageSelected = [UIImage imageNamed:@"map-selected"];
    UITabBarItem *mapTabBarItem = createTabBarItem(@"Карта", 0, mapImage, mapImageSelected);

    mapControllerWithNavigation.tabBarItem = mapTabBarItem;
    mapControllerWithNavigation.navigationBar.barTintColor = [Colors get].green;
    mapControllerWithNavigation.navigationBar.titleTextAttributes =
    [Typography get].navigationSemiboldAttributes;

#pragma mark - BookmarksViewController

    BookmarksViewController *bookmarksController =
    [[BookmarksViewController alloc] initWithModel:bookmarksGroupsModel
                                        indexModel:self.indexModel
                                        apiService:self.apiService
                                   coreDataService:self.coreDataService
                                          mapModel:mapModel
                                       searchModel:searchModel
                                     locationModel:locationModel];
    bookmarksController.title = @"Закладки";
    UINavigationController *bookmarksControllerWithNavigation = [[UINavigationController alloc ] initWithRootViewController:bookmarksController];
    UIImage *bookmarksImage;
    UIImage *bookmarksImageSelected;
    bookmarksImage = [UIImage imageNamed:@"bookmark"];
    bookmarksImageSelected = [UIImage imageNamed:@"bookmark-selected"];
    UITabBarItem *bookmarksTabBarItem = createTabBarItem(@"Закладки", 0, bookmarksImage, bookmarksImageSelected);

    bookmarksControllerWithNavigation.tabBarItem = bookmarksTabBarItem;
    bookmarksControllerWithNavigation.navigationBar.barTintColor = [Colors get].green;
    bookmarksControllerWithNavigation.navigationBar.titleTextAttributes =
    [Typography get].navigationSemiboldAttributes;

    self.viewControllers = @[indexViewControllerWithNavigation, mapControllerWithNavigation, bookmarksControllerWithNavigation];

    self.selectedIndex = 0;
}

UITabBarItem* createTabBarItem(NSString *title, NSUInteger tag, UIImage *image, UIImage *imageSelected) {
    UITabBarItem *bookmarksTabBarItem = [[UITabBarItem alloc] initWithTitle:title image:image tag:tag];
    [bookmarksTabBarItem setTitleTextAttributes:[Typography get].tabBarSelectedAttributes
                                       forState:UIControlStateSelected];
    [bookmarksTabBarItem setTitleTextAttributes:[Typography get].tabBarAttributes
                                       forState:UIControlStateNormal];
    bookmarksTabBarItem.selectedImage = imageSelected;
    return bookmarksTabBarItem;
}

- (void)loadCategories {
    [self.indexModel loadCategories];
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
