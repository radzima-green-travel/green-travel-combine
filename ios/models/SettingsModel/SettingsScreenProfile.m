//
//  SettingsScreenProfile.m
//  greenTravel
//
//  Created by Alex K on 4.03.23.
//

#import "SettingsScreenProfile.h"
#import "SettingsEntryAction.h"
#import "SettingsEntryInfo.h"
#import "UserModel.h"
#import "UserController.h"
#import "SettingsGroup.h"
#import <UIKit/UIKit.h>
#import "AlertUtils.h"

@interface SettingsScreenProfile()

@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) UserController *userController;

@end

@implementation SettingsScreenProfile

- (instancetype)initWithUserController:(UserController *)userController
                             userModel:(UserModel *)userModel {
  self = [super initWithName:@"root" groups:@[]];
  if (self) {
    _userModel = userModel;
    _userController = userController;
    [self setUp];
  }
  return self;
}

#pragma mark - Assembling to root
- (void)setUp {
  self.groups = [[NSMutableArray alloc] initWithArray:@[[self setEmailGroup],
                                                        [self setResetPasswordGroup],
                                                        [self setUpDangerGroup]]];
}

- (SettingsGroup *)setEmailGroup {
  SettingsEntryInfo *emailEntry = [SettingsEntryInfo new];
  emailEntry.name = NSLocalizedString(@"SettingsViewControllerResetEmailCellTitle", @"");
  emailEntry.value = self.userModel.email;
  
  SettingsGroup *emailGroup =
  [[SettingsGroup alloc] initWithName:@""
                              entries:@[emailEntry]];
  return emailGroup;
}

- (SettingsGroup *)setResetPasswordGroup {
  SettingsEntryAction *resetPassEntry = [SettingsEntryAction new];
  resetPassEntry.name = NSLocalizedString(@"SettingsViewControllerResetPasswordCellTitle", @"");
  resetPassEntry.doAction = ^void(UIViewController *activeViewController) {
    // TODO: implement delete account
  };
  
  SettingsGroup *resetPassGroup =
  [[SettingsGroup alloc] initWithName:@""
                              entries:@[resetPassEntry]];
  return resetPassGroup;
}

- (SettingsGroup *)setUpDangerGroup {
  SettingsEntryAction *deleteAccEntry = [SettingsEntryAction new];
  deleteAccEntry.name = NSLocalizedString(@"SettingsViewControllerDeleteAccCellTitle", @"");
  deleteAccEntry.doAction = ^void(UIViewController *activeViewController) {
    showAlertGeneric(activeViewController, NSLocalizedString(@"SettingsViewControllerDeleteAccAlertMessageHeader", @""), NSLocalizedString(@"SettingsViewControllerDeleteAccAlertMessageBody", @""), ^{
      // TODO: implement delete account
    });
  };
  deleteAccEntry.dangerous = YES;
  
  SettingsEntryAction *logoutEntry = [SettingsEntryAction new];
  logoutEntry.name = NSLocalizedString(@"SettingsViewControllerLogoutCellTitle", @"");
  __weak typeof(self) weakSelf = self;
  logoutEntry.doAction = ^void(UIViewController *activeViewController) {
    showAlertGeneric(activeViewController, NSLocalizedString(@"SettingsViewControllerLogoutAlertMessageHeader", @""), NSLocalizedString(@"SettingsViewControllerLogoutAlertMessageBody", @""), ^{
      [weakSelf.userController initiateSignOut];
    });
  };
  
  SettingsGroup *dangerGroup =
  [[SettingsGroup alloc] initWithName:@""
                              entries:@[deleteAccEntry, logoutEntry]];
  return dangerGroup;
}

@end
