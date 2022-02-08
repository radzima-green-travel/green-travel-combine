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
}

- (void)setUp {
}

- (void)update:(UIView *)embeddedView {
  [self.contentView addSubview:embeddedView];

  embeddedView.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint activateConstraints:@[
    [embeddedView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor],
    [embeddedView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
    [embeddedView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor],
    [embeddedView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor],

  ]];
}

- (void)prepareForReuse {
  [super prepareForReuse];
  [self.contentView.subviews
   enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull subview,
                                NSUInteger idx, BOOL * _Nonnull stop) {
    [subview removeFromSuperview];
  }];
}

@end
