//
//  UserModel.m
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import "UserModel.h"
#import "UserModelObserver.h"
#import "UserState.h"

@implementation UserModel
- (instancetype)init
{
  self = [super init];
  if (self) {
    _userModelObservers = [[NSMutableArray alloc] init];
    UserState *state = [UserState new];
    _emailSendingState = state;
  }
  return self;
}

- (void)setEmailSendingState:(UserState *)emailSendingState {
  _emailSendingState = emailSendingState;
  [self notifyUserModelObservers];
}

- (void)addUserModelObserver:(id<UserModelObserver>)observer {
  if ([self.userModelObservers containsObject:observer]) {
    return;
  }
  [self.userModelObservers addObject:observer];
}

- (void)notifyUserModelObservers {
  
  [self.userModelObservers enumerateObjectsUsingBlock:^(id<UserModelObserver> _Nonnull observer, NSUInteger idx, BOOL * _Nonnull stop) {
    [observer onUserStateUpdate:self.emailSendingState];
  }];
}

- (void)removeUserModelObserver:(id<UserModelObserver>)observer {
  [self.userModelObservers removeObject:observer];
}

@end
