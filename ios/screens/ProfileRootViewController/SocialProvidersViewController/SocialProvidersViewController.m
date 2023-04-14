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

@interface SocialProvidersViewController ()

@property (nonatomic, strong) UIStackView *stackView;
@property (nonatomic, strong) UIButton *appleButton;
@property (nonatomic, strong) UIButton *googleButton;
@property (nonatomic, strong) UIButton *facebookButton;
@property (nonatomic, strong) UIButton *emailButton;

@end

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
  
  // Add social buttons
  NSArray *socialProviders = @[
    @{
      @"title": @"Continue with Apple",
      @"logo": [UIImage imageNamed:@"apple_logo"],
      @"bgColor": [UIColor blackColor],
      @"borderColor": [UIColor blackColor],
      @"onTap": ^{
        // Handle Apple sign in
      }
    },
    @{
      @"title": @"Continue with Facebook",
      @"logo": [UIImage imageNamed:@"facebook_logo"],
      @"bgColor": [UIColor colorWithRed:0.23 green:0.35 blue:0.6 alpha:1.0],
      @"borderColor": [UIColor colorWithRed:0.23 green:0.35 blue:0.6 alpha:1.0],
      @"onTap": ^{
        // Handle Facebook sign in
      }
    },
    @{
      @"title": @"Continue with Google",
      @"logo": [UIImage imageNamed:@"google_logo"],
      @"bgColor": [UIColor whiteColor],
      @"borderColor": [UIColor colorWithRed:0.7 green:0.7 blue:0.7 alpha:1.0],
      @"onTap": ^{
        // Handle Google sign in
      }
    },
    @{
      @"title": @"Continue with Email",
      @"logo": [UIImage imageNamed:@"mail_logo"],
      @"bgColor": [UIColor whiteColor],
      @"borderColor": [UIColor colorWithRed:0.7 green:0.7 blue:0.7 alpha:1.0],
      @"onTap": ^{
        // Handle Google sign in
      }
    },
  ];
  
  CGFloat buttonHeight = 50.0;
  CGFloat spacing = 20.0;
  CGFloat topOffset = 20.0;
  
#pragma mark - apple sign in button
  SocialProviderButton *appleButton = [[SocialProviderButton alloc] initWithFrame:CGRectZero];
  appleButton.layer.masksToBounds = YES;
  appleButton.layer.cornerRadius = buttonHeight / 2;
  appleButton.clipsToBounds = YES;
  appleButton.titleLabel.font = [UIFont systemFontOfSize:16.0 weight:UIFontWeightMedium];
  NSDictionary *appleProvider = socialProviders[0];
  appleButton.title = appleProvider[@"title"];
  appleButton.borderColor = appleProvider[@"borderColor"];
  appleButton.bgColor = appleProvider[@"bgColor"];
  appleButton.logoImage = appleProvider[@"logo"];
  appleButton.onTap = appleProvider[@"onTap"];
  [self.contentView addSubview:appleButton];
  
  // Add constraints for email sign in button
  appleButton.translatesAutoresizingMaskIntoConstraints = NO;
  [appleButton.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor].active = YES;
  [appleButton.widthAnchor constraintEqualToAnchor:self.contentView.widthAnchor constant:-spacing * 2].active = YES;
  [appleButton.heightAnchor constraintEqualToConstant:buttonHeight].active = YES;
  [appleButton.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:spacing].active = YES;
  
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
  [dividerView.widthAnchor constraintEqualToAnchor:self.contentView.widthAnchor constant:-spacing * 2].active = YES;
  [dividerView.heightAnchor constraintEqualToConstant:dividerHeight].active = YES;
  [dividerView.topAnchor constraintEqualToAnchor:appleButton.bottomAnchor constant:spacing].active = YES;
  
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
    button.layer.cornerRadius = buttonHeight / 2;
    button.clipsToBounds = YES;
    button.titleLabel.font = [UIFont systemFontOfSize:16.0 weight:UIFontWeightMedium];
    button.title = provider[@"title"];
    button.borderColor = provider[@"borderColor"];
    button.bgColor = provider[@"bgColor"];
    button.logoImage = provider[@"logo"];
    button.onTap = provider[@"onTap"];
    [self.contentView addSubview:button];
    
    // Add constraints
    button.translatesAutoresizingMaskIntoConstraints = NO;
    [button.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor].active = YES;
    [button.widthAnchor constraintEqualToAnchor:self.contentView.widthAnchor constant:-spacing * 2].active = YES;
    [button.heightAnchor constraintEqualToConstant:buttonHeight].active = YES;
    if (previousView) {
      [button.topAnchor constraintEqualToAnchor:previousView.bottomAnchor constant:spacing].active = YES;
    } else {
      [button.topAnchor constraintEqualToAnchor:dividerView.bottomAnchor constant:topOffset].active = YES;
    }
    
    previousView = button;
  }
  
  TermsAndPrivacyView *termsAndPrivacyView = [[TermsAndPrivacyView alloc] init];
  termsAndPrivacyView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:termsAndPrivacyView];
    
  // Add bottom constraint to scroll view
  [termsAndPrivacyView.topAnchor constraintEqualToAnchor:previousView.bottomAnchor constant:spacing].active = YES;
  [termsAndPrivacyView.bottomAnchor constraintGreaterThanOrEqualToAnchor:self.contentView.bottomAnchor constant:topOffset].active = YES;
  [termsAndPrivacyView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:10.0].active = YES;
  [termsAndPrivacyView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-10.0].active = YES;
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
