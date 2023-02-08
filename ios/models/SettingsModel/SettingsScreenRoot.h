//
//  SettingsScreenRoot.h
//  greenTravel
//
//  Created by Alex K on 8.02.23.
//

#import "SettingsScreen.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface SettingsScreenRoot : SettingsScreen

- (instancetype)initWithUserController:(UserController *)userController
                             userModel:(UserModel *)userModel;

@end

NS_ASSUME_NONNULL_END
