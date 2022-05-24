//
//  UserController.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface UserController : NSObject

- (void)fetchCurrentAuthSession;
- (void)initiateSignUp:(NSString *)email
              username:(NSString *)username
              password:(NSString *)email;

@end

NS_ASSUME_NONNULL_END
