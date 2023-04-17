//
//  SocialProvidersViewController.m
//  greenTravel
//
//  Created by Alex K on 13.04.23.
//

#import "SocialProvidersViewController.h"
#import "LoginViewController.h"
#import "SocialProviderButton.h"
#import "TermsAndPrivacyView.h"
#import "Typography.h"
#import "Colors.h"

@interface SocialProvidersViewController ()

@property (nonatomic, strong) UIStackView *stackView;
@property (nonatomic, strong) UIButton *appleButton;
@property (nonatomic, strong) UIButton *googleButton;
@property (nonatomic, strong) UIButton *facebookButton;
@property (nonatomic, strong) UIButton *emailButton;

@end

static const CGFloat kButtonHeight = 50.0;
static const CGFloat kButtonCornerRadius = 16.0;
static const CGFloat kSpacing = 16.0;
static const CGFloat kHorizontalSpacing = 16.0;
static const CGFloat kTopOffset = 20.0;

@implementation SocialProvidersViewController

- (void)viewDidLayoutSubviews {
  [super viewDidLayoutSubviews];
  
  if (@available(iOS 13.0, *)) {
    if (self.traitCollection.userInterfaceStyle == UIUserInterfaceStyleDark) {
      self.view.backgroundColor = [UIColor blackColor];
      self.appleButton.tintColor = [UIColor whiteColor];
      self.googleButton.tintColor = [UIColor whiteColor];
      self.facebookButton.tintColor = [UIColor whiteColor];
      self.emailButton.tintColor = [UIColor whiteColor];
      self.emailButton.layer.borderColor = [UIColor whiteColor].CGColor;
    } else {
      self.view.backgroundColor = [UIColor whiteColor];
      self.appleButton.tintColor = [UIColor blackColor];
      self.googleButton.tintColor = [UIColor whiteColor];
      self.facebookButton.tintColor = [UIColor whiteColor];
      self.emailButton.tintColor = [UIColor blackColor];
      self.emailButton.layer.borderColor = [UIColor blackColor].CGColor;
    }
  }
}

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.view.backgroundColor = [UIColor whiteColor];
  self.title = @"Sign in";
  
  __weak typeof(self) weakSelf = self;
#pragma mark - social buttons config
  NSArray *socialProviders = @[
    @{
      @"title": [[Typography get] socialButtonLabel:@"Продолжить с Apple" lightColor:NO],
      @"logo": [UIImage imageNamed:@"apple_logo"],
      @"bgColor": [Colors get].appleButtonBackground,
      @"borderColor": [Colors get].appleButtonBorder,
      @"onTap": ^{
        // Handle Apple sign in
      }
    },
    @{
      @"title": [[Typography get] socialButtonLabel:@"Continue with Facebook" lightColor:YES],
      @"logo": [UIImage imageNamed:@"facebook_logo"],
      @"bgColor": [Colors get].socialButtonBackground,
      @"borderColor": [Colors get].socialButtonBorder,
      @"onTap": ^{
        // Handle Facebook sign in
      }
    },
    @{
      @"title": [[Typography get] socialButtonLabel:@"Continue with Google" lightColor:YES],
      @"logo": [UIImage imageNamed:@"google_logo"],
      @"bgColor": [Colors get].socialButtonBackground,
      @"borderColor": [Colors get].socialButtonBorder,
      @"onTap": ^{
        // Handle Google sign in
      }
    },
    @{
      @"title": [[Typography get] socialButtonLabel:@"Continue with Email" lightColor:YES],
      @"logo": [UIImage imageNamed:@"mail_logo"],
      @"bgColor": [Colors get].socialButtonBackground,
      @"borderColor": [Colors get].socialButtonBorder,
      @"onTap": ^{
        [weakSelf emailButtonTapped];
      }
    },
  ];
#pragma mark - header label
  UILabel *titleLabel = [[UILabel alloc] init];
  [titleLabel setAttributedText:[[Typography get] formHeader:@"Войти или создать аккаунт"]];
  [self.contentView addSubview:titleLabel];
  titleLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [titleLabel.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:24.0],
    [titleLabel.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
  ]];
#pragma mark - apple sign in button
  SocialProviderButton *appleButton = [[SocialProviderButton alloc] initWithFrame:CGRectZero];
  appleButton.layer.masksToBounds = YES;
  appleButton.layer.cornerRadius = kButtonCornerRadius;
  appleButton.clipsToBounds = YES;
  NSDictionary *appleProvider = socialProviders[0];
  [appleButton setAttributedTitle:appleProvider[@"title"] forState:UIControlStateNormal];
  appleButton.borderColor = appleProvider[@"borderColor"];
  appleButton.bgColor = appleProvider[@"bgColor"];
  appleButton.logoImage = appleProvider[@"logo"];
  appleButton.onTap = appleProvider[@"onTap"];
  [self.contentView addSubview:appleButton];
  
  // Add constraints for email sign in button
  appleButton.translatesAutoresizingMaskIntoConstraints = NO;
  [appleButton.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor].active = YES;
  [appleButton.widthAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.widthAnchor constant:-kHorizontalSpacing * 2].active = YES;
  [appleButton.heightAnchor constraintEqualToConstant:kButtonHeight].active = YES;
  [appleButton.topAnchor constraintEqualToAnchor:titleLabel.bottomAnchor constant:24.0].active = YES;
  
#pragma mark - divider view and "or" label
  UIView *dividerView = [[UIView alloc] initWithFrame:CGRectZero];
  dividerView.backgroundColor = [UIColor colorWithRed:0.7 green:0.7 blue:0.7 alpha:1.0];
  [self.contentView addSubview:dividerView];
  
  UILabel *orLabel = [[UILabel alloc] initWithFrame:CGRectZero];
  orLabel.text = @"or";
  orLabel.font = [UIFont systemFontOfSize:16.0 weight:UIFontWeightRegular];
  orLabel.textColor = [UIColor colorWithRed:0.7 green:0.7 blue:0.7 alpha:1.0];
  orLabel.backgroundColor = [UIColor whiteColor];
  orLabel.textAlignment = NSTextAlignmentCenter;
  [self.contentView addSubview:orLabel];
  
  // Add constraints for divider view and "or" label
  CGFloat dividerHeight = 1.0 / [UIScreen mainScreen].scale;
  CGFloat orLabelWidth = 40.0;
  
  dividerView.translatesAutoresizingMaskIntoConstraints = NO;
  [dividerView.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor].active = YES;
  [dividerView.widthAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.widthAnchor constant:-kHorizontalSpacing * 2].active = YES;
  [dividerView.heightAnchor constraintEqualToConstant:dividerHeight].active = YES;
  [dividerView.topAnchor constraintEqualToAnchor:appleButton.bottomAnchor constant:kSpacing].active = YES;
  
  orLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [orLabel.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor].active = YES;
  [orLabel.widthAnchor constraintEqualToConstant:orLabelWidth].active = YES;
  [orLabel.centerYAnchor constraintEqualToAnchor:dividerView.centerYAnchor].active = YES;
  
  UIView *previousView = nil;
#pragma mark - other social buttons
  for (NSUInteger i = 1; i < socialProviders.count; i++) {
    NSDictionary *provider = socialProviders[i];
    SocialProviderButton *button = [[SocialProviderButton alloc] initWithFrame:CGRectZero];
    button.layer.masksToBounds = YES;
    button.layer.cornerRadius = kButtonCornerRadius;
    button.clipsToBounds = YES;
    [button setAttributedTitle:provider[@"title"] forState:UIControlStateNormal];
    button.borderColor = provider[@"borderColor"];
    button.bgColor = provider[@"bgColor"];
    button.logoImage = provider[@"logo"];
    button.onTap = provider[@"onTap"];
    [self.contentView addSubview:button];
    
    // Add constraints
    button.translatesAutoresizingMaskIntoConstraints = NO;
    [button.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor].active = YES;
    [button.widthAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.widthAnchor constant:-kHorizontalSpacing * 2].active = YES;
    [button.heightAnchor constraintEqualToConstant:kButtonHeight].active = YES;
    if (previousView) {
      [button.topAnchor constraintEqualToAnchor:previousView.bottomAnchor constant:kSpacing].active = YES;
    } else {
      [button.topAnchor constraintEqualToAnchor:dividerView.bottomAnchor constant:kTopOffset].active = YES;
    }
    
    previousView = button;
  }
  
  TermsAndPrivacyView *termsAndPrivacyView = [[TermsAndPrivacyView alloc] init];
  termsAndPrivacyView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:termsAndPrivacyView];
    
  // Add bottom constraint to scroll view
  [termsAndPrivacyView.topAnchor constraintEqualToAnchor:previousView.bottomAnchor constant:kSpacing].active = YES;
  [termsAndPrivacyView.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor constant:-kTopOffset].active = YES;
  [termsAndPrivacyView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:32.0].active = YES;
  [termsAndPrivacyView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-32.0].active = YES;
}

- (void)appleButtonTapped {
  // Handle Apple button tap
}

- (void)googleButtonTapped {
  // Handle Google button tap
}

- (void)facebookButtonTapped {
  // Handle Facebook button tap
}

- (void)emailButtonTapped {
  LoginViewController *loginViewController =
  [[LoginViewController alloc] initWithController:self.userController
                                            model:self.userModel];
  loginViewController.title = NSLocalizedString(@"LogInTitle", @"");
  [self.navigationController pushViewController:loginViewController animated:YES];
}

@end
