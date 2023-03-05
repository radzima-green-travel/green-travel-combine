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
    _prevState = UserModelStateNotFetched;
    _state = UserModelStateNotFetched;
  }
  return self;
}

- (void)setState:(UserModelState)state {
  UserModelState prevState = _state;
  _prevState = prevState;
  _state = state;
  [self notifyUserModelObservers:_prevState currentState:_state];
}

- (void)addUserModelObserver:(id<UserModelObserver>)observer {
  if ([self.userModelObservers containsObject:observer]) {
    return;
  }
  [self.userModelObservers addObject:observer];
}

- (void)notifyUserModelObservers:(UserModelState)prevState
                    currentState:(UserModelState)currentState  {
  [self.userModelObservers enumerateObjectsUsingBlock:^(id<UserModelObserver> _Nonnull observer,
                                                        NSUInteger idx, BOOL * _Nonnull stop) {
    [observer onUserModelStateTransitionFrom:prevState toCurrentState:currentState];
  }];
}

- (void)removeUserModelObserver:(id<UserModelObserver>)observer {
  [self.userModelObservers removeObject:observer];
}

- (BOOL)signedIn {
  return self.signedInNoAttributes && self.state == UserModelStateFetched;
}

@end
