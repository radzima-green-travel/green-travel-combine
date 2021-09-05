//
//  UIButtonHighlightable.m
//  UIButtonHighlightable
//
//  Created by Alex K on 4.09.21.
//

#import "UIButtonHighlightable.h"

@implementation UIButtonHighlightable

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
