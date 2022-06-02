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

@interface CodeConfirmationViewController ()

@property(strong, nonatomic) PassCodeTextField *passCodeField;
@property(strong, nonatomic) UILabel *hintLabel;
@property(strong, nonatomic) UILabel *titleLabel;
@property(strong, nonatomic) CommonButton *buttonSubmit;
@property(strong, nonatomic) UIButton *buttonRetry;

@end

@implementation CodeConfirmationViewController

- (void)viewDidLoad {
  [super viewDidLoad];

  self.title = NSLocalizedString(@"CodeConfirmationScreenTitle", @"");

  self.titleLabel = [[UILabel alloc] init];
  NSAttributedString *header = [[Typography get] codeConfirmationHeader:NSLocalizedString(@"CodeConfirmationScreenHeader", @"")];
  [self.titleLabel setAttributedText:header];
  [self.titleLabel setNumberOfLines:0];
  [self.contentView addSubview:self.titleLabel];
  self.titleLabel.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint activateConstraints:@[
    [self.titleLabel.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.titleLabel.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:150.0],
  ]];

  self.hintLabel = [[UILabel alloc] init];
  NSAttributedString *hint = [[Typography get] codeConfirmationHint:[NSString stringWithFormat:NSLocalizedString(@"CodeConfirmationScreenHint", @""), self.userModel.email]];
  [self.hintLabel setAttributedText:hint];
  [self.hintLabel setNumberOfLines:0];
  [self.contentView addSubview:self.hintLabel];
  self.hintLabel.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint activateConstraints:@[
    [self.hintLabel.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
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
    [self.buttonSubmit.topAnchor constraintEqualToAnchor:self.passCodeField.bottomAnchor constant:25.0],
  ]];
}

- (void)onUserStateUpdate:(nonnull UserState *)emailSendingState {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{

    });
  });
}

- (void)onSubmit:(CommonButton *)sender {
  [self.userController confirmSignUpForEMail:self.userModel.email
                                        code:self.passCodeField.text];
}

@end
