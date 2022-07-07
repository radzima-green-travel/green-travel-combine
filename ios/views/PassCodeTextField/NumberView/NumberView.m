//
//  NumberView.m
//  greenTravel
//
//  Created by Alex K on 29.05.22.
//

#import "NumberView.h"
#import "Colors.h"
#import "NumberViewConstants.h"

@implementation NumberView

- (instancetype)init {
  self = [super initWithFrame:CGRectZero];
  if (self) {
    [self setUp];
  }
  return self;
}

- (void)setUp {
  self.layer.cornerRadius = 4.0;
  self.layer.borderColor = [[Colors get].passCodeTint CGColor];
  self.layer.borderWidth = 1.0;
  
  self.translatesAutoresizingMaskIntoConstraints = NO;
  
  self.numberLabel = [UILabel new];
  [self addSubview:self.numberLabel];
  self.numberLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.numberLabel.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
    [self.numberLabel.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
    [self.widthAnchor constraintEqualToConstant:NumberViewWidth],
    [self.heightAnchor constraintEqualToConstant:NumberViewHeight],
  ]];
}

@end
