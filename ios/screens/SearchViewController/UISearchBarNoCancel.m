//
//  UISearchBarNoCancel.m
//  GreenTravel
//
//  Created by Alex K on 3/13/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "UISearchBarNoCancel.h"

@implementation UISearchBarNoCancel

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (void)layoutSubviews {
    [super layoutSubviews];
    [self setShowsCancelButton:NO];
}

@end
