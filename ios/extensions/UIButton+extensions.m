//
//  UIButton+UIButton_extensions.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 2.08.22.
//

#import "UIButton+extensions.h"

@implementation UIButton (Extensions)

- (void)setImageForSelectedState:(nonnull UIImage *)imageForSelectedState imageForNormalState:(nonnull UIImage *)imageForNormalState {
  [self setImage:imageForNormalState forState:UIControlStateNormal];
  [self setImage:imageForSelectedState forState:UIControlStateSelected];
  [self setImage:imageForNormalState forState:UIControlStateHighlighted | UIControlStateNormal];
  [self setImage:imageForSelectedState forState:UIControlStateSelected | UIControlStateHighlighted];
}

@end
