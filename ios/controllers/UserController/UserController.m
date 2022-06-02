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
  [self.model setEmailSendingState:state];
  
  __weak typeof(self) weakSelf = self;
  [self.authService fetchCurrentAuthSession:^(NSError * _Nonnull error, BOOL signedIn) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
      
    UserState *state = [UserState new];
    [state setInProgress:NO];
    [state setError:error == nil];
    [state setCodeSent:signedIn];
    [strongSelf.model setEmailSendingState:state];
  }];
}

- (void)initiateSignUp:(NSString *)email
              username:(NSString *)username
              password:(NSString *)password {
  UserState *state = [UserState new];
  [state setInProgress:YES];
  [self.model setEmailSendingState:state];
  [self.model setEmail:email];
  
  __weak typeof(self) weakSelf = self;
  [self.authService signUpWithUsername:username password:password email:email
                            completion:^(NSError * _Nonnull error) {
    __weak typeof(weakSelf) strongSelf = weakSelf;
    UserState *state = [UserState new];
    [state setInProgress:NO];
    [state setError:error == nil];
    [strongSelf.model setEmailSendingState:state];
  }];
}

- (void)confirmSignUpForEMail:(NSString *)email code:(NSString *)code {
  
  
  __weak typeof(self) weakSelf = self;
  [self.authService confirmSignUpForEMail:email code:code completion:^(NSError * _Nonnull) {
    
  }];
}

@end
