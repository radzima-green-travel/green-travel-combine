//
//  ProfileTableViewController.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 23.07.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"
#import "BaseFormViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface ProfileTableViewController : UIViewController<UserModelObserver, UITableViewDelegate, UITableViewDataSource>

@property (strong, nonatomic) UserController *userController;
@property (strong, nonatomic) UserModel *userModel;

- (instancetype)initWithController:(UserController *)controller model:(UserModel *)model;

@end

NS_ASSUME_NONNULL_END
