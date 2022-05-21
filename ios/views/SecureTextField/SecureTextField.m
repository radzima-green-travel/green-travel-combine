//
//  SecureTextField.m
//  greenTravel
//
//  Created by Alex K on 21.05.22.
//

#import "SecureTextField.h"

@interface SecureTextField()

@property (strong, nonatomic) UIButton *secureModeButton;

@end


@implementation SecureTextField

- (void)setUp:(NSString *)imageName
  placeholder:(NSString *)placeholder {
  [super setUp:imageName placeholder:placeholder];
  
  [NSLayoutConstraint deactivateConstraints:@[
  ]];
  
  self.secureModeButton = [[UIButton alloc] initWithFrame:CGRectZero];
  [self.secureModeButton setImage:[UIImage imageNamed:@""]
                         forState:UIControlStateNormal];
  [self.secureModeButton addTarget:self action:@selector(onSecureModeToggle:)
                  forControlEvents:UIControlEventTouchUpInside];
  
  [self addSubview:self.secureModeButton];
  self.secureModeButton.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.secureModeButton.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
    [self.secureModeButton.leadingAnchor constraintEqualToAnchor:self.textField.trailingAnchor constant:0.0],
    [self.secureModeButton.heightAnchor constraintEqualToAnchor:self.heightAnchor],
    [self.secureModeButton.widthAnchor constraintEqualToAnchor:self.heightAnchor],
  ]];
  [self.textField setSecureTextEntry:YES];
}

- (void)onSecureModeToggle:(UIButton *)sender {
  [self.textField setSecureTextEntry:!self.textField.secureTextEntry];
}

@end
