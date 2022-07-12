//
//  BaseFormViewController.h
//  greenTravel
//
//  Created by Alex K on 1.06.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"
#import "CommonTextField.h"

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface BaseFormViewController : UIViewController<UserModelObserver, UITextFieldDelegate>


@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) UIView *contentView;
@property (strong, nonatomic) UserController *userController;
@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) UIActivityIndicatorView *loadingView;

- (instancetype)initWithController:(UserController *)controller
                   model:(UserModel *)model;
- (void)onUserStateUpdate:(nonnull UserState *)emailSendingState;
- (void)enableLoadingIndicator:(BOOL)enable;
- (void)textFieldDidEndEditing:(CommonTextField *)textField;

@end

NS_ASSUME_NONNULL_END
