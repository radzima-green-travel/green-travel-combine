//
//  MapButton.m
//  GreenTravel
//
//  Created by Alex K on 3/4/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "MapButton.h"
#import "Colors.h"

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

    self.backgroundColor = [UIColor colorWithRed:1.0 green:1.0 blue:1.0 alpha:0.7];
    
    self.layer.masksToBounds = YES;
    self.layer.cornerRadius = 8.0;
    self.layer.borderColor = [[Colors get].alto CGColor];
    self.layer.borderWidth = 1.0;
    
    UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:imageName]];
    [self addSubview:imageView];
    
    imageView.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [imageView.centerXAnchor constraintEqualToAnchor:self.centerXAnchor constant:imageCenterXAnchorConstant],
        [imageView.centerYAnchor constraintEqualToAnchor:self.centerYAnchor constant:imageCenterYAnchorConstant],
        [imageView.widthAnchor constraintEqualToConstant:26.0],
        [imageView.heightAnchor constraintEqualToConstant:26.0],
    ]];
    
    [self addTarget:target action:selector forControlEvents:UIControlEventTouchUpInside];
}

@end
