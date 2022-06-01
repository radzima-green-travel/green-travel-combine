//
//  UserModel.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <Foundation/Foundation.h>
#import "UserModelObservable.h"

NS_ASSUME_NONNULL_BEGIN

@protocol UserModelObserver;
@class UserState;

@interface UserModel : NSObject<UserModelObservable>

@property (strong, nonatomic) UserState *emailSendingState;
@property (strong, nonatomic) NSMutableArray<id<UserModelObserver>> *userModelObservers;

@end

NS_ASSUME_NONNULL_END
