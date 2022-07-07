//
//  UserModelObserver.h
//  greenTravel
//
//  Created by Alex K on 24.05.22.
//

#ifndef UserModelObserver_h
#define UserModelObserver_h


#endif /* UserModelObserver_h */

#import <Foundation/Foundation.h>
#import "UserModelConstants.h"

NS_ASSUME_NONNULL_BEGIN

@class CLLocation;
@class UserState;

@protocol UserModelObserver <NSObject>

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                  toCurrentState:(UserModelState)currentState;

@end

NS_ASSUME_NONNULL_END
