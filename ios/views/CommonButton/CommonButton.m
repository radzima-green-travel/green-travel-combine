//
//  CommonButton.m
//  GreenTravel
//
//  Created by Alex K on 1/23/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "CommonButton.h"
#import "Colors.h"
#import "TypographyLegacy.h"

@interface CommonButton()

@property (strong, nonatomic) id target;
@property (assign, nonatomic) SEL action;
@property (strong, nonatomic) NSString *label;

@end


@implementation CommonButton

static const CGFloat kMaxWidth = 343.0;
static const CGFloat kMinWidth = 273.0;

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

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].buttonNewDataBackground;
}

- (void)setUp {
    self.translatesAutoresizingMaskIntoConstraints = NO;
    
    self.layer.cornerRadius = 3.0;
    self.layer.masksToBounds = YES;
    [self.titleLabel setFont:[UIFont fontWithName:@"Montserrat-Bold" size:14.0]];
    [self setAttributedTitle:
     [[TypographyLegacy get] makeButtonText:self.label] forState:UIControlStateNormal];

    [self addTarget:self.target action:self.action forControlEvents:UIControlEventTouchUpInside];

    [NSLayoutConstraint activateConstraints:@[
        [self.widthAnchor constraintLessThanOrEqualToConstant:kMaxWidth],
        [self.widthAnchor constraintGreaterThanOrEqualToConstant:kMinWidth],
        [self.heightAnchor constraintGreaterThanOrEqualToConstant:53.0],
    ]];
}

- (void)setLabel:(NSString *)label {
  [self setAttributedTitle:
   [[TypographyLegacy get] makeButtonText:label] forState:UIControlStateNormal];
}

@end
