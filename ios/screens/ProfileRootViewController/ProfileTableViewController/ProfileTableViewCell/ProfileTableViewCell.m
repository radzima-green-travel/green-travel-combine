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
  [self setBackgroundColor:[UIColor clearColor]];
}

- (void)prepareForReuse {
  [super prepareForReuse];
  self.iconImageView.image = nil;
  self.mainLabel.text = nil;
  self.subLabel.text = nil;
  self.chevronImageView.image = nil;
}

- (void)prepareTableViewCell {
  self.backgroundView = [[UIView alloc] init];
  self.backgroundView.translatesAutoresizingMaskIntoConstraints = NO;
  self.backgroundView.backgroundColor = [ColorsLegacy get].white;
  
  [self.contentView addSubview:self.backgroundView];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.backgroundView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
  [self.backgroundView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-16.0],
  [self.backgroundView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor],
  [self.backgroundView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor],
  ]];
  
  self.iconImageView = [[UIImageView alloc] init];
  self.iconImageView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.backgroundView addSubview:self.iconImageView];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.iconImageView.leadingAnchor constraintEqualToAnchor:self.backgroundView.leadingAnchor constant:16.0],
  [self.iconImageView.centerYAnchor constraintEqualToAnchor:self.backgroundView.centerYAnchor],
  [self.iconImageView.topAnchor constraintEqualToAnchor:self.backgroundView.topAnchor constant:8],
  [self.iconImageView.bottomAnchor constraintEqualToAnchor:self.backgroundView.bottomAnchor constant:-8],
  [self.iconImageView.widthAnchor constraintEqualToAnchor:self.iconImageView.heightAnchor]
  ]];
}

- (void)prepareSettingsCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText {
  [self prepareTableViewCell];
  
  self.iconImageView.image = image;

  UIImage *chevron = [UIImage imageNamed:@"chevron-right"];
  //UIImage *chevron = [UIImage named:@"chevron-right" withTintColor:[[ColorsLegacy get] getLightGreyColorWithAlpha:@0.3]];
  self.chevronImageView = [[UIImageView alloc] initWithImage: chevron];
  self.chevronImageView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:self.chevronImageView];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.chevronImageView.trailingAnchor constraintEqualToAnchor:self.backgroundView.trailingAnchor constant:-16.0],
  [self.chevronImageView.centerYAnchor constraintEqualToAnchor:self.backgroundView.centerYAnchor],
  [self.chevronImageView.topAnchor constraintEqualToAnchor:self.backgroundView.topAnchor constant:8],
  [self.chevronImageView.bottomAnchor constraintEqualToAnchor:self.backgroundView.bottomAnchor constant:-8],
  [self.chevronImageView.widthAnchor constraintEqualToAnchor:self.chevronImageView.heightAnchor]
  ]];
  
  self.mainLabel = [[UILabel alloc] init];
  NSAttributedString *mainTextLabelAttributedString = [[TypographyLegacy get] makeProfileTableViewCellMainTextLabel:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;
  
  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:16.0],
  [self.mainLabel.centerYAnchor constraintEqualToAnchor:self.backgroundView.centerYAnchor]
  ]];
  
  self.subLabel = [[UILabel alloc] init];
  NSAttributedString *subTextLabelAttributedString = [[TypographyLegacy get] makeProfileTableViewCellSubTextLabel:subText];
  self.subLabel.attributedText = subTextLabelAttributedString;
  
  self.subLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.subLabel];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.subLabel.trailingAnchor constraintEqualToAnchor:self.chevronImageView.leadingAnchor constant:-8],
  [self.subLabel.centerYAnchor constraintEqualToAnchor:self.backgroundView.centerYAnchor],
  [self.subLabel.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.mainLabel.trailingAnchor constant:8]
  ]];
  
  self.separatorView = [[UIView alloc] init];
  self.separatorView.backgroundColor = [[ColorsLegacy get] getLightGreyColorWithAlpha:@0.6];
  
  self.separatorView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.backgroundView addSubview:self.separatorView];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.separatorView.leadingAnchor constraintEqualToAnchor:self.mainLabel.leadingAnchor],
  [self.separatorView.trailingAnchor constraintEqualToAnchor:self.backgroundView.trailingAnchor],
  [self.separatorView.bottomAnchor constraintEqualToAnchor:self.backgroundView.bottomAnchor],
  [self.separatorView.heightAnchor constraintEqualToConstant:1.0]
  ]];
  
}

- (void)prepareAuthCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText {
  [self prepareTableViewCell];
  
  self.backgroundView.layer.cornerRadius = 14;
  
  self.iconImageView.image = image;
  
  [NSLayoutConstraint activateConstraints:@[
  [self.iconImageView.topAnchor constraintEqualToAnchor:self.backgroundView.topAnchor constant:18],
  [self.iconImageView.bottomAnchor constraintEqualToAnchor:self.backgroundView.bottomAnchor constant:-18],
  ]];
  
  self.iconImageView.layer.cornerRadius = self.iconImageView.frame.size.height / 2;
  
  UIImage *chevron = [UIImage imageNamed:@"chevron-right"];
  //UIImage *chevron = [UIImage named:@"chevron-right" withTintColor:[[ColorsLegacy get] getLightGreyColorWithAlpha:@0.3]];
  self.chevronImageView = [[UIImageView alloc] initWithImage: chevron];
  self.chevronImageView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:self.chevronImageView];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.chevronImageView.trailingAnchor constraintEqualToAnchor:self.backgroundView.trailingAnchor constant:-16.0],
  [self.chevronImageView.centerYAnchor constraintEqualToAnchor:self.backgroundView.centerYAnchor],
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
  [self.mainLabel.trailingAnchor constraintEqualToAnchor:self.backgroundView.trailingAnchor constant:-24.0]
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
  [self.subLabel.topAnchor constraintEqualToAnchor:self.mainLabel.bottomAnchor constant:2],
  [self.subLabel.bottomAnchor constraintEqualToAnchor:self.iconImageView.bottomAnchor]
  ]];
}

@end
