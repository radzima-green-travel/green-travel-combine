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
- (void)fetchCurrentAuthSession:^(NSError * _Nonnull err, BOOL signedIn)completion;

@end

NS_ASSUME_NONNULL_END
