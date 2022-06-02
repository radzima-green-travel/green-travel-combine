//
//  ProfileViewController.h
//  greenTravel
//
//  Created by Alex K on 19.05.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"
#import "BaseFormViewController.h"

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface ProfileViewController : BaseFormViewController<UserModelObserver>

- (instancetype)initWithController:(UserController *)controller
                   model:(UserModel *)model;

@end

NS_ASSUME_NONNULL_END
