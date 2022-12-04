//
//  DeveloperSettingsTableViewController+Utils.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 15.11.22.
//

#import <Foundation/Foundation.h>
#import "DeveloperSettingsTableViewController+Utils.h"
#import "SettingsTableViewCellModel.h"
#import "SettingsSection.h"
#import "SDImageCache.h"

NSMutableArray* configureDevSettingsTableViewCells(DeveloperSettingsTableViewController* controller) {
  
  SettingsTableViewCellModel *crashCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Crash"
                                                                              subTitle:@""
                                                                              cellType:DevSettingsCellTypeButtonCell
                                                                                 image:Nil
                                                                                    handler:^{
    // Crashlytics cell
  }];
  SettingsTableViewCellModel *crachWhenSlowCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Crash when slow"
                                                                                       subTitle:@""
                                                                                       cellType:DevSettingsCellTypeToggleCell
                                                                                          image:Nil
                                                                                        handler:^{
    // Crash when cell
    NSLog(@"----------------");
    NSLog(@"Value changed");
    NSLog(@"----------------");
  }];
  SettingsTableViewCellModel *switchPlatformCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Switch platform"
                                                                                        subTitle:@""
                                                                                        cellType:DevSettingsCellTypePushToSelectionCell
                                                                                           image:Nil
                                                                                         handler:^{
    // Switch platform cell
  }];
  SettingsTableViewCellModel *clearDataBaseCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Clear Data base"
                                                                                           subTitle:@""
                                                                                           cellType:DevSettingsCellTypeButtonCell
                                                                                              image:Nil
                                                                                            handler:^{
    // Clear data base
  }];
  
  SettingsTableViewCellModel *clearCacheCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Clear cache"
                                                                                        subTitle:@""
                                                                                        cellType:DevSettingsCellTypeButtonCell
                                                                                           image:Nil
                                                                                         handler:^{
    // Clear cache
    
    [SDImageCache.sharedImageCache clearWithCacheType:SDImageCacheTypeAll completion:^{
      NSLog(@"----------------");
      NSLog(@"Cache cleared");
      NSLog(@"----------------");
    }];
  }];
  
  SettingsTableViewCellModel *themeCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Theme"
                                                                                   subTitle:@"Current theme"
                                                                                   cellType:DevSettingsCellTypePushToSelectionCell
                                                                                      image:Nil
                                                                                    handler:^{
    // Choose theme
  }];
  
  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:
                                       crashCell,
                                       crachWhenSlowCell,
                                       switchPlatformCell,
                                       clearDataBaseCell,
                                       clearCacheCell,
                                       themeCell,
                                       nil];
  
  SettingsSection *settingsSection = [[SettingsSection alloc]
                                     initWithTitle:@""
                                     cellModels:settingCellModels];
  
  NSMutableArray *models = [[NSMutableArray alloc] initWithArray:@[settingsSection]];
  return models;
}
