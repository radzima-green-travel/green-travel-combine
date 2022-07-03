//
//  AuthService.m
//  greenTravel
//
//  Created by Alex K on 24.05.22.
//

#import "AuthService.h"
#import "AmplifyBridge.h"

@interface AuthService()

@property(strong, nonatomic) AmplifyBridge *amplifyBridge;

@end

@implementation AuthService

- (instancetype)initWithAmplifyBridge:(AmplifyBridge *)amplifyBridge {
  self = [super init];
  if (self) {
    _amplifyBridge = amplifyBridge;
  }
  return self;
}

- (void)fetchCurrentAuthSession:(void (^)(NSError * _Nullable, BOOL))completion {
  [self.amplifyBridge fetchCurrentAuthSessionWithCompletion:^(NSError * _Nullable error, BOOL signedIn) {
    completion(error, signedIn);
  }];
}

- (void)signInWithUsername:(NSString *)username password:(NSString *)password
                completion:(void (^)(NSError * _Nullable))completion {
  [self.amplifyBridge signInUsername:username password:password completion:^(NSError * _Nullable error) {
    completion(error);
  }];
}

- (void)resetPassword:(NSString *)username completion:(void (^)(NSError * _Nullable))completion {
  [self.amplifyBridge resetPasswordWithUsername:username completion:^(NSError * _Nullable error) {
    completion(error);
  }];
}

- (void)resetPasswordConfirm:(NSString *)username code:(NSString *)code newPassword:(NSString *)newPassword completion:(void (^)(NSError * _Nullable))completion {
  [self.amplifyBridge resetPasswordConfirmWithUsername:username code:code newPassword:newPassword completion:^(NSError * _Nullable error) {
    completion(error);
  }];
}

- (void)signUpWithUsername:(NSString *)username password:(NSString *)password email:(NSString *)email completion:(void (^)(NSError * _Nullable))completion {
  [self.amplifyBridge signUpWithUsername:username password:password email:email completion:^(NSError * _Nullable error) {
    completion(error);
  }];
}

- (void)confirmSignUpForEMail:(NSString *)email code:(NSString *)code
                   completion:(void (^)(NSError * _Nullable))completion {
  [self.amplifyBridge confirmSignUpFor:email with:code completion:^(NSError * _Nullable error) {
    completion(error);
  }];
}

- (void)resendSignUpCodeEMail:(NSString *)email
                   completion:(void (^)(NSError * _Nullable))completion {
  [self.amplifyBridge resendSignUpCodeFor:email completion:^(NSError * _Nullable error) {
    completion(error);
  }];
}

- (void)signOutWithCompletion:(void (^)(NSError * _Nonnull))completion {
  [self.amplifyBridge logOutWithCompletion:^(NSError * _Nullable error) {
    completion(error);
  }];
}

@end
