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
  [self.authService fetchCurrentAuthSession:^(NSError * _Nonnull error, BOOL signedIn) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    [strongSelf.model setSignedIn:signedIn];
    [strongSelf.model setState:UserModelStateFetched];
  }];
}

- (void)initiateSignIn:(NSString *)username password:(NSString *)password {
  [self.model setState:UserModelStateSignInInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService signInWithUsername:username password:password
                            completion:^(NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateNotSignedIn];
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
    UserState *state = [UserState new];
    [state setInProgress:NO];
    [state setError:error == nil];
    if (error != nil) {
      [strongSelf.model setState:UserModelStateFetched];
      return;
    }
    [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
  }];
}

- (void)confirmSignUpForEMail:(NSString *)email code:(NSString *)code {
  [self.model setState:UserModelStateConfirmCodeInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService confirmSignUpForEMail:email code:code completion:^(NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
      return;
    }
    __weak typeof(strongSelf) weakSelf = strongSelf;
    [self signIn:strongSelf.model.email password:strongSelf.model.password
      completion:^(NSError * _Nonnull error){
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
  [self.model setState:UserModelStateConfirmCodeInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService resendSignUpCodeEMail:email completion:^(NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateConfirmCodeNotSent];
      return;
    }
    [strongSelf.model setState:UserModelStateSignUpSuccess];
  }];
}

@end
