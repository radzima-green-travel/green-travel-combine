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

- (void)setUp {
#pragma mark - Auth group
  SettingsEntryAuthLoggedOut *authEntry = [SettingsEntryAuthLoggedOut new];
  authEntry.name = NSLocalizedString(@"ProfileScreenTitle", @"");
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
#pragma mark - General group
  SettingsEntryAction *languageEntry = [SettingsEntryAction new];
  languageEntry.name = NSLocalizedString(@"Language", @"");
  languageEntry.doAction = ^void(UIViewController *activeViewController) {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]
                                       options:@{} completionHandler:^(BOOL success) {}];
  };
  
  SettingsEntryAction *clearCacheEntry = [SettingsEntryAction new];
  clearCacheEntry.name = NSLocalizedString(@"Language", @"");
  clearCacheEntry.doAction = ^void(UIViewController *activeViewController) {
    UIAlertController *alert =
    [UIAlertController alertControllerWithTitle:NSLocalizedString(@"ProfileTableViewAlertClearCacheMessageHeader", @"")
                                        message:NSLocalizedString(@"ProfileTableViewAlertClearCacheMessageBody", @"")
                                 preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"AlertCancel", @"") style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action){}]];
    [alert addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"AlertOK", @"") style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      [[SDImageCache sharedImageCache] clearDiskOnCompletion:^{}];
    }]];
    [activeViewController presentViewController:alert animated:YES completion:^{}];
  };
  SettingsGroup *generalGroup =
  [[SettingsGroup alloc] initWithName:@"" entries:@[languageEntry, clearCacheEntry]];
#pragma mark - About group
  SettingsEntryAction *aboutTextEntry = [SettingsEntryAction new];
  aboutTextEntry.name = NSLocalizedString(@"Language", @"");
  aboutTextEntry.doAction = ^void(UIViewController *activeViewController) {};
  
  SettingsGroup *aboutTextGroup =
  [[SettingsGroup alloc] initWithName:@"" entries:@[aboutTextEntry]];
  
  SettingsScreen *screenAbout = [SettingsScreen new];
  screenAbout.name = @"";
  screenAbout.groups = [[NSMutableArray alloc] initWithArray:@[aboutTextGroup]];
  
  SettingsEntryNavigate *aboutEntry = [SettingsEntryNavigate new];
  aboutEntry.name = NSLocalizedString(@"Language", @"");
  aboutEntry.screen = [SettingsScreen new];
  
  SettingsGroup *aboutGroup =
  [[SettingsGroup alloc] initWithName:@"" entries:@[aboutEntry]];
  
#pragma mark - Assembling to root
  self.groups =
  [[NSMutableArray alloc] initWithArray:@[authGroup, generalGroup, aboutGroup]];
}

@end
