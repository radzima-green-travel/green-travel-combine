//
//  SettingsModel.m
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import "SettingsModel.h"
#import "SettingsModelObserver.h"
#import "SettingsGroup.h"
#import "SettingsEntryNavigate.h"
#import "SettingsScreenRoot.h"
#import "UserModel.h"
#import <UIKit/UIKit.h>
#import "ProfileTableViewController.h"
#import "LoginViewController.h"

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
#pragma mark - Assembling to root
  self.tree = [[SettingsScreenRoot alloc] initWithUserController:self.userController userModel:self.userModel];
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
