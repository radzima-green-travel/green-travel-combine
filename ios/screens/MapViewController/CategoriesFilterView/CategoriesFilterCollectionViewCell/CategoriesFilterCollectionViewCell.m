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
#import "Colors.h"
#import "CategoriesFilterViewConstants.h"

@interface CategoriesFilterCollectionViewCell ()

@property (strong, nonatomic) UILabel *label;
@property (strong, nonatomic) UIImageView *iconView;
@property (strong, nonatomic) FilterOption *option;

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

- (void)layoutSubviews {
  [super layoutSubviews];
  
  BOOL shouldShowLightStyleIcon = self.option.on;
  BOOL interfaceDark = NO;
  if (@available(iOS 12.0, *)) {
    interfaceDark = self.traitCollection.userInterfaceStyle ==
    UIUserInterfaceStyleDark;
    shouldShowLightStyleIcon = interfaceDark || shouldShowLightStyleIcon;
  }
  self.layer.borderColor = [[Colors get].categoryFilterCellBorder CGColor];
  UIImage *icon = [[IconNameToImageNameMap get]
                   filterIconForName:self.option.iconName
                   lightStyle:shouldShowLightStyleIcon];
  [self.iconView setImage:icon];
  if (self.option.on) {
    [self.label setTextColor:[Colors get].buttonNewDataText];
    [self.contentView setBackgroundColor:[Colors get].buttonNewDataBackground];
    if (interfaceDark) {
      self.layer.borderColor = [[Colors get].buttonNewDataBackground CGColor];
    }
    return;
  }
  [self.label setTextColor:[Colors get].mainText];
  [self.contentView setBackgroundColor:[Colors get].background];
}

- (void)setUp {
  self.layer.borderWidth = 1.0;
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
    self.option = option;
    [self updateSubiews:option];
    if (option.iconName && [[IconNameToImageNameMap get]
                            hasFilterIconForName:option.iconName]) {
        UIImage *icon = [[IconNameToImageNameMap get] filterIconForName:option.iconName lightStyle:option.on];
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
