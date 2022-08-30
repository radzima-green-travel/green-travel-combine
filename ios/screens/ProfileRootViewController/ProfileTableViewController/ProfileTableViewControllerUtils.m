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

NSMutableArray* configureBaseTableViewCells(ProfileTableViewController* controller) {
  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
                                          initWithTitle:NSLocalizedString(@"ProfileTableViewCellAuthMainTitle", @"")
                                          subTitle:NSLocalizedString(@"ProfileTableViewCellAuthSubTitle", @"")
                                          image:[UIImage imageNamed:@"accountPhoto"]
                                          handler:^{
    LoginViewController *loginViewController = [[LoginViewController alloc] initWithController:controller.userController model:controller.userModel];
    [controller.navigationController pushViewController:loginViewController animated:YES];
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

NSMutableArray* configureSignedInTableViewCells(ProfileTableViewController* controller) {
  
  NSString *userNameTitle = @"";
  
  NSString *userNameSubTitle = [[NSString alloc] init];
  if (controller.userModel.email != nil) {
    userNameSubTitle = controller.userModel.email;
  } else {
    userNameSubTitle = @"";
  }
  
  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
                                          initWithTitle:userNameTitle
                                          subTitle:userNameSubTitle
                                          image:[UIImage imageNamed:@"accountPhoto"]
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
