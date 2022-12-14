//
//  SettingsModel.m
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import "SettingsModel.h"
#import "SettingsModelConstants.h"
#import "SettingsModelObserver.h"
#import "SettingsGroup.h"
#import "SettingsEntry.h"
#import "UserModel.h"

@interface SettingsModel()

@property (strong, nonatomic) UserModel *userModel;

@end

@implementation SettingsModel

- (instancetype)initWithUserModel:(UserModel *)userModel {
  self = [super init];
  if (self) {
    _settingsModelObservers = [[NSMutableArray alloc] init];
    _tree = [NSMutableArray new];
    _userModel = userModel;
  }
  return self;
}

- (void)setUp {
  SettingsEntry *authEntry = [SettingsEntry new];
  authEntry.key = SettingsModelEntryKeyClearCache;
  authEntry.name = @"auth";
  
  SettingsGroup *authGroup = [SettingsGroup new];
  authGroup.key = SettingsModelGroupKeyAuth;
  authGroup.name = @"auth";
  authGroup.cells = @[authEntry];
  
  SettingsGroup *generalGroup = [SettingsGroup new];
  
  self.tree;
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

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {
  
}


@end
