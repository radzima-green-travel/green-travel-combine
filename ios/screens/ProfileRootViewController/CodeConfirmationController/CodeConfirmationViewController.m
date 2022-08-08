//
//  CodeConfirmationViewController.m
//  greenTravel
//
//  Created by Alex K on 28.05.22.
//

#import "CodeConfirmationViewController.h"
#import "PassCodeTextField.h"
#import "UserController.h"
#import "UserModel.h"
#import "CommonButton.h"
#import "Typography.h"
#import "Colors.h"
#import "UIButtonHighlightable.h"
#import "CommonFormConstants.h"
#import "ResetPasswordRequestViewController.h"

@interface CodeConfirmationViewController ()

@property(strong, nonatomic) PassCodeTextField *passCodeField;
@property(strong, nonatomic) UILabel *hintLabel;
@property(strong, nonatomic) UILabel *titleLabel;
@property(strong, nonatomic) CommonButton *buttonSubmit;
@property(strong, nonatomic) UIButton *buttonRetry;
@property(assign, nonatomic) BOOL shownKeyboard;
@property(assign, nonatomic) BOOL navigatedToCodeScreen;

@end

@implementation CodeConfirmationViewController

- (void)viewDidLayoutSubviews {
  [self.hintLabel setPreferredMaxLayoutWidth:self.view.frame.size.width -
   CommonFormMinContentInset * 2];
}

- (void)viewDidLoad {
  [super viewDidLoad];

  self.title = NSLocalizedString(@"CodeConfirmationScreenTitle", @"");

  self.titleLabel = [[UILabel alloc] init];
  NSAttributedString *header = [[Typography get] formHeader:NSLocalizedString(@"CodeConfirmationScreenHeader", @"")];
  [self.titleLabel setAttributedText:header];
  [self.titleLabel setNumberOfLines:0];
  [self.titleLabel setTextColor:[Colors get].headlineText];
  [self.titleLabel setTextAlignment:NSTextAlignmentCenter];
  [self.contentView addSubview:self.titleLabel];
  self.titleLabel.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint activateConstraints:@[
    [self.titleLabel.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.titleLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.contentView.leadingAnchor],
    [self.titleLabel.trailingAnchor constraintLessThanOrEqualToAnchor:self.contentView.trailingAnchor],
    [self.titleLabel.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:150.0],
  ]];

  self.hintLabel = [[UILabel alloc] init];
  NSAttributedString *hint = [[Typography get] codeConfirmationHint:[NSString stringWithFormat:NSLocalizedString(@"CodeConfirmationScreenHint", @""), self.userModel.email]];
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

  self.passCodeField = [[PassCodeTextField alloc] init];
  self.passCodeField.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.passCodeField];

  [NSLayoutConstraint activateConstraints:@[
    [self.passCodeField.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.passCodeField.topAnchor constraintEqualToAnchor:self.hintLabel.bottomAnchor constant:20.0],
  ]];

  self.buttonSubmit = [[CommonButton alloc] initWithTarget:self
                                                    action:@selector(onSubmit:)
                                                     label:NSLocalizedString(@"CodeConfirmationScreenSubmit", @"")];
  self.buttonSubmit.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.buttonSubmit];

  [NSLayoutConstraint activateConstraints:@[
    [self.buttonSubmit.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.buttonSubmit.topAnchor constraintEqualToAnchor:self.passCodeField.bottomAnchor constant:25.0]
  ]];
  
  self.buttonRetry = [[UIButtonHighlightable alloc] init];
  self.buttonRetry.translatesAutoresizingMaskIntoConstraints = NO;
  [self.buttonRetry setTintColor:[Colors get].buttonTextTint];
  NSAttributedString *label = [[Typography get] textButtonLabel:NSLocalizedString(@"CodeConfirmationScreenRetry", @"")];
  [self.buttonRetry setAttributedTitle:label forState:UIControlStateNormal];
  [self.buttonRetry addTarget:self action:@selector(onRetry:) forControlEvents:UIControlEventTouchUpInside];
  
  [self.contentView addSubview:self.buttonRetry];

  [NSLayoutConstraint activateConstraints:@[
    [self.buttonRetry.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.buttonRetry.topAnchor constraintEqualToAnchor:self.buttonSubmit.bottomAnchor constant:25.0],
    [self.buttonRetry.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor constant:-25.0]
  ]];
}

- (void)viewDidAppear:(BOOL)animated {
  if (!self.shownKeyboard) {
    self.shownKeyboard = YES;
    [self.passCodeField becomeFirstResponder];
  }
}

- (void)viewDidDisappear:(BOOL)animated {
  [super viewDidDisappear:animated];
  if (self.navigatedToCodeScreen) {
    [self enableLoadingIndicator:NO];
  };
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState toCurrentState:(UserModelState)currentState {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      if (prevState == UserModelStateConfirmCodeNotSent && currentState == UserModelStateConfirmCodeInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStateConfirmCodeNotSent && currentState == UserModelStateSignUpEmailInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress && currentState == UserModelStateConfirmCodeNotSent) {
        [self enableLoadingIndicator:NO];
        [self.passCodeField setText:@""];
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress && currentState == UserModelStatePasswordResetConfirmCodeNotSent &&
          !self.navigatedToCodeScreen) {
        ResetPasswordRequestViewController *resetPasswordRequestViewController =
        [[ResetPasswordRequestViewController alloc] initWithController:self.userController
                                                                 model:self.userModel];
        [self.navigationController pushViewController:resetPasswordRequestViewController
                                             animated:YES];
        self.navigatedToCodeScreen = YES;
        return;
      }
      if (prevState == UserModelStateSignUpEmailInProgress && currentState == UserModelStateConfirmCodeNotSent) {
        [self enableLoadingIndicator:NO];
        [self.passCodeField setText:@""];
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress && currentState == UserModelStateSignUpSuccess) {
        // Success case is handled by ProfileRootViewController.
      }
    });
  });
}

- (void)onSubmit:(CommonButton *)sender {
  [self.userController confirmSignUpForEMail:self.userModel.email
                                        code:self.passCodeField.text];
  [self.view endEditing:YES];
}

- (void)onRetry:(UIButton *)sender {
  [self.userController resendSignUpCodeForEMail:self.userModel.email];
}

@end
