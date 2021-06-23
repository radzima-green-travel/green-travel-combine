//
//  CategoryLinkCell.m
//  GreenTravel
//
//  Created by Alex K on 11/7/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "CategoryLinkCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "Category.h"
#import "Typography.h"
#import "IconNameToImageNameMap.h"

@interface CategoryLinkCell ()

@property (strong, nonatomic) UIImageView *icon;
@property (strong, nonatomic) UILabel *title;
@property (strong, nonatomic) UIImageView *chevron;

@end

@implementation CategoryLinkCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  [self.title setTextColor:[Colors get].headlineText];
  [self.chevron setImage:[UIImage imageNamed:@"chevron-right"]];
}

- (void)setUp {
#pragma mark - Image
    self.icon = [[UIImageView alloc] init];
    [self addSubview:self.icon];
    
    self.icon.contentMode = UIViewContentModeScaleAspectFill;
    self.icon.translatesAutoresizingMaskIntoConstraints = NO;
    self.icon.backgroundColor = [ColorsLegacy get].blue;
    
    self.icon.layer.cornerRadius = 16.0;
    self.icon.layer.masksToBounds = YES;
    CAGradientLayer *gradient = [CAGradientLayer layer];
    gradient.frame = CGRectMake(0, 0, 32.0, 32.0);
    gradient.colors = @[(__bridge id)[ColorsLegacy get].green.CGColor, (__bridge id)[ColorsLegacy get].shamrock.CGColor];
    gradient.startPoint = CGPointMake(0.0, 0.5);
    gradient.endPoint = CGPointMake(1.0, 0.5);
    UIGraphicsBeginImageContext(gradient.frame.size);
    [gradient renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    [self.icon setImage:image];
    
    [NSLayoutConstraint activateConstraints:@[
        [self.icon.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
        [self.icon.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:16.0],
        [self.icon.widthAnchor constraintEqualToConstant:32.0],
        [self.icon.heightAnchor constraintEqualToConstant:32.0],
    ]];
    
#pragma mark - Header label
    self.title = [[UILabel alloc] init];
    [self addSubview:self.title];
    
    self.title.translatesAutoresizingMaskIntoConstraints = NO;
    [self.title setFont:[UIFont fontWithName:@"Montserrat-Regular" size:15.0]];
    
    [NSLayoutConstraint activateConstraints:@[
        [self.title.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
        [self.title.leadingAnchor constraintEqualToAnchor:self.icon.trailingAnchor constant:10.0],
    ]];
    
#pragma mark - Chevron
    self.chevron = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"chevron-right"]];
    self.chevron.tintColor = [ColorsLegacy get].black;
    [self addSubview:self.chevron];
    
    self.chevron.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [self.chevron.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
        [self.chevron.leadingAnchor constraintEqualToAnchor:self.title.trailingAnchor constant:10.0],
        [self.chevron.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-25.0],
    ]];
}

- (void)update:(Category *)category {
    self.title.attributedText = [[Typography get] makeBody:category.title];
    [self.icon setImage:[[IconNameToImageNameMap get] iconForName:category.icon]];
}

- (void)prepareForReuse {
    [super prepareForReuse];
    
    
}
@end
