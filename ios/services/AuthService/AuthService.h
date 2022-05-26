//
//  AuthService.h
//  greenTravel
//
//  Created by Alex K on 24.05.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class AmplifyBridge;

@interface AuthService : NSObject

- (instancetype)initWithAmplifyBridge:(AmplifyBridge *)amplifyBridge;
- (void)fetchCurrentAuthSession:(void(^)(NSError * _Nonnull, BOOL))completion;
- (void)signUpWithUsername:(NSString *)username
                  password:(NSString *)password
                     email:(NSString *)email
                          completion:(void(^)(NSError * _Nonnull))completion;
- (void)confirmSignUp:(void(^)(NSError * _Nonnull))completion;

@end

NS_ASSUME_NONNULL_END
