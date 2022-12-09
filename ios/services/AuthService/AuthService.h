//
//  AuthService.h
//  greenTravel
//
//  Created by Alex K on 24.05.22.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class AmplifyBridge;

@interface AuthService : NSObject

- (instancetype)initWithAmplifyBridge:(AmplifyBridge *)amplifyBridge;
- (void)fetchCurrentAuthSession:(void(^)(NSError * _Nonnull, BOOL))completion;
- (void)fetchUserAttributes:(void (^)(NSString * _Nullable userEmail, NSError * _Nullable error))completion;
- (void)signInWithUsername:(NSString *)username
                  password:(NSString *)password
                          completion:(void(^)(NSError * _Nullable))completion;
-(void)initiateAppleSignIn:(UIWindow *)window;
- (void)resetPassword:(NSString *)username
           completion:(void(^)(NSError * _Nullable))completion;
- (void)resetPasswordConfirm:(NSString *)username
                        code:(NSString *)code
                 newPassword:(NSString *)newPassword
                  completion:(void(^)(NSError * _Nullable))completion;
- (void)signUpWithUsername:(NSString *)username
                  password:(NSString *)password
                     email:(NSString *)email
                          completion:(void(^)(NSError * _Nullable))completion;
- (void)confirmSignUpForEMail:(NSString *)email
                            code:(NSString *)code
                   completion:(void (^)(NSError * _Nullable))completion;
- (void)resendSignUpCodeEMail:(NSString *)email
                   completion:(void (^)(NSError * _Nullable))completion;
- (void)signOutWithCompletion:(void (^)(NSError * _Nullable))completion;


@end

NS_ASSUME_NONNULL_END
