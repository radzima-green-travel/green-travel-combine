//
//  BaseFormViewController.h
//  greenTravel
//
//  Created by Alex K on 1.06.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface BaseFormViewController : UIViewController<UserModelObserver>


@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) UIView *contentView;
@property (strong, nonatomic) UserController *userController;
@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) UIActivityIndicatorView *loadingView;

- (instancetype)initWithController:(UserController *)controller
                   model:(UserModel *)model;
- (void)onUserStateUpdate:(nonnull UserState *)emailSendingState;
- (void)enableLoadingIndicator:(BOOL)enable;

@end

NS_ASSUME_NONNULL_END
