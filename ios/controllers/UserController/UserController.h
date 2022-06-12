//
//  UserController.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class UserModel;
@class AuthService;

@interface UserController : NSObject

- (instancetype)initWithModel:(UserModel *)model authService:(AuthService *)authService;
- (void)fetchCurrentAuthSession;
- (void)initiateSignIn:(NSString *)username
              password:(NSString *)password;
- (void)initiateSignUp:(NSString *)email
              username:(NSString *)username
              password:(NSString *)password;
- (void)confirmSignUpForEMail:(NSString *)email
                            code:(NSString *)code;
- (void)resendSignUpCodeForEMail:(NSString *)email;

@end

NS_ASSUME_NONNULL_END
