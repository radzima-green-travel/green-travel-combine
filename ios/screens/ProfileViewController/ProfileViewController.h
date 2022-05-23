//
//  ProfileViewController.h
//  greenTravel
//
//  Created by Alex K on 19.05.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface ProfileViewController : UIViewController

- (instancetype)initWithController:(UserController *)controller
                   model:(UserModel *)model;

@end

NS_ASSUME_NONNULL_END
