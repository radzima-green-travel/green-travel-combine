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

- (void)fetchCurrentAuthSession {
  [self.amplifyBridge fetchCurrentAuthSessionWithCompletion:
   ^(NSError * _Nonnull err, BOOL signedIn) {
  
  }];
}



@end
