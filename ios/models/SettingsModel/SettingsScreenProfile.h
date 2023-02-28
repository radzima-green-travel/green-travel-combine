//
//  SettingsScreenProfile.h
//  greenTravel
//
//  Created by Alex K on 4.03.23.
//

#import "SettingsScreen.h"

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface SettingsScreenProfile : SettingsScreen

- (instancetype)initWithUserController:(UserController *)userController
                             userModel:(UserModel *)userModel;

@end

NS_ASSUME_NONNULL_END
