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
    [self.titleLabel setTextAlignment:NSTextAlignmentCenter];

    [NSLayoutConstraint activateConstraints:@[
      [self.imageView.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
      [self.imageView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:20.0],
      [self.imageView.heightAnchor constraintEqualToConstant:24.0],
      [self.imageView.widthAnchor constraintEqualToConstant:24.0],
      [self.titleLabel.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
      [self.titleLabel.centerXAnchor constraintEqualToAnchor:self.centerXAnchor constant:0],
      [self.titleLabel.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-20.0],
      [self.titleLabel.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:2 * 20.0 + 24.0],
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
  
//  // Get the label and image views from the button
//  UILabel *label = self.titleLabel;
//  UIImageView *imageView = self.imageView;
//
//  // Calculate the combined width of the image and label
//  CGFloat combinedWidth = imageView.frame.size.width + label.intrinsicContentSize.width;
//
//  // Set the image position and size
//  CGRect imageFrame = imageView.frame;
//  imageFrame.origin.x = 0;
//  imageView.frame = imageFrame;
//
//  // Set the label position and size
//  CGRect labelFrame = label.frame;
//  labelFrame.origin.x = imageView.frame.size.width + 8; // add some padding between the image and label
//  labelFrame.size.width = combinedWidth - imageView.frame.size.width;
//  label.frame = labelFrame;
//
//  // Vertically align the image and label
//  CGFloat verticalOffset = (imageView.frame.size.height - label.intrinsicContentSize.height) / 2.0;
//  imageView.frame = CGRectOffset(imageView.frame, 0, verticalOffset);
//  label.frame = CGRectOffset(label.frame, 0, verticalOffset);
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
