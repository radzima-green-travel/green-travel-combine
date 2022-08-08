//
//  ResetPasswordRequestViewController.m
//  greenTravel
//
//  Created by Alex K on 13.07.22.
//

#import "ResetPasswordRequestViewController.h"
#import "ResetPasswordPassCodeViewController.h"
#import "UserModel.h"
#import "UserController.h"
#import "CommonTextField.h"
#import "CommonButton.h"
#import "Typography.h"
#import "UserModelConstants.h"
#import "ResetPasswordPassCodeViewController.h"
#import "CommonFormConstants.h"

@interface ResetPasswordRequestViewController ()

@property(strong, nonatomic) UILabel *hintLabel;
@property(strong, nonatomic) UILabel *titleLabel;
@property(strong, nonatomic) CommonButton *buttonSubmit;
@property(assign, nonatomic) BOOL shownKeyboard;
@property(assign, nonatomic) BOOL shouldNavigateToCodeScreen;
@property(assign, nonatomic) BOOL initialLoad;

@end

@implementation ResetPasswordRequestViewController

- (void)viewDidLayoutSubviews {
  [self.hintLabel setPreferredMaxLayoutWidth:self.view.frame.size.width -
   CommonFormMinContentInset * 2];
}

- (void)viewDidLoad {
  [super viewDidLoad];
  self.title = NSLocalizedString(@"ResetPasswordRequestScreenTitle", @"");

  self.titleLabel = [[UILabel alloc] init];
  NSAttributedString *header = [[Typography get] formHeader:NSLocalizedString(@"ResetPasswordRequestScreenHeader", @"")];
  [self.titleLabel setAttributedText:header];
  [self.titleLabel setNumberOfLines:0];
  [self.titleLabel setTextAlignment:NSTextAlignmentCenter];
  [self.contentView addSubview:self.titleLabel];
  self.titleLabel.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint activateConstraints:@[
    [self.titleLabel.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.titleLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.contentView.leadingAnchor],
    [self.titleLabel.trailingAnchor constraintLessThanOrEqualToAnchor:self.contentView.trailingAnchor],
    [self.titleLabel.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:CommonFormContentTopOffset],
  ]];

  self.hintLabel = [[UILabel alloc] init];
  NSAttributedString *hint = [[Typography get] codeConfirmationHint:[NSString stringWithFormat:NSLocalizedString(@"ResetPasswordRequestScreenHint", @""), self.userModel.email]];
  [self.hintLabel setAttributedText:hint];
  [self.hintLabel setNumberOfLines:0];
  [self.hintLabel setTextAlignment:NSTextAlignmentCenter];
  [self.contentView addSubview:self.hintLabel];
  self.hintLabel.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint activateConstraints:@[
    [self.hintLabel.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.hintLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.contentView.leadingAnchor],
    [self.hintLabel.trailingAnchor constraintLessThanOrEqualToAnchor:self.contentView.trailingAnchor],
    [self.hintLabel.topAnchor constraintEqualToAnchor:self.titleLabel.bottomAnchor constant:20.0],
  ]];

  self.buttonSubmit = [[CommonButton alloc] initWithTarget:self
                                                    action:@selector(onSubmit:)
                                                     label:NSLocalizedString(@"ResetPasswordRequestScreenSubmit", @"")];
  self.buttonSubmit.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.buttonSubmit];

  [NSLayoutConstraint activateConstraints:@[
    [self.buttonSubmit.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.buttonSubmit.topAnchor constraintEqualToAnchor:self.hintLabel.bottomAnchor constant:CommonFormLabelAndButtonSpace],
    [self.buttonSubmit.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor],
    [self.buttonSubmit.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
    [self.buttonSubmit.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor constant:CommonFormButtonBottomSpace],
  ]];
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState toCurrentState:(UserModelState)currentState {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      if (currentState == UserModelStatePasswordEmailInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStatePasswordResetConfirmCodeNotSent && currentState == UserModelStatePasswordResetConfirmCodeInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (currentState == UserModelStatePasswordResetConfirmCodeInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStatePasswordEmailInProgress && currentState == UserModelStateFetched) {
        [self enableLoadingIndicator:NO];
        return;
      }
      if (prevState == UserModelStatePasswordResetConfirmCodeInProgress && currentState == UserModelStatePasswordResetConfirmCodeNotSent) {
        [self enableLoadingIndicator:NO];
        return;
      }
      if (prevState == UserModelStatePasswordEmailInProgress && currentState == UserModelStatePasswordResetConfirmCodeNotSent &&
          self.shouldNavigateToCodeScreen) {
        ResetPasswordPassCodeViewController *resetPasswordPassCodeViewController =
        [[ResetPasswordPassCodeViewController alloc] initWithController:self.userController
                                                                  model:self.userModel];
        [self.navigationController pushViewController:resetPasswordPassCodeViewController
                                             animated:YES];
        self.shouldNavigateToCodeScreen = NO;
        return;
      }
      if (prevState == UserModelStatePasswordEmailInProgress && currentState == UserModelStatePasswordResetConfirmCodeNotSent &&
          !self.shouldNavigateToCodeScreen) {
        [self enableLoadingIndicator:NO];
        return;
      }
    });
  });
}

- (void)onSubmit:(CommonButton *)sender {
  self.shouldNavigateToCodeScreen = YES;
  [self.userController initiateResetPassword:self.userModel.email];
  [self.view endEditing:YES];
}

@end
