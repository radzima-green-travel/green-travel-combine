//
//  UIButton+UIButton_extensions.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 2.08.22.
//

#import "UIButton+extensions.h"

@implementation UIButton (Extensions)

- (void)setSelectedImageForStates:(nonnull UIImage *)imageSelected notSelected:(nonnull UIImage *)imageNotSelected {
  [self setImage:imageNotSelected forState:UIControlStateNormal];
  [self setImage:imageSelected forState:UIControlStateSelected];
  [self setImage:imageNotSelected forState:UIControlStateHighlighted | UIControlStateNormal];
  [self setImage:imageSelected forState:UIControlStateSelected | UIControlStateHighlighted];
}

@end
