//
//  SettingsAuthTableViewCell.m
//  greenTravel
//
//  Created by Alex K on 31.01.23.
//

#import "SettingsAuthTableViewCell.h"
#import "CacheService.h"
#import "Typography.h"
#import "Colors.h"
#import "UIImage+extensions.h"

@interface SettingsAuthTableViewCell()

@property (strong, nonatomic) UIImageView *iconImageView;
@property (strong, nonatomic) UILabel *mainLabel;
@property (strong, nonatomic) UILabel *subLabel;

@end

static const CGFloat kIconLeadingAnchor = 16.0;
static const CGFloat kIconTopAnchor = 8.0;
static const CGFloat kIconBottomAnchor = -8.0;
static const CGFloat kIconTopAnchorAtAuthCell = 18.0;
static const CGFloat kIconBottomAnchorAtAuthCell = -18.0;
static const CGFloat kMainLabelLeadingAnchor = 16.0;
static const CGFloat kMainLabelTrailingAnchor = -16.0;

static NSString * const kAvatarCacheKey = @"avatarImage";

@implementation SettingsAuthTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)setUp {
  self.iconImageView = [[UIImageView alloc] init];
  self.iconImageView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:self.iconImageView];
#pragma mark - Avatar
  [NSLayoutConstraint activateConstraints:@[
    [self.iconImageView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:kIconLeadingAnchor],
    [self.iconImageView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
    [self.iconImageView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kIconTopAnchorAtAuthCell],
    [self.iconImageView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:kIconBottomAnchorAtAuthCell],
    [self.iconImageView.widthAnchor constraintEqualToAnchor:self.iconImageView.heightAnchor]
  ]];
#pragma mark - Main label
  self.mainLabel = [[UILabel alloc] init];
  self.mainLabel.textAlignment = NSTextAlignmentLeft;
 
  
  self.mainLabel.translatesAutoresizingMaskIntoConstraints = NO;
  
  self.subLabel = [[UILabel alloc] init];
  self.subLabel.textAlignment = NSTextAlignmentLeft;
  self.subLabel.numberOfLines = 0;
  
  [self.subLabel sizeToFit];
  
  self.subLabel.translatesAutoresizingMaskIntoConstraints = NO;
  
  UIStackView *labelStack = [[UIStackView alloc] init];
  [labelStack addArrangedSubview:self.mainLabel];
  [labelStack addArrangedSubview:self.subLabel];
  labelStack.axis = UILayoutConstraintAxisVertical;
  labelStack.distribution = UIStackViewDistributionFillProportionally;
  labelStack.spacing = 4;
  
  labelStack.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:labelStack];
  
  [NSLayoutConstraint activateConstraints:@[
    [labelStack.leadingAnchor constraintEqualToAnchor:self.iconImageView.trailingAnchor constant:kMainLabelLeadingAnchor],
    [labelStack.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:kMainLabelTrailingAnchor],
    [labelStack.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor]
  ]];
}

- (void)updateWithSubTitle:(NSString*)subText
        fetchingInProgress:(BOOL)fetchingInProgress
                  signedIn:(BOOL)signedIn {
  if (fetchingInProgress) {
    UIActivityIndicatorView *activityIndicator = [[UIActivityIndicatorView alloc] init];
    self.accessoryView = activityIndicator;
    [activityIndicator sizeToFit];
    [activityIndicator startAnimating];
    self.accessoryType = UITableViewCellAccessoryNone;
    NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabelForAuthCell:NSLocalizedString(@"SettingsViewControllerAuthCellTitleAuthorizedProgress", @"")];
    [self.mainLabel setAttributedText:mainTextLabelAttributedString];
    NSAttributedString *subTextLabelAttributedString = [[Typography get] makeProfileTableViewCellSubTextLabelForAuthCell:NSLocalizedString(@"SettingsViewControllerAuthCellSubTitleAuthorizedProgress", @"")];
    [self.subLabel setAttributedText:subTextLabelAttributedString];
  }
  if (!fetchingInProgress && signedIn) {
    self.accessoryView = nil;
    self.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabelForAuthCell:NSLocalizedString(@"SettingsViewControllerAuthCellTitleAuthorized", @"")];
    [self.mainLabel setAttributedText:mainTextLabelAttributedString];
    NSAttributedString *subTextLabelAttributedString = [[Typography get] makeProfileTableViewCellSubTextLabelForAuthCell:subText];
    [self.subLabel setAttributedText:subTextLabelAttributedString];
  }
  if (!fetchingInProgress && !signedIn) {
    self.accessoryView = nil;
    self.accessoryType = UITableViewCellAccessoryNone;
    NSAttributedString *mainTextLabelAttributedString = [[Typography get] makeProfileTableViewCellMainTextLabelForAuthCell:NSLocalizedString(@"SettingsViewControllerAuthCellTitleAuthorizedNot", @"")];
    [self.mainLabel setAttributedText:mainTextLabelAttributedString];
    NSAttributedString *subTextLabelAttributedString = [[Typography get] makeProfileTableViewCellSubTextLabelForAuthCell:NSLocalizedString(@"SettingsViewControllerAuthCellSubTitleAuthorizedNot", @"")];
    [self.subLabel setAttributedText:subTextLabelAttributedString];
  }
  [self setUpAvatar:subText signedIn:YES];
}

- (void)setUpAvatar:(NSString *)subText signedIn:(BOOL)signedIn {
  if (!signedIn) {
    self.iconImageView.image = [UIImage imageNamed:@"accountPhoto"];
    return;
  }
  
  UIImage *image = [[CacheService get].cache objectForKey:kAvatarCacheKey];
  if (image == nil) {
    image = [[UIImage alloc] getAccountImageWithChar:[subText substringToIndex:1]];
    [[CacheService get].cache setObject:image forKey:kAvatarCacheKey];
  }
  
  self.iconImageView.image = image;
}

- (void)prepareForReuse {
  [super prepareForReuse];
  self.accessoryType = UITableViewCellAccessoryNone;
  
  [self.iconImageView removeFromSuperview];
  [self.mainLabel removeFromSuperview];
  [self.subLabel removeFromSuperview];

}

@end
