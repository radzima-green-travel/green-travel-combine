//
//  CommonTextField.m
//  greenTravel
//
//  Created by Alex K on 21.05.22.
//

#import "CommonTextField.h"
#import "Colors.h"

@interface CommonTextField()

@property (strong, nonatomic) UIImageView *imageView;

@end

@implementation CommonTextField

- (instancetype)initWithImageName:(NSString *)imageName
                     keyboardType:(UIKeyboardType)keyboardType
                      placeholder:(NSString *)placeholder
{
  self = [self initWithFrame:CGRectZero];
  if (self) {
    [self setUp:imageName keyboardType:keyboardType placeholder:placeholder];
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].textFieldBackground;
}

- (void)setUp:(NSString *)imageName
 keyboardType:(UIKeyboardType)keyboardType
  placeholder:(NSString *)placeholder {
  self.translatesAutoresizingMaskIntoConstraints = NO;
  self.backgroundColor = [Colors get].background;
  [NSLayoutConstraint activateConstraints:@[
    [self.heightAnchor constraintEqualToConstant:40.0],
  ]];
  
  self.imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:imageName]];
  [self addSubview:self.imageView];
  self.imageView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.imageView.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
    [self.imageView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:12.0],
    [self.imageView.widthAnchor constraintEqualToConstant:16.0],
    [self.imageView.heightAnchor constraintEqualToConstant:16.0],
  ]];
  
  self.textField = [[UITextField alloc] init];
  [self addSubview:self.textField];
  self.textField.translatesAutoresizingMaskIntoConstraints = NO;
  [self.textField setKeyboardType:keyboardType];
  self.trailingConstraint = [self.textField.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-12.0];
  [NSLayoutConstraint activateConstraints:@[
    [self.textField.heightAnchor constraintEqualToAnchor:self.heightAnchor],
    [self.textField.leadingAnchor constraintEqualToAnchor:self.imageView.trailingAnchor constant:8.0],
    self.trailingConstraint,
  ]];
  [self.textField setPlaceholder:placeholder];
  
  self.layer.borderColor = [[Colors get].bottomSheetGrip CGColor];
  self.layer.borderWidth = 1.0;
  self.layer.cornerRadius = 2.0;
}

@end
