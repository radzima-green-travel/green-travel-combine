//
//  UserModel.m
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import "UserModel.h"
#import "UserModelObserver.h"

@implementation UserModel
- (instancetype)init
{
  self = [super init];
  if (self) {
    _userModelObservers = [[NSMutableArray alloc] init];
  }
  return self;
}

- (void)setEmailSendingState:(EmailSendingState *)emailSendingState {
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
    [observer onEmailSendingUpdate:self.emailSendingState];
  }];
}

- (void)removeUserModelObserver:(id<UserModelObserver>)observer {
  [self.userModelObservers removeObject:observer];
}

@end
