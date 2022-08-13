//
//  ProfileTableViewCell.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 25.07.22.
//

#import "ProfileTableViewCell.h"
#import "TypographyLegacy.h"
#import "ColorsLegacy.h"
#import "SettingsTableViewCellModel.h"

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
  self.chevronImageView.image = nil;
}

- (void)prepareTableViewCell {
  
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

  UIImage *chevron = [UIImage imageNamed:@"chevron-right"];
  //UIImage *chevron = [[UIImage named:@"chevron-right"] withTintColor:[[Colors get].subText colorWithAlphaComponent:0.6]];
  self.chevronImageView = [[UIImageView alloc] initWithImage: chevron];
  self.chevronImageView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:self.chevronImageView];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.chevronImageView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-16.0],
  [self.chevronImageView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  [self.chevronImageView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:8],
  [self.chevronImageView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:-8],
  [self.chevronImageView.widthAnchor constraintEqualToAnchor:self.chevronImageView.heightAnchor]
  ]];
  
  self.mainLabel = [[UILabel alloc] init];
  NSAttributedString *mainTextLabelAttributedString = [[TypographyLegacy get] makeProfileTableViewCellMainTextLabel:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;
  
  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:16.0],
  [self.mainLabel.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor]
  ]];
  
  self.subLabel = [[UILabel alloc] init];
  NSAttributedString *subTextLabelAttributedString = [[TypographyLegacy get] makeProfileTableViewCellSubTextLabel:subText];
  self.subLabel.attributedText = subTextLabelAttributedString;
  
  self.subLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.subLabel];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.subLabel.trailingAnchor constraintEqualToAnchor:self.chevronImageView.leadingAnchor constant:-8],
  [self.subLabel.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  [self.subLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.mainLabel.trailingAnchor constant:8]
  ]];
}

- (void)prepareAuthCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText {
  
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
  
  UIImage *chevron = [UIImage imageNamed:@"chevron-right"];
  //UIImage *chevron = [[UIImage named:@"chevron-right"] withTintColor:[[Colors get].subText colorWithAlphaComponent:0.6]];
  self.chevronImageView = [[UIImageView alloc] initWithImage: chevron];
  self.chevronImageView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:self.chevronImageView];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.chevronImageView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-16.0],
  [self.chevronImageView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  [self.chevronImageView.widthAnchor constraintEqualToAnchor:self.chevronImageView.heightAnchor]
  ]];
  
  self.mainLabel = [[UILabel alloc] init];
  NSAttributedString *mainTextLabelAttributedString = [[TypographyLegacy get] makeProfileTableViewCellMainTextLabel:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;
  
  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:13.0],
  [self.mainLabel.topAnchor constraintEqualToAnchor:self.iconImageView.topAnchor],
  [self.mainLabel.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-24.0]
  ]];
  
  self.subLabel = [[UILabel alloc] init];
  self.subLabel.numberOfLines = 2;
  NSAttributedString *subTextLabelAttributedString = [[TypographyLegacy get] makeProfileTableViewCellSubTextLabel:subText];
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
