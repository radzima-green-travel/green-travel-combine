//
//  SignInFormView.m
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import "SignInFormView.h"
#import "Colors.h"
#import "CommonTextField.h"
#import "SecureTextField.h"
#import "CommonButton.h"
#import "UIButtonHighlightable.h"
#import "Typography.h"

@interface SignInFormView() <UITextFieldDelegate>

@property (strong, nonatomic) UILabel *titleLabel;
@property (strong, nonatomic) UIButtonHighlightable *forgotPasswordButton;
@property (strong, nonatomic) SecureTextField *textFieldPass;
@property (strong, nonatomic) CommonButton *submitButton;
@property (copy, nonatomic) void(^onSubmit)(NSString *, NSString *, NSString *);
@property (copy, nonatomic) void(^onForgotPasswordSubmit)(void);

@end

@implementation SignInFormView

- (instancetype)initWithOnSubmit:(void (^)(NSString *, NSString *, NSString *))onSumbit
          onForgotPasswordSubmit:(nonnull void (^)(void))onForgotPasswordSubmit{
  self = [self initWithFrame:CGRectZero];
  if (self) {
    [self setUp];
    _onSubmit = onSumbit;
    _onForgotPasswordSubmit = onForgotPasswordSubmit;
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
}

- (void)setUp {
  self.translatesAutoresizingMaskIntoConstraints = NO;
  self.backgroundColor = [Colors get].background;
  self.backgroundColor = [UIColor yellowColor];
  
  self.titleLabel = [[UILabel alloc] init];
  [self addSubview:self.titleLabel];
  self.titleLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.titleLabel.topAnchor constraintEqualToAnchor:self.topAnchor constant:90.0],
      [self.titleLabel.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
      [self.titleLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.leadingAnchor],
      [self.titleLabel.trailingAnchor constraintLessThanOrEqualToAnchor:self.trailingAnchor],
  ]];
  [self.titleLabel setText:NSLocalizedString(@"ProfileScreenLabelSignIn", @"")];
  
  self.textFieldMail = [[CommonTextField alloc] initWithImageName:@"textfield-mail"
                                                     keyboardType:UIKeyboardTypeEmailAddress
                                                      placeholder:NSLocalizedString(@"ProfileScreenPlaceholderEMail", @"")];
  [self.textFieldMail.textField setTextContentType:UITextContentTypeEmailAddress];
  [self addSubview:self.textFieldMail];
  self.textFieldMail.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.textFieldMail.topAnchor constraintEqualToAnchor:self.titleLabel.bottomAnchor constant:20.0],
      [self.textFieldMail.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.textFieldMail.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
  ]];
  
  
  self.textFieldPass =
  [[SecureTextField alloc] initWithImageName:@"password-lock"
                                keyboardType:UIKeyboardTypeDefault
                                 placeholder:NSLocalizedString(@"ProfileScreenPlaceholderPassword", @"")];
  self.textFieldPass.textField.delegate = self;
  [self.textFieldPass setCreatingPassword:YES];
  [self addSubview:self.textFieldPass];
  self.textFieldPass.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.textFieldPass.topAnchor constraintEqualToAnchor:self.textFieldMail.bottomAnchor constant:12],
      [self.textFieldPass.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.textFieldPass.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
  ]];
  
  self.submitButton =
  [[CommonButton alloc] initWithTarget:self
                                action:@selector(onSubmit:)
                                 label:NSLocalizedString(@"ProfileScreenButtonLabelSignIn", @"")];
  [self addSubview:self.submitButton];
  self.submitButton.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.submitButton.topAnchor constraintEqualToAnchor:self.textFieldPass.bottomAnchor constant:12],
      [self.submitButton.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.submitButton.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
  ]];
  
  self.forgotPasswordButton = [[UIButtonHighlightable alloc] init];
  self.forgotPasswordButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.forgotPasswordButton setTintColor:[Colors get].buttonTextTint];
  NSAttributedString *label = [[Typography get] textButtonLabel:NSLocalizedString(@"ProfileScreenButtonLabelForgotPassword", @"")];
  [self.forgotPasswordButton setAttributedTitle:label forState:UIControlStateNormal];
  [self.forgotPasswordButton addTarget:self action:@selector(onForgotPasswordSubmit:) forControlEvents:UIControlEventTouchUpInside];
  
  [self addSubview:self.forgotPasswordButton];

  [NSLayoutConstraint activateConstraints:@[
    [self.forgotPasswordButton.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
    [self.forgotPasswordButton.topAnchor constraintEqualToAnchor:self.submitButton.bottomAnchor constant:25.0],
    [self.forgotPasswordButton.bottomAnchor constraintLessThanOrEqualToAnchor:self.bottomAnchor constant:-25.0]
  ]];
}

- (void)onSubmit:(CommonButton *)sender {
  [self endEditing:YES];
  NSString *mail = self.textFieldMail.textField.text;
  self.onSubmit(mail, mail, self.textFieldPass.textField.text);
}

- (void)onForgotPasswordSubmit:(UIButtonHighlightable *)sender {
  [self endEditing:YES];
  self.onForgotPasswordSubmit();
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
  [textField resignFirstResponder];
  return YES;
}

@end
