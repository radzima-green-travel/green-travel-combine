//
//  SettingsBaseTableViewCell.m
//  greenTravel
//
//  Created by Alex K on 21.01.23.
//

#import "SettingsBaseTableViewCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "SettingsBaseTableViewCellConfig.h"
#import "Typography.h"

@interface SettingsBaseTableViewCell ()

@property (strong, nonatomic) UILabel *title;
@property (strong, nonatomic) UILabel *subTitle;
@property (strong, nonatomic) UIImageView *iconView;
@property (strong, nonatomic) UIView *separatorView;
@property (strong, nonatomic) UIStackView *labelStack;
@property (strong, nonatomic) SettingsBaseTableViewCellConfig *config;
@property (strong, nonatomic) NSArray<NSLayoutConstraint *> *iconConstraints;
@property (strong, nonatomic) NSLayoutConstraint *leadingWithIcon;
@property (strong, nonatomic) NSLayoutConstraint *leadingNoIcon;

@end

@implementation SettingsBaseTableViewCell

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  [self.title setAttributedText:[[Typography get] settingsCellTitle:self.config.title]];
  if (self.config.subTitle != nil) {
    [self.subTitle setAttributedText:[[Typography get] settingsCellSubTitle:self.config.subTitle]];
  }
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)setUp {
#pragma mark - Icon
  self.iconView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:self.config.iconName]];
  self.iconView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.iconView];
  
  self.iconConstraints = @[
    [self.iconView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
    [self.iconView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
    [self.iconView.widthAnchor constraintEqualToConstant:30.0],
    [self.iconView.heightAnchor constraintEqualToConstant:30.0],
  ];
#pragma mark - Title
  self.title = [[UILabel alloc] init];
  [self.contentView addSubview:self.title];
  self.title.numberOfLines = 1;
  self.title.adjustsFontSizeToFitWidth = NO;
  [self.title setContentCompressionResistancePriority:UILayoutPriorityDefaultLow forAxis:UILayoutConstraintAxisHorizontal];
  [self.title setLineBreakMode:NSLineBreakByTruncatingTail];
  self.title.translatesAutoresizingMaskIntoConstraints = NO;
#pragma mark - Sub title
  self.subTitle = [[UILabel alloc] init];
  [self.contentView addSubview:self.subTitle];
  self.subTitle.numberOfLines = 1;
  self.subTitle.adjustsFontSizeToFitWidth = NO;
  [self.subTitle setContentCompressionResistancePriority:UILayoutPriorityDefaultHigh forAxis:UILayoutConstraintAxisHorizontal];
  self.subTitle.translatesAutoresizingMaskIntoConstraints = NO;
#pragma mark - Accessory view
  self.accessoryType = UITableViewCellAccessoryNone;
}

- (void)update:(SettingsBaseTableViewCellConfig *)entry {
  self.config = entry;
  
  if (self.config.subTitle != nil) {
    [self.subTitle setAttributedText:[[Typography get] settingsCellSubTitle:self.config.subTitle]];
    return;
  }
  [self.subTitle setAttributedText:[[Typography get] settingsCellSubTitle:@""]];
  
  UIView *prevView = nil;
#pragma mark - Icon
  if (self.config.iconName != nil && ![self.config.iconName isEqualToString:@""]) {
    [self.iconView setImage:[UIImage imageNamed:self.config.iconName]];
    [NSLayoutConstraint activateConstraints:self.iconConstraints];
    [self.iconView setHidden:NO];
    prevView = self.iconView;
  } else {
    [NSLayoutConstraint deactivateConstraints:self.iconConstraints];
    [self.iconView setHidden:YES];
  }
#pragma mark - Title
  [self.title setAttributedText:[[Typography get] settingsCellTitle:self.config.title]];
  [NSLayoutConstraint deactivateConstraints:@[self.leadingWithIcon, self.leadingNoIcon]];
  NSLayoutConstraint *leading;
  if (prevView != nil) {
    leading = self.leadingWithIcon = [self.title.leadingAnchor constraintEqualToAnchor:prevView.trailingAnchor constant:16.0];
  } else {
    leading = self.leadingNoIcon = [self.title.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0];
  }
  [NSLayoutConstraint activateConstraints:@[
    [self.title.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
    leading,
  ]];
  prevView = self.title;
#pragma mark - Sub title
  [NSLayoutConstraint activateConstraints:@[
    [self.subTitle.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
    [self.subTitle.leadingAnchor
     constraintGreaterThanOrEqualToAnchor:prevView.trailingAnchor constant:16.0],
  ]];
  prevView = self.subTitle;
#pragma mark - Accessory view
  if (self.config.chevron) {
    self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
  } else {
    self.accessoryType = UITableViewCellAccessoryNone;
  }
  [NSLayoutConstraint activateConstraints:@[[prevView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-16.0]]];
  
}

- (void)prepareForReuse {
  [super prepareForReuse];
  [self.iconView removeFromSuperview];
  self.accessoryType = UITableViewCellAccessoryNone;
  [self.subTitle removeFromSuperview];
  [self.title setAttributedText:[[Typography get] settingsCellTitle:@""]];
  [self.subTitle setAttributedText:[[Typography get] settingsCellTitle:@""]];
}

@end
