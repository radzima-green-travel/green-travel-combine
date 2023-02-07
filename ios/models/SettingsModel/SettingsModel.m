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
#import "SettingsEntryAuthLoggedOut.h"
#import "SettingsEntryAuthLoggedIn.h"
#import "SettingsEntryNavigate.h"
#import "SettingsScreen.h"
#import "UserModel.h"
#import <UIKit/UIKit.h>
#import "ProfileTableViewController.h"
#import "LoginViewController.h"
#import <SDWebImage/SDWebImage.h>
#import "SettingsViewController.h"

@interface SettingsModel()

@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) UserController *userController;

@end

@implementation SettingsModel

- (instancetype)initWithUserController:(UserController *)userController
                             userModel:(UserModel *)userModel {
  self = [super init];
  if (self) {
    _settingsModelObservers = [[NSMutableArray alloc] init];
    _tree = [[SettingsScreen alloc] initWithName:NSLocalizedString(@"ProfileScreenTitle", @"")
                                          groups:@[]];
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
  self.tree.groups =
  [[NSMutableArray alloc] initWithArray:@[authGroup, generalGroup, aboutGroup]];
}

- (void)updateEntry:(SettingsEntry *)updatedEntry
            forTree:(SettingsScreen *)tree {
  for (NSUInteger i = 0; i < [tree.groups count]; i++) {
    SettingsGroup *group = tree.groups[i];
    for (NSUInteger j = 0; j < [group.entries count]; j++) {
      if ([updatedEntry.uid isEqual:group.entries[i].uid]) {
        group.entries[i] = updatedEntry;
        break;
      }
    }
    [group.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry, NSUInteger idx, BOOL * _Nonnull stop) {
      if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
        SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
        [self updateEntry:updatedEntry forTree:entryNavigate.screen];
      }
    }];
  }
}

- (void)updateGroup:(SettingsGroup *)updatedGroup
            forTree:(SettingsScreen *)tree {
  for (NSUInteger i = 0; i < [tree.groups count]; i++) {
    SettingsGroup *group = tree.groups[i];
    if ([updatedGroup.uid isEqual:tree.groups[i].uid]) {
      tree.groups[i] = updatedGroup;
      break;
    }
    [group.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry, NSUInteger idx, BOOL * _Nonnull stop) {
      if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
        SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
        [self updateGroup:updatedGroup forTree:entryNavigate.screen];
      }
    }];
  }
}

- (void)updateScreen:(SettingsScreen *)updatedScreen
            forTree:(SettingsScreen *)tree {
  for (NSUInteger i = 0; i < [tree.groups count]; i++) {
    SettingsGroup *group = tree.groups[i];
    for (NSUInteger j = 0; j < [group.entries count]; j++) {
      SettingsEntry *entry = group.entries[j];
      if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
        SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
        if ([entryNavigate.screen.uid isEqual:updatedScreen.uid]) {
          entryNavigate.screen = updatedScreen;
          return;
        }
        [self updateScreen:updatedScreen forTree:tree];
      }
    }
  }
}

#pragma mark - update entities
- (void)updateEntry:(SettingsEntry *)updatedEntry {
  [self updateEntry:updatedEntry forTree:self.tree];
  [self notifySettingsModelObserversOnEntryChange:updatedEntry];
}

- (void)updateGroup:(SettingsGroup *)updatedGroup {
  [self updateGroup:updatedGroup forTree:self.tree];
  [self notifySettingsModelObserversOnGroupChange:updatedGroup];
}

- (void)updateScreen:(SettingsScreen *)updatedScreen {
  if ([updatedScreen.uid isEqual:self.tree.uid]) {
    self.tree = updatedScreen;
    [self notifySettingsModelObserversOnScreenChange:updatedScreen];
    return;
  }
  [self updateScreen:updatedScreen forTree:self.tree];
  [self notifySettingsModelObserversOnScreenChange:updatedScreen];
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

- (void)notifySettingsModelObserversOnScreenChange:(SettingsScreen *)screen {
  [self.settingsModelObservers enumerateObjectsUsingBlock:^(id<SettingsModelObserver>  _Nonnull observer,
                                                            NSUInteger idx, BOOL * _Nonnull stop) {
    [observer onSettingsModelScreenChange:screen];
  }];
}

- (void)removeSettingsModelObserver:(id<SettingsModelObserver>)observer {
  [self.settingsModelObservers removeObject:observer];
}

- (SettingsScreen *)findScreenByID:(NSUUID *)uuid forTree:(SettingsScreen *)tree {
  if ([tree.uid isEqual:uuid]) {
    return tree;
  }
  __block SettingsScreen *foundScreen;
  
  [tree.groups enumerateObjectsUsingBlock:^(SettingsGroup * _Nonnull group, NSUInteger idx, BOOL * _Nonnull stop) {
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
  return [self findScreenByID:(NSUUID *)uuid forTree:self.tree];
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {
}

@end
