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

@interface UserController()

@property(strong, nonatomic) UserModel *model;
@property(strong, nonatomic) AuthService *authService;

@end

@implementation UserController

- (instancetype)initWithModel:(UserModel *)model
                  authService:(nonnull AuthService *)authService {
  self = [super init];
  if (self) {
    _model = model;
    _authService = authService;
  }
  return self;
}

- (void)fetchCurrentAuthSession {
  [self.model setState:UserModelStateFetchingInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService fetchCurrentAuthSession:^(NSError * _Nullable error, BOOL signedIn) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    [strongSelf.model setSignedIn:signedIn];
    [strongSelf.model setState:UserModelStateFetched];
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
    [strongSelf.model setState:UserModelStateSignedIn];
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
      [strongSelf.model setState:UserModelStatePasswordResetSuccess];
    }];
  }];
}

- (BOOL)usingTheSameEMailAndPassword:(NSString *)email
                            password:(NSString *)password {
  return [self.model.email isEqualToString:email] &&
  [self.model.password isEqualToString:password];
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
      [strongSelf.model setState:UserModelStateFetched];
      
      if ([strongSelf usingTheSameEMailAndPassword:error
                                             email:email
                                          password:password]) {
        [strongSelf resendCodeForSameUser:email
                                 password:password];
        return;
      };
      return;
    }
    [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
    [self.model setEmailUserOnSignUp:email];
    [self.model setPasswordUsedOnSignUp:password];
  }];
}

- (void)resendCodeForSameUser:(NSString *)email
                     password:(NSString *)password {
  [self.model setState:UserModelStateSignUpEmailInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService resendSignUpCodeEMail:email
                               completion:^(NSError * _Nullable error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      if (error.code == AmplifyBridgeErrorAuthErrorUsernameExists &&
          [self usingTheSameEMailAndPassword:email password:password]) {
        [self.authService resendSignUpCodeEMail:email completion:^(NSError * _Nonnull) {
                  
        }];
      }
      
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
  }];
  return;
}

- (BOOL)usingTheSameEMailAndPassword:(NSError *)error
                               email:(NSString *)email
                            password:(NSString *)password {
  return error.code == AmplifyBridgeErrorAuthErrorUsernameExists &&
  [self.model.emailUserOnSignUp isEqualToString:email] &&
  [self.model.passwordUsedOnSignUp isEqualToString:password];
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

@end
