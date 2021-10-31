//
//  MapButton.m
//  GreenTravel
//
//  Created by Alex K on 3/4/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "MapButton.h"
#import "ColorsLegacy.h"
#import "Colors.h"

@interface MapButton()

@property (strong, nonatomic) UIImageView *icon;

@end

@implementation MapButton

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithImageName:(NSString *)imageName
                           target:(id)target
                         selector:(SEL)selector
            imageCenterXAnchorConstant:(CGFloat)imageCenterXAnchorConstant
            imageCenterYAnchorConstant:(CGFloat)imageCenterYAnchorConstant
{
    self = [super init];
    if (self) {
        [self setUp:imageName
             target:target
           selector:selector
imageCenterXAnchorConstant:imageCenterXAnchorConstant
imageCenterYAnchorConstant:imageCenterYAnchorConstant];
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  CGFloat red;
  CGFloat green;
  CGFloat blue;
  CGFloat alpha;
  UIColor *opaqueBg = [Colors get].background;
  [opaqueBg getRed:&red green:&green blue:&blue alpha:&alpha];
  self.backgroundColor = [UIColor colorWithRed:red green:green blue:blue alpha:0.7];
  [self.icon setTintColor:[Colors get].mainText];
}

- (void)setUp:(NSString *)imageName
       target:(id)target
     selector:(SEL)selector
imageCenterXAnchorConstant:(CGFloat)imageCenterXAnchorConstant
imageCenterYAnchorConstant:(CGFloat)imageCenterYAnchorConstant {
    self.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [self.widthAnchor constraintEqualToConstant:44.0],
        [self.heightAnchor constraintEqualToConstant:44.0],
    ]];
    
    self.layer.masksToBounds = YES;
    self.layer.cornerRadius = 8.0;
    self.layer.borderColor = [[ColorsLegacy get].alto CGColor];
    self.layer.borderWidth = 1.0;
    
    self.icon = [[UIImageView alloc] initWithImage:[UIImage imageNamed:imageName]];
    [self addSubview:self.icon];
    
    self.icon.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [self.icon.centerXAnchor constraintEqualToAnchor:self.centerXAnchor constant:imageCenterXAnchorConstant],
        [self.icon.centerYAnchor constraintEqualToAnchor:self.centerYAnchor constant:imageCenterYAnchorConstant],
        [self.icon.widthAnchor constraintEqualToConstant:26.0],
        [self.icon.heightAnchor constraintEqualToConstant:26.0],
    ]];
    
    [self addTarget:target action:selector forControlEvents:UIControlEventTouchUpInside];
}

- (void)setIconImage:(UIImage *)image {
  [self.icon setImage:image];
}

- (void)setHighlighted:(BOOL)highlighted {
  [super setHighlighted:highlighted];
  __weak typeof(self) weakSelf = self;
  if (highlighted) {
    [UIView animateWithDuration:0.3 animations:^{
      weakSelf.alpha = 0.5;
    }];
  } else {
    [UIView animateWithDuration:0.3 animations:^{
      weakSelf.alpha = 1;
    }];
  }
}

@end
