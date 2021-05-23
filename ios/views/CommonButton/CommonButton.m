//
//  CommonButton.m
//  GreenTravel
//
//  Created by Alex K on 1/23/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "CommonButton.h"
#import "Colors.h"
#import "Typography.h"

@interface CommonButton()

@property (strong, nonatomic) id target;
@property (assign, nonatomic) SEL action;
@property (strong, nonatomic) NSString *label;

@end


@implementation CommonButton

 

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithTarget:(id)target action:(SEL)action
                         label:(NSString *)label
{
    self = [super init];
    if (self) {
        _target = target;
        _action = action;
        _label = label;
        [self setUp];
    }
    return self;
}

- (void)setUp {
    self.translatesAutoresizingMaskIntoConstraints = NO;
    self.backgroundColor = [Colors get].apple;
    self.layer.cornerRadius = 3.0;
    self.layer.masksToBounds = YES;
    [self.titleLabel setFont:[UIFont fontWithName:@"Montserrat-Bold" size:14.0]];
    [self setAttributedTitle:
     [[Typography get] makeButtonText:self.label] forState:UIControlStateNormal];

    [self addTarget:self.target action:self.action forControlEvents:UIControlEventTouchUpInside];

    [NSLayoutConstraint activateConstraints:@[
        [self.widthAnchor constraintLessThanOrEqualToConstant:343.0],
        [self.widthAnchor constraintGreaterThanOrEqualToConstant:288.0],
        [self.heightAnchor constraintGreaterThanOrEqualToConstant:53.0],
    ]];
}

- (void)setLabel:(NSString *)label {
  [self setAttributedTitle:
   [[Typography get] makeButtonText:label] forState:UIControlStateNormal];
}

@end
