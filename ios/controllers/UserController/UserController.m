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
  UserState *state = [UserState new];
  [state setInProgress:YES];
  [self.model setState:UserModelStateSignUpForm];
  
  __weak typeof(self) weakSelf = self;
  [self.authService fetchCurrentAuthSession:^(NSError * _Nonnull error, BOOL signedIn) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
      
    UserState *state = [UserState new];
    [state setInProgress:NO];
    [state setError:error == nil];
    [state setCodeSent:signedIn];
    [strongSelf.model setState:UserModelStateSignUpForm];
  }];
}

- (void)initiateSignUp:(NSString *)email
              username:(NSString *)username
              password:(NSString *)password {
  UserState *state = [UserState new];
  [state setInProgress:YES];
  [self.model setState:UserModelStateSignUpEmailInProgress];
  [self.model setEmail:email];
  
  __weak typeof(self) weakSelf = self;
  [self.authService signUpWithUsername:username password:password email:email
                            completion:^(NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    UserState *state = [UserState new];
    [state setInProgress:NO];
    [state setError:error == nil];
    if (error != nil) {
      [strongSelf.model setState:UserModelStateSignUpForm];
      return;
    }
    [strongSelf.model setState:UserModelStateCodeConfirmForm];
  }];
}

- (void)confirmSignUpForEMail:(NSString *)email code:(NSString *)code {
  [self.model setState:UserModelStateCodeConfirmInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService confirmSignUpForEMail:email code:code completion:^(NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateCodeConfirmForm];
      return;
    }
    [strongSelf.model setState:UserModelStateSignUpSuccess];
  }];
}

- (void)resendSignUpCodeForEMail:(NSString *)email {
  [self.model setState:UserModelStateCodeConfirmInProgress];
  __weak typeof(self) weakSelf = self;
  [self.authService resendSignUpCodeEMail:email completion:^(NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    if (error != nil) {
      [strongSelf.model setState:UserModelStateCodeConfirmForm];
      return;
    }
    [strongSelf.model setState:UserModelStateSignUpSuccess];
  }];
}

@end
