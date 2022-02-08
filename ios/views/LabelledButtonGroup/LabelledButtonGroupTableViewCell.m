//
//  LabelledButtonGroupTableViewCell.m
//  greenTravel
//
//  Created by Alex K on 9.02.22.
//
#import "LabelledButtonGroupTableViewCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "PlaceCategory.h"
#import "TypographyLegacy.h"
#import "IconNameToImageNameMap.h"

@interface LabelledButtonGroupTableViewCell()

@property (strong, nonatomic) UIView *contentWrapperView;
@property (strong, nonatomic) UIImageView *chevron;

@end

@implementation LabelledButtonGroupTableViewCell

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
  [self.chevron setImage:[UIImage imageNamed:@"chevron-right"]];
}

- (void)setUp {
#pragma mark - Header label
    self.contentWrapperView = [[UIView alloc] init];
    [self.contentView addSubview:self.contentWrapperView];
    
    self.contentWrapperView.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [self.contentWrapperView.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
        [self.contentWrapperView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
    ]];
    
#pragma mark - Chevron
    self.chevron = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"chevron-right"]];
    self.chevron.tintColor = [ColorsLegacy get].black;
    [self.contentView addSubview:self.chevron];
    
    self.chevron.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [self.chevron.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
        [self.chevron.leadingAnchor constraintEqualToAnchor:self.contentWrapperView.trailingAnchor constant:10.0],
        [self.chevron.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-25.0],
    ]];
}

- (void)update:(UIView *)contentView {
  [self.contentWrapperView addSubview:contentView];
  
  contentView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [NSLayoutConstraint activateConstraints:@[
      [contentView.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
      [contentView.leadingAnchor constraintEqualToAnchor:self.contentWrapperView.leadingAnchor],
      [contentView.trailingAnchor constraintEqualToAnchor:self.contentWrapperView.trailingAnchor],
  ]];
}

- (void)prepareForReuse {
  [super prepareForReuse];
  [self.contentWrapperView.subviews enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull subview,
                                                                 NSUInteger idx, BOOL * _Nonnull stop) {
    [subview removeFromSuperview];
  }];
}

@end
