//
//  UserController.m
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import "UserController.h"
#import "AmplifyBridge.h"
#import "UserModel.h"
#import "AuthService.h"
#import "UserState.h"
#import "UserModelConstants.h"

#if PROD
#import "Radzima-Swift.h"
#else
#import "Radzima_Dev-Swift.h"
#endif

@interface UserController()

@property(strong, nonatomic) UserModel *model;

@end

@implementation UserController

- (instancetype)initWithModel:(UserModel *)model
                  authService:(nonnull AuthService *)authService {
  self = [super init];
  if (self) {
    _model = model;
    _authService = authService;
  }
  __weak typeof(self) weakSelf = self;
  _authService.socialLoginService.signedInCallback = ^{
    [weakSelf fetchUserAttributesAndSetUserState:UserModelStateSignedIn
                               fallbackState:UserModelStateFetched];
  };
  
  return self;
}

- (void)fetchCurrentAuthSession {
  [self.model setState:UserModelStateFetchingInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService fetchCurrentAuthSession:^(NSError * _Nullable error, BOOL signedIn) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    [strongSelf.model setSignedIn:signedIn];
    if (error != nil) {
      [strongSelf.model setState:UserModelStateNotFetched];
      return;
    }
    if (!signedIn) {
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [self fetchUserAttributesAndSetUserState:UserModelStateFetched
                               fallbackState:UserModelStateNotFetched];
  }];
}

- (void)fetchUserAttributesAndSetUserState:(UserModelState)state
                             fallbackState:(UserModelState)fallbackState {
  __weak typeof(self) weakSelf = self;
  [self.authService fetchUserAttributes:^(NSString * _Nonnull userEmail, NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:fallbackState];
      return;
    }
    [strongSelf.model setEmail:userEmail];
    [strongSelf.model setState:state];
  }];
}

- (void)initiateSignIn:(NSString *)username password:(NSString *)password {
  [self.model setState:UserModelStateSignInInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService signInWithUsername:username password:password
                            completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [self fetchUserAttributesAndSetUserState:UserModelStateSignedIn
                               fallbackState:UserModelStateFetched];
  }];
}

- (void)signIn:(NSString *)username
      password:(NSString *)password
    completion:(void (^)(NSError * _Nullable))completion {
  [self.authService signInWithUsername:username password:password
                            completion:^(NSError * _Nullable error) {
    if (error != nil) {
      completion(error);
      return;
    }
    completion(nil);
  }];
}

- (void)initiateResetPassword:(NSString *)username {
  [self.model setEmailResetPassword:username];
  [self.model setState:UserModelStatePasswordEmailInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService resetPassword:username completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [strongSelf.model setState:UserModelStatePasswordResetConfirmCodeNotSent];
  }];
}

- (void)resetPasswordConfirm:(NSString *)username code:(NSString *)code newPassword:(NSString *)newPassword {
  [self.model setPasswordNew:newPassword];
  [self.model setConfirmationCode:code];
  [self.model setState:UserModelStatePasswordResetConfirmCodeInProgress];
  
  [self.model setError:nil];
  __weak typeof(self) weakSelf = self;
  [self.authService resetPasswordConfirm:username code:code
                             newPassword:newPassword
                              completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStatePasswordResetConfirmCodeNotSent];
      [strongSelf.model setError:error];
      return;
    }
    
    [strongSelf.model setError:nil];
    [self signIn:strongSelf.model.emailResetPassword
        password:strongSelf.model.passwordNew
      completion:^(NSError * _Nullable error){
      __weak typeof(weakSelf) strongSelf = weakSelf;
      if (error != nil) {
        [strongSelf.model setState:UserModelStateFetched];
        [strongSelf.model setError:error];
        return;
      }
      [strongSelf fetchUserAttributesAndSetUserState:UserModelStatePasswordResetSuccess
                                       fallbackState:UserModelStateFetched];
    }];
  }];
}

- (void)initiateSignUp:(NSString *)email
              username:(NSString *)username
              password:(NSString *)password {
  UserState *state = [UserState new];
  [state setInProgress:YES];
  [self.model setState:UserModelStateSignUpEmailInProgress];
  [self.model setEmail:email];
  [self.model setPassword:password];
  __weak typeof(self) weakSelf = self;
  [self.authService signUpWithUsername:username password:password email:email
                            completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      if (error.code == AmplifyBridgeErrorAuthErrorUsernameExists) {
        [strongSelf resendCodeForSameUser:email
                                 password:password];
        return;
      };
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
  }];
}

- (void)resendCodeForSameUser:(NSString *)email
                     password:(NSString *)password {
  __weak typeof(self) weakSelf = self;
  [self.authService resendSignUpCodeEMail:email
                               completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
  }];
  return;
}

- (void)confirmSignUpForEMail:(NSString *)email code:(NSString *)code {
  [self.model setState:UserModelStateConfirmCodeInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService confirmSignUpForEMail:email code:code completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
      return;
    }
    __weak typeof(strongSelf) weakSelf = strongSelf;
    [strongSelf signIn:strongSelf.model.email password:strongSelf.model.password
            completion:^(NSError * _Nullable error){
      __weak typeof(weakSelf) strongSelf = weakSelf;
      if (error != nil) {
        if (error.code == AmplifyBridgeErrorAuthErrorNotAuthorized) {
          // NOTE: if we cannot auto sign in after sign up, than let user reset password.
          // https://github.com/radzima-green-travel/green-travel-combine/issues/465
          [strongSelf.model setState:UserModelStatePasswordResetConfirmCodeNotSent];
          return;
        }
        [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
        return;
      }
      [strongSelf.model setState:UserModelStateSignUpSuccess];
    }];
  }];
}

- (void)resendSignUpCodeForEMail:(NSString *)email {
  [self.model setState:UserModelStateSignUpEmailInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService resendSignUpCodeEMail:email completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
  }];
}

- (void)initiateSignOut {
  [self.model setState:UserModelStateSignOutInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService signOutWithCompletion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateSignUpSuccess];
      return;
    }
    [strongSelf.model setState:UserModelStateFetched];
  }];
}

- (void)reset {
  __weak typeof(self) weakSelf = self;
  [self.authService fetchCurrentAuthSession:^(NSError * _Nullable error, BOOL signedIn) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    [strongSelf.model setSignedIn:signedIn];
    if (error != nil) {
      [strongSelf.model setState:UserModelStateNotFetched];
      return;
    }
    if (!signedIn) {
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [self fetchUserAttributesAndSetUserState:UserModelStateSignedIn
                               fallbackState:UserModelStateFetched];
  }];
}

@end
