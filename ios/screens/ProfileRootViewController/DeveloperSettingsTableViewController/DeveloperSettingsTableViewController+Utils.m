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

NSMutableArray* configureDevSettingsTableViewCells(DeveloperSettingsTableViewController* controller) {
  
  SettingsTableViewCellModel *cell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Title"
                                                                              subTitle:@"SubTitle"
                                                                                 image:[UIImage imageNamed:@"accountPhoto"]
                                                                    fetchingInProgress:NO
                                                                              signedIn:NO
                                                                               handler:^{
    // cell handler
  }];
  
  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:cell, cell, cell, nil];
  
  SettingsSection *settingsSection = [[SettingsSection alloc]
                                     initWithTitle:@""
                                     cellModels:settingCellModels];
  
  NSMutableArray *models = [[NSMutableArray alloc] initWithArray:@[settingsSection]];
  return models;
}
