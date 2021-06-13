//
//  CategoriesFilterCollectionViewCell.m
//  GreenTravel
//
//  Created by Alex K on 2/25/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "CategoriesFilterCollectionViewCell.h"
#import "IconNameToImageNameMap.h"
#import "FilterOption.h"
#import "Typography.h"
#import "ColorsLegacy.h"
#import "CategoriesFilterViewConstants.h"

@interface CategoriesFilterCollectionViewCell ()

@property (strong, nonatomic) UILabel *label;
@property (strong, nonatomic) UIImageView *iconView;

@end

@implementation CategoriesFilterCollectionViewCell

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)setUp {
    self.layer.masksToBounds = YES;
    self.layer.cornerRadius = 4.0;
}

- (void)addIconView {
    if (self.iconView != nil) {
        return;
    }
    self.iconView = [[UIImageView alloc] init];
    [self.contentView addSubview:self.iconView];
    self.iconView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.iconView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
        [self.iconView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:CategoriesFilterViewLabelToCellSpacing], 
        [self.iconView.widthAnchor constraintEqualToConstant:CategoriesFilterViewIconWidth],
        [self.iconView.heightAnchor constraintEqualToConstant:CategoriesFilterViewIconWidth],
    ]];
}

- (void)addLabelView {
    if (self.label != nil) {
        return;
    }
    self.label = [[UILabel alloc] init];
    [self.contentView addSubview:self.label];
    self.label.translatesAutoresizingMaskIntoConstraints = NO;
    NSLayoutConstraint *leadingConstraint = self.iconView != nil ?
    [self.label.leadingAnchor constraintEqualToAnchor:self.iconView.trailingAnchor constant:CategoriesFilterViewIconToLabelSpacing] :
    [self.label.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:CategoriesFilterViewLabelToCellSpacing];
    [NSLayoutConstraint activateConstraints:@[
        [self.label.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
        leadingConstraint,
        [self.label.topAnchor constraintEqualToAnchor:self.label.topAnchor],
        [self.label.topAnchor constraintEqualToAnchor:self.label.topAnchor],
    ]];
}

- (void)updateSubiews:(FilterOption *)option {
    [self.iconView removeFromSuperview];
    self.iconView = nil;
    [self.label removeFromSuperview];
    self.label = nil;
    
    if (!option.selectAll && [[IconNameToImageNameMap get]
                        hasFilterIconForName:option.iconName]) {
        [self addIconView];
    } else {
        [self.iconView removeFromSuperview];
        self.iconView = nil;
    }
    [self addLabelView];
}

- (void)update:(FilterOption *)option {
    [self updateSubiews:option];
    if (option.iconName && [[IconNameToImageNameMap get]
                            hasFilterIconForName:option.iconName]) {
        UIImage *icon = [[IconNameToImageNameMap get] filterIconForName:option.iconName selectedState:option.on];
        [self.iconView setImage:icon];
        self.iconView.contentMode = UIViewContentModeCenter;
    }
    if (option.on) {
        [self.label setAttributedText:[[Typography get] makeSubtitle2Regular:option.title color:[ColorsLegacy get].white]];
        [self.contentView setBackgroundColor:[ColorsLegacy get].apple];
        return;
    }
    [self.label setAttributedText:[[Typography get] makeSubtitle2Regular:option.title color:[ColorsLegacy get].logCabin]];
    [self.contentView setBackgroundColor:[ColorsLegacy get].white];
}

@end
