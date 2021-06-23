//
//  BannerView.m
//  GreenTravel
//
//  Created by Alex K on 11/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "BannerView.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "StyleUtils.h"
#import "TextUtils.h"

@interface BannerView ()

@property (strong, nonatomic) CAGradientLayer *gradient;
@property (strong, nonatomic) UILabel *bannerLabel;

@end

@implementation BannerView

- (instancetype)init
{
    self = [super init];
    if (self) {
        self = [self initWithFrame:CGRectZero];
    }
    return self;
}

// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  [self.bannerLabel setTextColor:[Colors get].mainText];
}

- (void)setUp {
    UIStackView *containerView = [[UIStackView alloc] init];
    containerView.alignment = UIStackViewAlignmentCenter;
    containerView.distribution = UIStackViewDistributionFill;
    containerView.spacing = 12.0;
    containerView.translatesAutoresizingMaskIntoConstraints = NO;
    [self addSubview:containerView];
    
    [NSLayoutConstraint activateConstraints:@[
        [containerView.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
        [containerView.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
        [containerView.heightAnchor constraintEqualToAnchor:self.heightAnchor]
    ]];
    
    self.bannerLabel = [[UILabel alloc] init];
    [self.bannerLabel setAttributedText:getAttributedString(@"Скопировано", [ColorsLegacy get].black, 15.0, UIFontWeightRegular)];
    self.bannerLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [containerView addArrangedSubview:self.bannerLabel];
    
    UIImageView *checkImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"check"]];
    checkImageView.translatesAutoresizingMaskIntoConstraints = NO;
    
    UIView *checkImageContainerView = [[UIView alloc] init];
    checkImageContainerView.translatesAutoresizingMaskIntoConstraints = NO;
    checkImageContainerView.backgroundColor = [ColorsLegacy get].yellow;
    [checkImageContainerView addSubview:checkImageView];
    [NSLayoutConstraint activateConstraints:@[
        [checkImageContainerView.heightAnchor constraintEqualToAnchor:checkImageView.heightAnchor],
        [checkImageContainerView.centerYAnchor constraintEqualToAnchor:checkImageView.centerYAnchor constant:-3.0]
    ]];
    [containerView addArrangedSubview:checkImageContainerView];
}

@end
