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
    UserModelStateNotFetched,
    UserModelStateFetchingInProgress,
    UserModelStateFetched,
    UserModelStateSignUpEmailInProgress,
    UserModelStateConfirmCodeNotSent,
    UserModelStateConfirmCodeInProgress,
    UserModelStateConfirmCodeSent,
    UserModelStateSignUpSuccess,
    UserModelStateNotSignedIn,
    UserModelStateSignInInProgress,
    UserModelStateSignedIn,
};
