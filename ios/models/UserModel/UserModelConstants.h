//
//  UserModelConstants.h
//  greenTravel
//
//  Created by Alex K on 7.06.22.
//

#ifndef UserModelConstants_h
#define UserModelConstants_h


#endif /* UserModelConstants_h */

typedef NS_ENUM(NSInteger, UserModelState) {
#pragma mark - sign up
  UserModelStateNotFetched,
  UserModelStateFetchingInProgress,
  UserModelStateFetched,
  UserModelStateSignUpEmailInProgress,
  UserModelStateConfirmCodeNotSent,
  UserModelStateConfirmCodeInProgress,
  UserModelStateConfirmCodeSent,
  UserModelStateSignUpSuccess,
#pragma mark - sign in
  UserModelStateSignInInProgress,
  UserModelStateSignedIn,
#pragma mark - password reset
  UserModelStatePasswordEmailInProgress,
  UserModelStatePasswordResetConfirmCodeNotSent,
  UserModelStatePasswordResetConfirmCodeInProgress,
  UserModelStatePasswordResetSuccess,
#pragma mark - log out
  UserModelStateSignOutInProgress,
};
