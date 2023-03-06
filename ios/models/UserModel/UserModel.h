//
//  UserModel.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <Foundation/Foundation.h>
#import "UserModelObservable.h"
#import "UserModelConstants.h"

NS_ASSUME_NONNULL_BEGIN

@protocol UserModelObserver;
@class UserState;

@interface UserModel : NSObject<UserModelObservable>

@property (strong, nonatomic) NSString *email;
@property (strong, nonatomic) NSString *password;
@property (strong, nonatomic) NSString *emailResetPassword;
@property (strong, nonatomic) NSString *passwordNew;
@property (strong, nonatomic) NSString *confirmationCode;
@property (strong, nonatomic, nullable) NSError *error;
@property (assign, nonatomic) BOOL signedInWithoutAttributes;
@property (assign, nonatomic) BOOL signedIn;
@property (strong, nonatomic) NSMutableArray<id<UserModelObserver>> *userModelObservers;
@property (assign, nonatomic) UserModelState prevState;
@property (assign, nonatomic) UserModelState state;

@end

NS_ASSUME_NONNULL_END
