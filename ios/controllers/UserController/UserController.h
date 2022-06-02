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
- (void)initiateSignUp:(NSString *)email
              username:(NSString *)username
              password:(NSString *)email;
- (void)confirmSignUpForEMail:(NSString *)email
                            code:(NSString *)code;

@end

NS_ASSUME_NONNULL_END
