//
//  SettingsScreenRoot.m
//  greenTravel
//
//  Created by Alex K on 8.02.23.
//

#import "SettingsScreenRoot.h"
#import "UserModel.h"
#import "UserController.h"
#import "SettingsEntryAuthLoggedOut.h"
#import "SettingsEntryAuthLoggedIn.h"
#import "SettingsGroup.h"
#import "SettingsEntry.h"
#import "SettingsScreen.h"
#import "LoginViewController.h"
#import <SDWebImage/SDWebImage.h>
#import "LocaleUtils.h"
#import "SettingsScreenProfile.h"
#import "AlertUtils.h"

@interface SettingsScreenRoot()

@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) UserController *userController;

@end

@implementation SettingsScreenRoot

- (instancetype)initWithUserController:(id)userController userModel:(id)userModel {
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
  self.groups = [[NSMutableArray alloc] initWithArray:@[[self setUpAuthGroup],
                                                        [self setUpGeneralGroup],
                                                        [self setUpAboutGroup]]];
}

#pragma mark - Auth group
- (SettingsGroup *)setUpAuthGroup {
  SettingsEntryAuthLoggedOut *authEntry = [SettingsEntryAuthLoggedOut new];
  authEntry.name = NSLocalizedString(@"ProfileScreenTitle", @"");
  authEntry.inProgress = NO;
  __weak typeof(self) weakSelf = self;
  authEntry.doAction = ^void(UIViewController *activeViewController) {
    LoginViewController *loginViewController =
    [[LoginViewController alloc] initWithController:weakSelf.userController
                                              model:weakSelf.userModel];
    loginViewController.title = NSLocalizedString(@"LogInTitle", @"");
    UINavigationController *loginViewControllerWithNavigation = [[UINavigationController alloc] initWithRootViewController:loginViewController];
    if (@available(iOS 13.0, *)) {
      [loginViewControllerWithNavigation setModalInPresentation:YES];
    }
    [activeViewController presentViewController:loginViewControllerWithNavigation animated:YES completion:^{}];
  };
  
  SettingsGroup *authGroup =
  [[SettingsGroup alloc] initWithName:@"" entries:@[authEntry]];
  return authGroup;
}

#pragma mark - General group
- (SettingsGroup *)setUpGeneralGroup {
  SettingsEntryAction *languageEntry = [SettingsEntryAction new];
  languageEntry.name = NSLocalizedString(@"SettingsViewControllerLanguageCellTitle", @"");
  languageEntry.value = getCurrentLocaleFriendlyName();
  languageEntry.chevron = YES;
  languageEntry.iconName = @"language";
  languageEntry.doAction = ^void(UIViewController *activeViewController) {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]
                                       options:@{} completionHandler:^(BOOL success) {}];
  };
  
  SettingsEntryAction *clearCacheEntry = [SettingsEntryAction new];
  clearCacheEntry.name = NSLocalizedString(@"SettingsViewControllerCacheCellTitle", @"");
  clearCacheEntry.iconName = @"dataAndStorage";
  clearCacheEntry.doAction = ^void(UIViewController *activeViewController) {
    showAlertGeneric(activeViewController, NSLocalizedString(@"SettingsViewControllerCacheAlertMessageHeader", @""), NSLocalizedString(@"SettingsViewControllerCacheAlertMessageBody", @""), ^{
      [[SDImageCache sharedImageCache] clearDiskOnCompletion:^{}];
    });
  };
  SettingsGroup *generalGroup =
  [[SettingsGroup alloc] initWithName:NSLocalizedString(@"SettingsViewControllerGeneralGroupTitle", @"")
                              entries:@[languageEntry, clearCacheEntry]];
  return generalGroup;
}

#pragma mark - About group
- (SettingsGroup *)setUpAboutGroup {
  SettingsEntryNavigate *termsEntry = [SettingsEntryNavigate new];
  termsEntry.name = NSLocalizedString(@"SettingsViewControllerTermsCellTitle", @"");
  termsEntry.screen = [[SettingsScreen alloc] initWithName:@"terms" groups:@[]];
  
  SettingsEntryNavigate *privacyEntry = [SettingsEntryNavigate new];
  privacyEntry.name = NSLocalizedString(@"SettingsViewControllerPrivacyCellTitle", @"");
  privacyEntry.screen = [[SettingsScreen alloc] initWithName:@"privacy" groups:@[]];
  
  SettingsGroup *aboutGroup =
  [[SettingsGroup alloc] initWithName:NSLocalizedString(@"SettingsViewControllerAboutGroupTitle", @"")
                              entries:@[termsEntry, privacyEntry]];
  return aboutGroup;
}

#pragma mark - rebuilding of tree depending on signed in state
- (void)startSignIn {
  SettingsEntryAuthLoggedOut *authEntry = (SettingsEntryAuthLoggedOut *)self.groups[0].entries[0];
  authEntry.inProgress = YES;
}

- (void)completeSignIn {
  SettingsScreen *profileScreen = [[SettingsScreenProfile alloc] initWithUserController:self.userController userModel:self.userModel];
  BOOL signedIn = self.userModel.signedIn;
  
  if (signedIn) {
    SettingsEntryAuthLoggedIn *authEntry = [SettingsEntryAuthLoggedIn new];
    authEntry.name = NSLocalizedString(@"ProfileScreenTitle", @"");
    authEntry.inProgress = NO;
    authEntry.screen = profileScreen;
    self.groups[0].entries[0] = authEntry;
    return;
  }
  
  SettingsEntryAuthLoggedOut *authEntry = [SettingsEntryAuthLoggedOut new];
  authEntry.name = NSLocalizedString(@"ProfileScreenTitle", @"");
  authEntry.inProgress = NO;
}

- (void)startSignOut {
  
}

- (void)completeSignOut {
  self.groups[0] = [self setUpAuthGroup];
}


@end
