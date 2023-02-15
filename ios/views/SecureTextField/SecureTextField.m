//
//  SecureTextField.m
//  greenTravel
//
//  Created by Alex K on 21.05.22.
//

#import "SecureTextField.h"
#import "Colors.h"

@interface SecureTextField()

@property (strong, nonatomic) UIButton *secureModeButton;
@property (strong, nonatomic) UIView *delimiterView;
@property (assign, nonatomic) BOOL secureEntry;

@end


@implementation SecureTextField

- (void)setCreatingPassword:(BOOL)creatingPassword {
  _creatingPassword = creatingPassword;
  if (creatingPassword) {
    [self.textField setTextContentType:UITextContentTypeNewPassword];
  }
  [self.textField setTextContentType:UITextContentTypePassword];
}

- (void)setUp:(NSString *)imageName
 keyboardType:(UIKeyboardType)keyboardType
  placeholder:(NSString *)placeholder {
  [super setUp:imageName keyboardType:keyboardType placeholder:placeholder];
  
  [NSLayoutConstraint deactivateConstraints:@[
    self.trailingConstraint
  ]];
  
  
  self.secureModeButton = [[UIButton alloc] initWithFrame:CGRectZero];
  [self.secureModeButton setImage:[UIImage imageNamed:@"eye"]
                         forState:UIControlStateNormal];
  [self.secureModeButton setImage:[UIImage imageNamed:@"eye-crossed"]
                         forState:UIControlStateSelected];
  [self.secureModeButton addTarget:self action:@selector(onSecureModeToggle:)
                  forControlEvents:UIControlEventTouchUpInside];
  
  [self addSubview:self.secureModeButton];
  self.secureModeButton.translatesAutoresizingMaskIntoConstraints = NO;
  
  self.trailingConstraint = [self.textField.trailingAnchor
                             constraintEqualToAnchor:self.secureModeButton.leadingAnchor constant:0.0];
  [NSLayoutConstraint activateConstraints:@[
    [self.secureModeButton.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
    [self.secureModeButton.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
    [self.secureModeButton.heightAnchor constraintEqualToAnchor:self.heightAnchor],
    [self.secureModeButton.widthAnchor constraintEqualToAnchor:self.heightAnchor],
    
    self.trailingConstraint
  ]];
  
  self.delimiterView = [[UIView alloc] initWithFrame:CGRectZero];
  self.delimiterView.backgroundColor = [Colors get].textFieldBorderColor;
  
  [self addSubview:self.delimiterView];
  self.delimiterView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.delimiterView.heightAnchor constraintEqualToAnchor:self.heightAnchor],
    [self.delimiterView.widthAnchor constraintEqualToConstant:1.0],
    [self.delimiterView.trailingAnchor constraintEqualToAnchor:self.secureModeButton.leadingAnchor],
  ]];
  
  self.secureEntry = NO;
  [self onSecureModeToggle:self.secureModeButton];
}

- (void)onSecureModeToggle:(UIButton *)sender {
  self.secureEntry = !self.secureEntry;
  [self.textField setSecureTextEntry:self.secureEntry];
  [self.secureModeButton setSelected:!self.secureEntry];
}

@end
