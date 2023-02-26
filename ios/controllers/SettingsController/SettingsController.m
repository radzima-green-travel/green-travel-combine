//
//  SettingsController.m
//  greenTravel
//
//  Created by Alex K on 20.12.22.
//

#import "SettingsController.h"
#import "SettingsModel.h"
#import "UserModel.h"
#import "UserController.h"
#import "SettingsEntry.h"
#import "SettingsGroup.h"
#import "SettingsScreen.h"
#import "SettingsEntryToggle.h"
#import "SettingsEntrySelect.h"
#import "SettingsEntryAction.h"
#import "SettingsEntryNavigate.h"
#import "SettingsEntryAuthLoggedOut.h"
#import "SettingsEntryAuthLoggedIn.h"
#import "SettingsViewController.h"
#import "UserFetchErrorViewController.h"
#import "ProfileTableViewController.h"
#import "LoginViewController.h"

@interface SettingsController()

@property (strong, nonatomic) SettingsModel *model;

@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) UserController *userController;

@end

@implementation SettingsController

- (instancetype)initWithModel:(SettingsModel *)settingsModel
               userController:(UserController *)userController
                    userModel:(UserModel *)userModel {
  if (self = [super init]) {
    _model = settingsModel;
    _userController = userController;
    _userModel = userModel;
  }
  return self;
}

- (void)interactWithSetting:(SettingsEntry *)entry
           onViewController:(UIViewController *)viewController {
  if ([entry isKindOfClass:[SettingsEntryToggle class]]) {
    SettingsEntryToggle *entryToggle = (SettingsEntryToggle *)entry;
    entryToggle.enabled = !entryToggle.enabled;
    [self.model notifyAboutEntryUpdate:entryToggle];
    return;
  }
  if ([entry isKindOfClass:[SettingsEntryAction class]]) {
    SettingsEntryAction *entryAction = (SettingsEntryAction *)entry;
    entryAction.doAction(viewController);
    return;
  }
  if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
    SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
    SettingsViewController *settingsViewController =
    [[SettingsViewController alloc] initWithSettingsController:self
                                                 settingsModel:self.model
                                                settingsScreen:entryNavigate.screen];
    settingsViewController.title = entryNavigate.name;
    [viewController.navigationController pushViewController:settingsViewController animated:YES];
    return;
  }
  if ([entry isKindOfClass:[SettingsEntrySelect class]]) {
    SettingsEntrySelect *entrySelect = (SettingsEntrySelect *)entry;
    SettingsGroup *group = entrySelect.parentGroup
    BOOL selected = entrySelect.selected;
    [group.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry,
                                                       NSUInteger idx, BOOL * _Nonnull stop) {
      SettingsEntrySelect *entrySelectUpdated = (SettingsEntrySelect *)entry;
      if ([entrySelectUpdated.uid isEqual:entrySelect.uid]) {
        entrySelectUpdated.selected = selected;
        return;
      }
      entrySelectUpdated.selected = NO;
    }];
    [self.model notifyAboutGroupUpdate:group];
    return;
  }
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {
  // Find 4th tab controller in application.
  UITabBarController *tabController = (UITabBarController *)[UIApplication sharedApplication].keyWindow.rootViewController;
  if (tabController.viewControllers.count < 4) {
    return;
  }
  SettingsViewController *settingsViewController = (SettingsViewController *)tabController.viewControllers[3];
  
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      __weak typeof(self) strongSelf = weakSelf;
      BOOL fetched = prevState == UserModelStateFetchingInProgress &&
      currentState == UserModelStateFetched;
      if (fetched && strongSelf.userModel.error != nil) {
        UserFetchErrorViewController *errorViewController = [[UserFetchErrorViewController alloc] initWithController:self.userController model:self.userModel];
        [settingsViewController.navigationController pushViewController:errorViewController animated:YES];
        return;
      }
      BOOL signedIn = strongSelf.userModel.signedIn;
      if (fetched && signedIn) {
        [self updateAuthGroupWhenLoggedIn:NO];
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress &&
          currentState == UserModelStateSignUpSuccess) {
        [self updateAuthGroupWhenLoggedIn:NO];
        return;
      }
      if (prevState == UserModelStateSignInInProgress &&
          currentState == UserModelStateSignedIn) {
        [self updateAuthGroupWhenLoggedIn:NO];
        return;
      }
      if (prevState == UserModelStatePasswordResetConfirmCodeInProgress &&
          currentState == UserModelStatePasswordResetSuccess) {
        [self updateAuthGroupWhenLoggedIn:NO];
        return;
      }
      if (prevState == UserModelStateSignOutInProgress &&
          currentState == UserModelStateFetched) {
        [self updateAuthGroupWhenLoggedOut:NO];
        return;
      }
      if (prevState == UserModelStateNotFetched && currentState == UserModelStateFetchingInProgress) {
        [self updateAuthGroupWhenLoggedOut:YES];
        return;
      }
      if (prevState == UserModelStateFetchingInProgress && currentState == UserModelStateFetched) {
        [self updateAuthGroupWhenLoggedOut:NO];
        return;
      }
      if (prevState == UserModelStateFetchingInProgress && currentState == UserModelStateNotFetched) {
        [self updateAuthGroupWhenLoggedOut:NO];
        return;
      }
      if (prevState == UserModelStateSignedIn &&
          currentState == UserModelStateSignOutInProgress) {
        [self updateAuthGroupWhenLoggedIn:YES];
        return;
      }
    });
  });
}

- (void)updateAuthGroupWhenLoggedOut:(BOOL)progress {
#pragma mark - Auth group
  SettingsEntryAuthLoggedOut *authEntry = [SettingsEntryAuthLoggedOut new];
  authEntry.name = NSLocalizedString(@"ProfileScreenTitle", @"");
  authEntry.doAction = ^void(UIViewController *activeViewController) {
    ProfileTableViewController *profileTableViewController = (ProfileTableViewController *)activeViewController;
    LoginViewController *loginViewController =
    [[LoginViewController alloc] initWithController:profileTableViewController.userController
                                              model:profileTableViewController.userModel];
    loginViewController.title = NSLocalizedString(@"LogInTitle", @"");
    UINavigationController *loginViewControllerWithNavigation = [[UINavigationController alloc] initWithRootViewController:loginViewController];
    if (@available(iOS 13.0, *)) {
      [loginViewControllerWithNavigation setModalInPresentation:YES];
    }
    [activeViewController presentViewController:loginViewControllerWithNavigation animated:YES completion:^{}];
  };
  
  SettingsGroup *authGroup = [self.model.tree.groups[0] copy];
  authGroup.entries = [[NSMutableArray alloc] initWithArray:@[authEntry]];
  
  [self.model notifyAboutGroupUpdate:authGroup];
}

- (void)updateAuthGroupWhenLoggedIn:(BOOL)progress{
#pragma mark - Log out group
  SettingsEntryAction *logoutEntry = [SettingsEntryAction new];
  logoutEntry.name = NSLocalizedString(@"ProfileScreenLogOut", @"");
  logoutEntry.doAction = ^void(UIViewController *activeViewController) {};
  
  SettingsGroup *logoutGroup =
  [[SettingsGroup alloc] initWithName:@"" entries:@[logoutEntry]];
#pragma mark - Delete account group
  SettingsEntryAction *deleteAccountEntry = [SettingsEntryAction new];
  deleteAccountEntry.name = NSLocalizedString(@"ProfileScreenDelete", @"");
  deleteAccountEntry.doAction = ^void(UIViewController *activeViewController) {};
  
  SettingsGroup *deleteAccountGroup =
  [[SettingsGroup alloc] initWithName:@"" entries:@[deleteAccountEntry]];
#pragma mark - Profile screen
  SettingsScreen *screenProfile = [SettingsScreen new];
  screenProfile.name = @"";
  screenProfile.groups =
  [[NSMutableArray alloc] initWithArray:@[logoutGroup, deleteAccountGroup]];
  
  
#pragma mark - Auth group
  SettingsEntryAuthLoggedIn *authEntry = [SettingsEntryAuthLoggedIn new];
  authEntry.name = NSLocalizedString(@"ProfileScreenTitle", @"");
  authEntry.screen = screenProfile;
  
  SettingsGroup *authGroup = [self.model.tree.groups[0] copy];
  authGroup.entries = [[NSMutableArray alloc] initWithArray:@[authEntry]];
  
  [self.model notifyAboutGroupUpdate:authGroup];
}

@end
