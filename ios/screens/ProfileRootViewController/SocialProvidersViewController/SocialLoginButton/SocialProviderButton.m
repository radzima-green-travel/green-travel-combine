#import "SocialProviderButton.h"

@implementation SocialProviderButton

- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  if (self) {
    self.layer.borderWidth = 1.0;
    self.layer.cornerRadius = 10.0;
    self.imageView.contentMode = UIViewContentModeLeft;
    [self addTarget:self action:@selector(handleTap:) forControlEvents:UIControlEventTouchUpInside];
    [self addTarget:self action:@selector(handleTapUp:) forControlEvents:UIControlEventTouchUpOutside];
    [self addTarget:self action:@selector(handleTapDown:) forControlEvents:UIControlEventTouchDown];

    self.titleLabel.translatesAutoresizingMaskIntoConstraints = NO;
    self.imageView.translatesAutoresizingMaskIntoConstraints = NO;

    [NSLayoutConstraint activateConstraints:@[
      [self.imageView.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
      [self.imageView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:20.0],
      [self.imageView.heightAnchor constraintEqualToConstant:24.0],
      [self.imageView.widthAnchor constraintEqualToConstant:24.0],
      [self.titleLabel.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
      [self.titleLabel.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-20.0],
      [self.titleLabel.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:20.0],
    ]];
  }
  return self;
}

- (void)setBorderColor:(UIColor *)borderColor {
  _borderColor = borderColor;
  self.layer.borderColor = borderColor.CGColor;
}

- (void)setBgColor:(UIColor *)bgColor {
  _bgColor = bgColor;
  self.backgroundColor = bgColor;
}

- (void)setLogoImage:(UIImage *)logoImage {
  [self setImage:logoImage forState:UIControlStateNormal];
}

- (void)layoutSubviews {
  [super layoutSubviews];
}

- (void)handleTap:(id)sender {
  [UIView animateWithDuration:0.2 animations:^{
    self.alpha = 1;
  } completion:^(BOOL finished) {}];
  if (self.onTap) {
    self.onTap();
  }
}

- (void)handleTapDown:(id)sender {
  [UIView animateWithDuration:0.2 animations:^{
    self.alpha = 0.5;
  } completion:^(BOOL finished) {}];
}

- (void)handleTapUp:(id)sender {
  [UIView animateWithDuration:0.2 animations:^{
    self.alpha = 1;
  } completion:^(BOOL finished) {}];
}

@end
