//
//  ProfileTableViewControllerUtils.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 23.08.22.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ProfileTableViewController.h"
#import "ProfileTableViewControllerUtils.h"
#import "SettingsTableViewCellModel.h"
#import "LoginViewController.h"
#import "ProfileSection.h"
#import "UserModel.h"
#import "UIImage+extensions.h"
#import "BookmarksViewController.h"
#import "UserSettingsViewController.h"
#import "SocialLoginViewController.h"

NSMutableArray* configureBaseTableViewCells(ProfileTableViewController* controller) {
  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
                                          initWithTitle:NSLocalizedString(@"ProfileTableViewCellAuthMainTitle", @"")
                                          subTitle:NSLocalizedString(@"ProfileTableViewCellAuthSubTitle", @"")
                                          image:[UIImage imageNamed:@"accountPhoto"]
                                          handler:^{
    LoginViewController *loginViewController = [[LoginViewController alloc] initWithController:controller.userController model:controller.userModel];
    loginViewController.title = NSLocalizedString(@"LogInTitle", @"");
    
    SocialLoginViewController *socialLoginVC = [SocialLoginViewController alloc];
    UINavigationController *loginViewControllerWithNavigation = [[UINavigationController alloc] initWithRootViewController:socialLoginVC];
    if (@available(iOS 13.0, *)) {
      [loginViewControllerWithNavigation setModalInPresentation:YES];
    }
    [controller presentViewController:loginViewControllerWithNavigation animated:YES completion:^{}];
  }];
  
  SettingsTableViewCellModel *dataAndStorageCell = [[SettingsTableViewCellModel alloc]
                                                    initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelDataAndStorage", @"")
                                                    subTitle:@""
                                                    image:[UIImage imageNamed:@"dataAndStorage"]
                                                    handler:^{
    NSLog(@"DataAndStorageCell Tapped");
  }];
  
  SettingsTableViewCellModel *languageCell = [[SettingsTableViewCellModel alloc]
                                              initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelLanguage", @"")
                                              subTitle:NSLocale.currentLocale.languageCode
                                              image:[UIImage imageNamed:@"language"]
                                              handler:^{
    NSLog(@"LanguageCell Tapped");
  }];
  
  SettingsTableViewCellModel *themeCell = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelTheme", @"")
                                           subTitle:@"Light"
                                           image:[UIImage imageNamed:@"theme"]
                                           handler:^{
    NSLog(@"ThemeCell Tapped");
  }];
  
  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:dataAndStorageCell, languageCell, themeCell, nil];
  ProfileSection *authSection = [[ProfileSection alloc]
                                 initWithTitle:@""
                                 cellModels:[[NSMutableArray alloc]initWithObjects:authCell, nil]];
  
  ProfileSection *settingsSection = [[ProfileSection alloc]
                                     initWithTitle:NSLocalizedString(@"ProfileTableViewSettingsSection", @"")
                                     cellModels:settingCellModels];
  
  NSMutableArray *models = [[NSMutableArray alloc] initWithArray:@[authSection, settingsSection]];
  return models;
}

NSMutableArray* configureSignedInTableViewCells(ProfileTableViewController* controller, BOOL fetching) {
  
  NSString *userNameTitle = NSLocalizedString(@"ProfileTableViewCellSignedMainTitleLabel", @"");
  
  NSString *userNameSubTitle = [[NSString alloc] init];
  NSString *userImageText = [[NSString alloc] init];
  if (controller.userModel.email != nil) {
    userNameSubTitle = controller.userModel.email;
    userImageText = [userNameSubTitle substringToIndex:1];
  } else {
    userNameSubTitle = @"";
    userImageText = @"";
  }
  
  UIImage *userImage = [[UIImage alloc] getAccountImageWithChar:userImageText];
  
//  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
//                                          initWithTitle:userNameTitle
//                                          subTitle:userNameSubTitle
//                                          image:userImage
//                                          handler:^{
//    UserSettingsViewController *userSettingViewController = [[UserSettingsViewController alloc]
//                                                             initWithController:controller.userController
//                                                             model:controller.userModel];
//    userSettingViewController.bookmarksGroupModel = controller.bookmarksGroupModel;
//    userSettingViewController.indexModel = controller.indexModel;
//    userSettingViewController.apiService = controller.apiService;
//    userSettingViewController.coreDataService = controller.coreDataService;
//    userSettingViewController.mapService = controller.mapService;
//    userSettingViewController.mapModel = controller.mapModel;
//    userSettingViewController.searchModel = controller.searchModel;
//    userSettingViewController.detailsModel = controller.detailsModel;
//    userSettingViewController.locationModel = controller.locationModel;
//
//    [controller.navigationController pushViewController:userSettingViewController animated:YES];
//  }];
  
  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
                                          initWithTitle: userNameTitle
                                          subTitle: userNameSubTitle
                                          image: userImage
                                          fetchingInProgress: fetching
                                          signedIn:YES
                                          handler:^{
    UserSettingsViewController *userSettingViewController = [[UserSettingsViewController alloc]
                                                             initWithController:controller.userController
                                                             model:controller.userModel];
    userSettingViewController.bookmarksGroupModel = controller.bookmarksGroupModel;
    userSettingViewController.indexModel = controller.indexModel;
    userSettingViewController.apiService = controller.apiService;
    userSettingViewController.coreDataService = controller.coreDataService;
    userSettingViewController.mapService = controller.mapService;
    userSettingViewController.mapModel = controller.mapModel;
    userSettingViewController.searchModel = controller.searchModel;
    userSettingViewController.detailsModel = controller.detailsModel;
    userSettingViewController.locationModel = controller.locationModel;

    [controller.navigationController pushViewController:userSettingViewController animated:YES];
  }];
  
  NSUInteger bookmarksCount = (controller.bookmarksGroupModel.bookmarkItems.count);
  
  SettingsTableViewCellModel *bookmarkCell = [[SettingsTableViewCellModel alloc]
                                              initWithTitle:NSLocalizedString(@"ProfileTableViewCellBookmark", @"")
                                              subTitle:@(bookmarksCount).stringValue
                                              image:[UIImage imageNamed:@"bookmarkSettings"]
                                              handler:^{
    BookmarksViewController *bookmarksViewController = [[BookmarksViewController alloc]
                                                        initWithModel:controller.bookmarksGroupModel
                                                        indexModel:controller.indexModel
                                                        apiService:controller.apiService
                                                        coreDataService:controller.coreDataService
                                                        mapService:controller.mapService
                                                        mapModel:controller.mapModel
                                                        searchModel:controller.searchModel
                                                        detailsModel:controller.detailsModel
                                                        locationModel:controller.locationModel];
    
    [controller.navigationController pushViewController:bookmarksViewController animated:YES];
  }];
  
  SettingsTableViewCellModel *settingsCell = [[SettingsTableViewCellModel alloc]
                                              initWithTitle:NSLocalizedString(@"ProfileTableViewCellSettings", @"")
                                              subTitle:@""
                                              image:[UIImage imageNamed:@"settings"]
                                              handler:^{
    NSLog(@"SettingsCell tapped");
  }];
  
  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:bookmarkCell, settingsCell, nil];
  ProfileSection *authSection = [[ProfileSection alloc]
                                 initWithTitle:@""
                                 cellModels:[[NSMutableArray alloc]initWithObjects:authCell, nil]];
  
  ProfileSection *settingsSection = [[ProfileSection alloc]
                                     initWithTitle:@""
                                     cellModels:settingCellModels];
  
  NSMutableArray *models = [[NSMutableArray alloc] initWithArray:@[authSection, settingsSection]];
  return models;
}

NSMutableArray* configureTryToSignInTableViewCells(ProfileTableViewController *controller) {
  
  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
                                          initWithTitle:NSLocalizedString(@"ProfileTableViewCellTryToAuthMainTitle", @"")
                                          subTitle:NSLocalizedString(@"ProfileTableViewCellTryToAuthSubTitle", @"")
                                          image:[UIImage imageNamed:@"accountPhoto"]
                                          fetchingInProgress: YES
                                          signedIn:NO
                                          handler:^{
    NSLog(@"User Settings Tapped");
  }];
  
  SettingsTableViewCellModel *dataAndStorageCell = [[SettingsTableViewCellModel alloc]
                                                    initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelDataAndStorage", @"")
                                                    subTitle:@""
                                                    image:[UIImage imageNamed:@"dataAndStorage"]
                                                    handler:^{
    NSLog(@"DataAndStorageCell Tapped");
  }];
  
  SettingsTableViewCellModel *languageCell = [[SettingsTableViewCellModel alloc]
                                              initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelLanguage", @"")
                                              subTitle:NSLocale.currentLocale.languageCode
                                              image:[UIImage imageNamed:@"language"]
                                              handler:^{
    NSLog(@"LanguageCell Tapped");
  }];
  
  SettingsTableViewCellModel *themeCell = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelTheme", @"")
                                           subTitle:@"Light"
                                           image:[UIImage imageNamed:@"theme"]
                                           handler:^{
    NSLog(@"ThemeCell Tapped");
  }];
  
  
  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:dataAndStorageCell, languageCell, themeCell, nil];
  ProfileSection *authSection = [[ProfileSection alloc]
                                 initWithTitle:@""
                                 cellModels:[[NSMutableArray alloc]initWithObjects:authCell, nil]];
  
  ProfileSection *settingsSection = [[ProfileSection alloc]
                                     initWithTitle:NSLocalizedString(@"ProfileTableViewSettingsSection", @"")
                                     cellModels:settingCellModels];
  
  NSMutableArray *models = [[NSMutableArray alloc] initWithArray:@[authSection, settingsSection]];
  return models;
}
