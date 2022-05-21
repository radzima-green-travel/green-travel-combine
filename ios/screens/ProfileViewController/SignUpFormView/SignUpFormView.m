//
//  SighUpFormView.m
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import "SignUpFormView.h"
#import "Colors.h"
#import "CommonTextField.h"

@interface SignUpFormView()

@property (strong, nonatomic) UILabel *titleLabel;
@property (strong, nonatomic) CommonTextField *textFieldMail;
@property (strong, nonatomic) CommonTextField *textFieldNick;
@property (strong, nonatomic) CommonTextField *textFieldPass;

@end

@implementation SignUpFormView

- (instancetype)init {
  self = [self initWithFrame:CGRectZero];
  if (self) {
    [self setUp];
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
                                                      placeholder:@"example@example.com"];
  [self addSubview:self.textFieldMail];
  self.textFieldMail.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.textFieldMail.topAnchor constraintEqualToAnchor:self.titleLabel.bottomAnchor constant:20.0],
      [self.textFieldMail.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.textFieldMail.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
  ]];
  
  self.textFieldNick = [[CommonTextField alloc] initWithImageName:@"textfield-profile"
                                                      placeholder:@"username"];
  [self addSubview:self.textFieldNick];
  self.textFieldNick.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.textFieldNick.topAnchor constraintEqualToAnchor:self.textFieldMail.bottomAnchor constant:12],
      [self.textFieldNick.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.textFieldNick.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
  ]];
  
  self.textFieldPass = [[CommonTextField alloc] initWithImageName:@"password-lock"
                                                      placeholder:@""];
  [self addSubview:self.textFieldPass];
  self.textFieldPass.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.textFieldPass.topAnchor constraintEqualToAnchor:self.textFieldNick.bottomAnchor constant:12],
      [self.textFieldPass.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.textFieldPass.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      
      [self.textFieldPass.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
  ]];
}

@end
