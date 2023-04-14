#import "SocialProviderButton.h"

@implementation SocialProviderButton

- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  if (self) {
    self.layer.borderWidth = 1.0;
    self.layer.cornerRadius = 10.0;
    [self setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    self.titleLabel.textAlignment = NSTextAlignmentCenter;
    self.imageView.contentMode = UIViewContentModeScaleAspectFit;
    [self addTarget:self action:@selector(handleTap:) forControlEvents:UIControlEventTouchUpInside];
    [self addTarget:self action:@selector(handleTapDown:) forControlEvents:UIControlEventTouchDown];
  }
  return self;
}

- (void)setTitle:(NSString *)title {
  [super setTitle:title forState:UIControlStateNormal];
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
  CGFloat spacing = 10.0;
  self.imageView.frame = CGRectMake(0, 0, CGRectGetWidth(self.bounds), CGRectGetHeight(self.bounds) - self.titleLabel.intrinsicContentSize.height - spacing);
  self.titleLabel.frame = CGRectMake(0, CGRectGetMaxY(self.imageView.frame) + spacing, CGRectGetWidth(self.bounds), self.titleLabel.intrinsicContentSize.height);
}

- (void)handleTap:(id)sender {
  [UIView animateWithDuration:0.2 animations:^{
    self.alpha = 1.0;
  }];
  if (self.onTap) {
    self.onTap();
  }
}

- (void)handleTapDown:(id)sender {
  [UIView animateWithDuration:0.2 animations:^{
    self.alpha = 0.5;
  } completion:^(BOOL finished) {}];
}

@end
