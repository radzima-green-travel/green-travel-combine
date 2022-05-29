//
//  SighUpFormView.m
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import "SignUpFormView.h"
#import "Colors.h"
#import "CommonTextField.h"
#import "SecureTextField.h"
#import "CommonButton.h"

@interface SignUpFormView()

@property (strong, nonatomic) UILabel *titleLabel;
@property (strong, nonatomic) CommonTextField *textFieldMail;
@property (strong, nonatomic) CommonTextField *textFieldPass;
@property (strong, nonatomic) CommonTextField *textFieldPassRepeat;
@property (strong, nonatomic) CommonButton *submitButton;
@property (copy, nonatomic) void(^onSubmit)(NSString *, NSString *, NSString *);

@end

@implementation SignUpFormView

- (instancetype)initWithOnSubmit:(void (^)(NSString *, NSString *, NSString *))onSumbit {
  self = [self initWithFrame:CGRectZero];
  if (self) {
    [self setUp];
    _onSubmit = onSumbit;
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
  [self.titleLabel setText:NSLocalizedString(@"ProfileScreenLabelCreateAccount", @"")];
  
  self.textFieldMail = [[CommonTextField alloc] initWithImageName:@"textfield-mail"
                                                     keyboardType:UIKeyboardTypeEmailAddress
                                                      placeholder:NSLocalizedString(@"ProfileScreenPlaceholderEMail", @"")];
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
  
  [self addSubview:self.textFieldPass];
  self.textFieldPass.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.textFieldPass.topAnchor constraintEqualToAnchor:self.textFieldMail.bottomAnchor constant:12],
      [self.textFieldPass.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.textFieldPass.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
  ]];
  
  self.textFieldPassRepeat =
  [[SecureTextField alloc] initWithImageName:@"password-lock"
                                keyboardType:UIKeyboardTypeDefault
                                 placeholder:NSLocalizedString(@"ProfileScreenPlaceholderPasswordRepeat", @"")];
  self.textFieldPassRepeat.textField.delegate = self;
  
  [self addSubview:self.textFieldPassRepeat];
  self.textFieldPassRepeat.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.textFieldPassRepeat.topAnchor constraintEqualToAnchor:self.textFieldPass.bottomAnchor constant:12],
      [self.textFieldPassRepeat.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.textFieldPassRepeat.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
  ]];
  
  self.submitButton =
  [[CommonButton alloc] initWithTarget:self
                                action:@selector(onSubmit:)
                                 label:NSLocalizedString(@"ProfileScreenButtonLabelCreate", @"")];
  [self addSubview:self.submitButton];
  self.submitButton.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.submitButton.topAnchor constraintEqualToAnchor:self.textFieldPassRepeat.bottomAnchor constant:12],
      [self.submitButton.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.submitButton.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      
      [self.submitButton.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
  ]];
}

- (void)onSubmit:(CommonButton *)sender {
  [self endEditing:YES];
  NSString *mail = self.textFieldMail.textField.text;
  self.onSubmit(mail, mail, self.textFieldPass.textField.text);
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
  [textField resignFirstResponder];
  return YES;
}

@end
