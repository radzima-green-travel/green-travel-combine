//
//  ProfileRootViewController.h
//  greenTravel
//
//  Created by Alex K on 8.06.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"
#import "BaseViewController.h"

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface ProfileRootViewController : BaseViewController<UserModelObserver>

@property (strong, nonatomic) UserController *userController;
@property (strong, nonatomic) UserModel *userModel;
- (instancetype)initWithController:(UserController *)controller
                             model:(UserModel *)model;
- (void)showProfileViewController;
- (void)showLoginViewController;

@end

NS_ASSUME_NONNULL_END
