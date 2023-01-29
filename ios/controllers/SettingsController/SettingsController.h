//
//  SettingsController.h
//  greenTravel
//
//  Created by Alex K on 20.12.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class SettingsEntry;
@class SettingsModel;
@class UserModel;
@class UserController;

@interface SettingsController : NSObject<UserModelObserver>

- (instancetype)initWithModel:(SettingsModel *)settingsModel
               userController:(UserController *)userController
                             userModel:(UserModel *)userModel;

- (void)interactWithSetting:(SettingsEntry *)entry
           onViewController:(UIViewController *)viewController;

@end

NS_ASSUME_NONNULL_END
