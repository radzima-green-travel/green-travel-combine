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

@implementation ProfileTableViewCell

- (void)layoutSubviews {
  [super layoutSubviews];
  self.selectionStyle = UITableViewCellSelectionStyleNone;
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
  [self.iconImageView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
  [self.iconImageView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  [self.iconImageView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:8],
  [self.iconImageView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:-8],
  [self.iconImageView.widthAnchor constraintEqualToAnchor:self.iconImageView.heightAnchor]
  ]];
}

- (void)prepareSettingsCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText {
  [self prepareTableViewCell];

  self.iconImageView.image = image;

  self.mainLabel = [[UILabel alloc] init];
  NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabel:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;

  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];

  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:16.0],
  [self.mainLabel.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor]
  ]];

  self.subLabel = [[UILabel alloc] init];
  NSAttributedString *subTextLabelAttributedString = [[Typography get] makeProfileTableViewCellSubTextLabel:subText];
  self.subLabel.attributedText = subTextLabelAttributedString;

  self.subLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.subLabel];

  [NSLayoutConstraint activateConstraints:@[
  [self.subLabel.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-8],
  [self.subLabel.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  [self.subLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.mainLabel.trailingAnchor constant:8]
  ]];
}

- (void)prepareAuthCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText {
  self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;

  self.iconImageView = [[UIImageView alloc] init];
  self.iconImageView.translatesAutoresizingMaskIntoConstraints = NO;

  [self.contentView addSubview:self.iconImageView];

  self.iconImageView.image = image;

  [NSLayoutConstraint activateConstraints:@[
    [self.iconImageView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
    [self.iconImageView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
    [self.iconImageView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:18],
    [self.iconImageView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:-18],
    [self.iconImageView.widthAnchor constraintEqualToAnchor:self.iconImageView.heightAnchor]
  ]];

  self.iconImageView.layer.cornerRadius = self.iconImageView.frame.size.height / 2;

  self.mainLabel = [[UILabel alloc] init];
  NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabel:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;

  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];

  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:13.0],
  [self.mainLabel.topAnchor constraintEqualToAnchor:self.iconImageView.topAnchor],
  [self.mainLabel.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-16.0]
  ]];

  self.subLabel = [[UILabel alloc] init];
  self.subLabel.numberOfLines = 2;
  NSAttributedString *subTextLabelAttributedString = [[Typography get] makeProfileTableViewCellSubTextLabel:subText];
  self.subLabel.attributedText = subTextLabelAttributedString;

  self.subLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.subLabel];

  [NSLayoutConstraint activateConstraints:@[
  [self.subLabel.leadingAnchor constraintEqualToAnchor:self.mainLabel.leadingAnchor],
  [self.subLabel.trailingAnchor constraintEqualToAnchor:self.mainLabel.trailingAnchor],
  [self.subLabel.topAnchor constraintEqualToAnchor:self.mainLabel.bottomAnchor constant:2]
  ]];
}

@end
