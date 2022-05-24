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
  
}

- (void)initiateSignUp:(NSString *)email
              username:(NSString *)username
              password:(NSString *)password {
        
}

@end
