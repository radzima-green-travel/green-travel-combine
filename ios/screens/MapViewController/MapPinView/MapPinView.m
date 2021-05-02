//
//  MapPinView.m
//  GreenTravel
//
//  Created by Alex K on 9/4/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "MapPinView.h"

@implementation MapPinView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithReuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithReuseIdentifier:reuseIdentifier];
    if (self) {
        [self addSubview:[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"mappin"]]];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    
    
    
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated{
    [super setSelected:selected animated:animated];
}

@end
