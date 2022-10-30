//
//  UserSettingsTableViewCell.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 11.09.22.
//

#import "UserSettingsTableViewCell.h"
#import "Typography.h"

@interface UserSettingsTableViewCell ()

@property (strong, nonatomic)UILabel *mainLabel;
@property (strong, nonatomic)UILabel *subLabel;

@end

static const CGFloat kMainLabelLeadingAnchor = 16.0;
static const CGFloat kSubLabelTrailingAnchor = -16.0;
static const CGFloat kSubLabelLeadingAnchor = 8.0;

@implementation UserSettingsTableViewCell

- (void)prepareForReuse {
  [super prepareForReuse];
  self.mainLabel.text = nil;
  self.subLabel.text = nil;
}

- (void)prepareSettingsCellWithMainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText withChevron:(BOOL) withChevron {
  
  if (withChevron) {
  self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
  }

  self.mainLabel = [[UILabel alloc] init];
  NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabelForSettingsCell:mainText];
  self.mainLabel.attributedText = mainTextLabelAttributedString;
  
  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.mainLabel];
  
  [NSLayoutConstraint activateConstraints:@[
  [self.mainLabel.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:kMainLabelLeadingAnchor],
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

@end
