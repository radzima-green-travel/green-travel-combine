//
//  UserSettingsViewControllerUtils.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 11.09.22.
//

#import "UserSettingsViewControllerUtils.h"
#import "SettingsTableViewCellModel.h"
#import "LoginViewController.h"
#import "ProfileSection.h"
#import "UserModel.h"
#import "UIImage+extensions.h"
#import "BookmarksViewController.h"



NSMutableArray* configureSettingsTableViewCells(UserSettingsViewController* controller) {
  
  NSUInteger bookmarksCount = (controller.bookmarksGroupModel.bookmarkItems.count);
  
  SettingsTableViewCellModel *bookmarksCell = [[SettingsTableViewCellModel alloc]
                                               initWithTitle:NSLocalizedString(@"ProfileTableViewCellBookmark", @"")
                                               subTitle:@(bookmarksCount).stringValue
                                               image:nil
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
  
  SettingsTableViewCellModel *mockCell1 = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:@"MockCell"
                                           subTitle:@""
                                           image:nil
                                           handler:^{
    NSLog(@"MockCell Tapped");
  }];
  
  SettingsTableViewCellModel *mockCell2 = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:@"MockCell"
                                           subTitle:@""
                                           image:nil
                                           handler:^{
    NSLog(@"MockCell Tapped");
  }];
  
  SettingsTableViewCellModel *mockCell3 = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:@"MockCell"
                                           subTitle:@""
                                           image:nil
                                           handler:^{
    NSLog(@"MockCell Tapped");
  }];
  
  SettingsTableViewCellModel *mockCell4 = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:@"MockCell"
                                           subTitle:@""
                                           image:nil
                                           handler:^{
    NSLog(@"MockCell Tapped");
  }];
  
  SettingsTableViewCellModel *termsAndConditionsCell = [[SettingsTableViewCellModel alloc]
                                                        initWithTitle:NSLocalizedString(@"UserSettingsTableViewCellTermsOfUseMainLabel", @"")
                                                        subTitle:@""
                                                        image:nil
                                                        handler:^{
    NSLog(@"termsAndConditionsCell tapped");
  }];
  
  SettingsTableViewCellModel *privacyPolicyCell = [[SettingsTableViewCellModel alloc]
                                                   initWithTitle:NSLocalizedString(@"UserSettingsTableViewCellPrivacyPolicyMainLabel", @"")
                                                   subTitle:@""
                                                   image:nil
                                                   handler:^{
    NSLog(@"privacyPolicyCell tapped");
  }];
  
  SettingsTableViewCellModel *logOutCell = [[SettingsTableViewCellModel alloc]
                                            initWithTitle:NSLocalizedString(@"UserSettingsTableViewCellLogOutMainLabel", @"")
                                            subTitle:@""
                                            image:nil
                                            handler:^{
    NSLog(@"LOGOUT");
  }];
  
  SettingsTableViewCellModel *deleteUserCell = [[SettingsTableViewCellModel alloc]
                                                initWithTitle:NSLocalizedString(@"UserSettingsTableViewCellDeleteUserMainLabel", @"")
                                                subTitle:@""
                                                image:nil
                                                handler:^{
    NSLog(@"DELETE ACCOUNT");
  } ];
  
  
  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:bookmarksCell, mockCell1, mockCell2, mockCell3, mockCell4, nil];
  ProfileSection *settingsSection = [[ProfileSection alloc]
                                     initWithTitle:@""
                                     cellModels:settingCellModels];
  
  ProfileSection *termsAndConditionsSection = [[ProfileSection alloc]
                                               initWithTitle:@""
                                               cellModels:[[NSMutableArray alloc]initWithObjects:termsAndConditionsCell, privacyPolicyCell, nil]];
  
  ProfileSection *logOutSection = [[ProfileSection alloc]
                                   initWithTitle:@""
                                   cellModels:[[NSMutableArray alloc]initWithObjects:logOutCell, nil]];
  
  ProfileSection *deleteUserSection = [[ProfileSection alloc]
                                   initWithTitle:@""
                                   cellModels:[[NSMutableArray alloc]initWithObjects:deleteUserCell, nil]];
  
  NSMutableArray *models = [[NSMutableArray alloc] initWithArray:@[settingsSection, termsAndConditionsSection, logOutSection, deleteUserSection]];
  return models;
}
