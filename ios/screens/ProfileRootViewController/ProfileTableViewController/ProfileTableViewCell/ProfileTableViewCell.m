//
//  ProfileTableViewCell.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 25.07.22.
//

#import "ProfileTableViewCell.h"
#import "Typography.h"
#import "Colors.h"
#import "SettingsTableViewCellModel.h"
#import "UIImage+extensions.h"

@interface ProfileTableViewCell ()

@property (strong, nonatomic)UIImageView *iconImageView;
@property (strong, nonatomic)UILabel *mainLabel;
@property (strong, nonatomic)UILabel *subLabel;

@end

static const CGFloat kIconLeadingAnchor = 16.0;
static const CGFloat kIconTopAnchor = 8.0;
static const CGFloat kIconBottomAnchor = -8.0;
static const CGFloat kIconTopAnchorAtAuthCell = 18.0;
static const CGFloat kIconBottomAnchorAtAuthCell = -18.0;
static const CGFloat kMainLabelLeadingAnchor = 16.0;
static const CGFloat kMainLabelTrailingAnchor = -16.0;
static const CGFloat kSubLabelTrailingAnchor = -16.0;
static const CGFloat kSubLabelLeadingAnchor = 8.0;
static const CGFloat kSubLabelTopAnchor = 2.0;

@implementation ProfileTableViewCell

- (void)layoutSubviews {
  [super layoutSubviews];
}

- (void)prepareForReuse {
  [super prepareForReuse];
  self.iconImageView.image = nil;
  self.mainLabel.text = nil;
  self.subLabel.text = nil;
}

- (void)prepareTableViewCell {
  self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;

  self.iconImageView = [[UIImageView alloc] init];
  self.iconImageView.translatesAutoresizingMaskIntoConstraints = NO;

  [self.contentView addSubview:self.iconImageView];

  [NSLayoutConstraint activateConstraints:@[
  [self.iconImageView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:kIconLeadingAnchor],
  [self.iconImageView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  [self.iconImageView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kIconTopAnchor],
  [self.iconImageView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:kIconBottomAnchor],
  [self.iconImageView.widthAnchor constraintEqualToAnchor:self.iconImageView.heightAnchor]
  ]];
}

- (void)prepareSettingsCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText {
  [self prepareTableViewCell];

  self.iconImageView.image = image;

  self.mainLabel = [[UILabel alloc] init];
  NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabelForSettingsCell:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;

  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];

  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:kMainLabelLeadingAnchor],
  [self.mainLabel.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor]
  ]];

  self.subLabel = [[UILabel alloc] init];
  NSAttributedString *subTextLabelAttributedString = [[Typography get] makeProfileTableViewCellSubTextLabelForSettingsCell:subText];
  self.subLabel.attributedText = subTextLabelAttributedString;

  self.subLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.subLabel];

  [NSLayoutConstraint activateConstraints:@[
  [self.subLabel.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:kSubLabelTrailingAnchor],
  [self.subLabel.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  [self.subLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.mainLabel.trailingAnchor constant:kSubLabelLeadingAnchor]
  ]];
}

- (void)prepareAuthCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText {
  self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;

  self.iconImageView = [[UIImageView alloc] init];
  self.iconImageView.translatesAutoresizingMaskIntoConstraints = NO;

  [self.contentView addSubview:self.iconImageView];

  self.iconImageView.image = image;

  [NSLayoutConstraint activateConstraints:@[
    [self.iconImageView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:kIconLeadingAnchor],
    [self.iconImageView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
    [self.iconImageView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kIconTopAnchorAtAuthCell],
    [self.iconImageView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:kIconBottomAnchorAtAuthCell],
    [self.iconImageView.widthAnchor constraintEqualToAnchor:self.iconImageView.heightAnchor]
  ]];

  self.iconImageView.layer.cornerRadius = self.iconImageView.frame.size.height / 2;

  self.mainLabel = [[UILabel alloc] init];
  self.mainLabel.textAlignment = NSTextAlignmentCenter;
  self.mainLabel.adjustsFontSizeToFitWidth = YES;
  NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabelForAuthCell:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;

  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];


  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:kMainLabelLeadingAnchor],
  [self.mainLabel.topAnchor constraintEqualToAnchor:self.iconImageView.topAnchor],
  [self.mainLabel.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:kMainLabelTrailingAnchor]
  ]];

  self.subLabel = [[UILabel alloc] init];
  self.subLabel.textAlignment = NSTextAlignmentCenter;
  self.subLabel.numberOfLines = 0;
  NSAttributedString *subTextLabelAttributedString = [[Typography get] makeProfileTableViewCellSubTextLabelForAuthCell:subText];
  self.subLabel.attributedText = subTextLabelAttributedString;

  self.subLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.subLabel];

  [NSLayoutConstraint activateConstraints:@[
  [self.subLabel.leadingAnchor constraintEqualToAnchor:self.mainLabel.leadingAnchor],
  [self.subLabel.trailingAnchor constraintEqualToAnchor:self.mainLabel.trailingAnchor],
  [self.subLabel.topAnchor constraintEqualToAnchor:self.mainLabel.bottomAnchor constant:kSubLabelTopAnchor]
  ]];
}

@end
