//
//  UserModel.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <Foundation/Foundation.h>
#import "UserModelObservable.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, UserModelState) {
    UserModelStateSignUpForm,
    UserModelStateSignUpEmailInProgress,
    UserModelStateCodeConfirmForm,
    UserModelStateCodeConfirmInProgress,
};

@protocol UserModelObserver;
@class UserState;

@interface UserModel : NSObject<UserModelObservable>

@property (strong, nonatomic) UserState *emailSendingState;
@property (strong, nonatomic) NSString *email;
@property (strong, nonatomic) NSString *password;
@property (strong, nonatomic) NSMutableArray<id<UserModelObserver>> *userModelObservers;
@property (assign, nonatomic) UserModelState *state;

@end

NS_ASSUME_NONNULL_END
