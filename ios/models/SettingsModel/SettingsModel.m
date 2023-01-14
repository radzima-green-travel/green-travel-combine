//
//  SettingsModel.m
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import "SettingsModel.h"
#import "SettingsModelObserver.h"
#import "SettingsGroup.h"
#import "SettingsEntry.h"
#import "SettingsScreen.h"
#import "SettingsEntryAction.h"
#import "SettingsEntryNavigate.h"
#import "SettingsScreen.h"
#import "UserModel.h"
#import <UIKit/UIKit.h>
#import "ProfileTableViewController.h"
#import "LoginViewController.h"
#import <SDWebImage/SDWebImage.h>

@interface SettingsModel()

@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) UserController *userController;

@end

@implementation SettingsModel

- (instancetype)initWithUserController:(id)userController
                             userModel:(UserModel *)userModel {
  self = [super init];
  if (self) {
    _settingsModelObservers = [[NSMutableArray alloc] init];
    _tree = [NSMutableArray new];
    _userModel = userModel;
    _userController = userController;
  }
  return self;
}

- (void)setUp {
  __weak typeof(self) weakSelf = self;
#pragma mark - Auth group
  SettingsEntryAction *authEntry = [SettingsEntryAction new];
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
  screenAbout.groups = @[aboutTextGroup];

  SettingsEntryNavigate *aboutEntry = [SettingsEntryNavigate new];
  aboutEntry.name = NSLocalizedString(@"Language", @"");
  aboutEntry.screen = nil;

  SettingsGroup *aboutGroup =
  [[SettingsGroup alloc] initWithName:@"" entries:@[aboutEntry]];

#pragma mark - Assembling to root
  SettingsScreen *root = [[SettingsScreen alloc] initWithName:NSLocalizedString(@"ProfileScreenTitle", @"")
                                                       groups:@[authGroup, generalGroup, aboutGroup]];
}

- (void)updateEntry:(SettingsEntry *)updatedEntry {
  [self notifySettingsModelObserversOnEntryChange:updatedEntry];
}

- (void)updateGroup:(SettingsGroup *)updatedGroup {
  [self notifySettingsModelObserversOnGroupChange:updatedGroup];
}

- (void)addSettingsModelObserver:(id<SettingsModelObserver>)observer {
  if ([self.settingsModelObservers containsObject:observer]) {
    return;
  }
  [self.settingsModelObservers addObject:observer];
}

- (void)notifySettingsModelObserversOnTreeChange:(NSMutableArray<SettingsGroup *> *)tree {
  [self.settingsModelObservers enumerateObjectsUsingBlock:^(id<SettingsModelObserver> _Nonnull observer,
                                                            NSUInteger idx, BOOL * _Nonnull stop) {
    [observer onSettingsModelTreeChange:tree];
  }];
}

- (void)notifySettingsModelObserversOnEntryChange:(SettingsEntry *)entry {
  [self.settingsModelObservers enumerateObjectsUsingBlock:^(id<SettingsModelObserver>  _Nonnull observer,
                                                            NSUInteger idx, BOOL * _Nonnull stop) {
    [observer onSettingsModelEntryChange:entry];
  }];
}

- (void)notifySettingsModelObserversOnGroupChange:(SettingsGroup *)group {
  [self.settingsModelObservers enumerateObjectsUsingBlock:^(id<SettingsModelObserver>  _Nonnull observer,
                                                            NSUInteger idx, BOOL * _Nonnull stop) {
    [observer onSettingsModelGroupChange:group];
  }];
}

- (void)removeSettingsModelObserver:(id<SettingsModelObserver>)observer {
  [self.settingsModelObservers removeObject:observer];
}

- (SettingsScreen *)findScreenByID:(NSUUID *)uuid forTree:(SettingsScreen *>)tree {
  if ([screen.uuid isEqual:uuid]) {
    *stop = YES;
    return screen;
  }
  SettingsScreen *foundScreen = nil
  [screen.groups enumerateObjectsUsingBlock:^(SettingsGroup * _Nonnull group, NSUInteger idx, BOOL * _Nonnull stop) {
    [group.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry, NSUInteger idx, BOOL * _Nonnull stop) {
      if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
        SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
        foundScreen = [self findScreenByID:uuid forTree:entryNavigate.screen];
      }
    }];
  }];
  return foundScreen;
}

- (SettingsScreen *)findScreenByID:(NSUUID *)uuid {
  [self findScreenByID:(NSUUID *)uuid forTree:self.tree];
}

- (SettingsScreen *)findScreenByID:(NSUUID *)uuid inGroup:(SettingsGroup *)group {
	[group.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry, NSUInteger idx, BOOL * _Nonnull stop) {
		if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
			SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
			if ([entryNavigate.screen.uuid isEqual:uuid]) {
				*stop = YES;
				return entryNavigate.screen;
			}
		}
	}];
}

@end
