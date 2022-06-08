//
//  ProfileViewController.h
//  greenTravel
//
//  Created by Alex K on 8.06.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface ProfileViewController : UIViewController

@property (strong, nonatomic) UserController *userController;
@property (strong, nonatomic) UserModel *userModel;
- (instancetype)initWithController:(UserController *)controller
                             model:(UserModel *)model;

@end

NS_ASSUME_NONNULL_END
