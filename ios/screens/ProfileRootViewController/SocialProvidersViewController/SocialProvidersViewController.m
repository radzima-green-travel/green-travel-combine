//
//  SocialProvidersViewController.m
//  greenTravel
//
//  Created by Alex K on 13.04.23.
//

#import "SocialProvidersViewController.h"
#import "LoginViewController.h"

@interface SocialProvidersViewController ()

@property (nonatomic, strong) UIScrollView *scrollView;
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
  
  self.scrollView = [[UIScrollView alloc] initWithFrame:CGRectZero];
  self.scrollView.translatesAutoresizingMaskIntoConstraints = NO;
  self.scrollView.alwaysBounceHorizontal = YES;
  [self.view addSubview:self.scrollView];
  
  self.stackView = [[UIStackView alloc] initWithFrame:CGRectZero];
  self.stackView.translatesAutoresizingMaskIntoConstraints = NO;
  self.stackView.axis = UILayoutConstraintAxisVertical;
  self.stackView.spacing = 20.0;
  [self.scrollView addSubview:self.stackView];
  
  self.appleButton = [UIButton buttonWithType:UIButtonTypeCustom];
  self.appleButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.appleButton setTitle:@"Continue with Apple" forState:UIControlStateNormal];
  [self.appleButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  [self.appleButton setTitleColor:[UIColor blackColor] forState:UIControlStateHighlighted];
  [self.appleButton setImage:[UIImage imageNamed:@"apple_logo"] forState:UIControlStateNormal];
  self.appleButton.backgroundColor = [UIColor blackColor];
  self.appleButton.layer.cornerRadius = 22.0;
  self.appleButton.layer.masksToBounds = YES;
  [self.appleButton addTarget:self action:@selector(appleButtonTapped) forControlEvents:UIControlEventTouchUpInside];
  [self.stackView addArrangedSubview:self.appleButton];
  
  self.googleButton = [UIButton buttonWithType:UIButtonTypeCustom];
  self.googleButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.googleButton setTitle:@"Continue with Google" forState:UIControlStateNormal];
  [self.googleButton setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
  [self.googleButton setTitleColor:[UIColor blackColor] forState:UIControlStateHighlighted];
  [self.googleButton setImage:[UIImage imageNamed:@"google_logo"] forState:UIControlStateNormal];
  self.googleButton.backgroundColor = [UIColor whiteColor];
  self.googleButton.layer.cornerRadius = 22.0;
  self.googleButton.layer.masksToBounds = YES;
  [self.googleButton addTarget:self action:@selector(googleButtonTapped) forControlEvents:UIControlEventTouchUpInside];
  [self.stackView addArrangedSubview:self.googleButton];
  
  self.facebookButton = [UIButton buttonWithType:UIButtonTypeCustom];
  self.facebookButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.facebookButton setTitle:@"Continue with Facebook" forState:UIControlStateNormal];
  [self.facebookButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  [self.facebookButton setTitleColor:[UIColor blackColor] forState:UIControlStateHighlighted];
  [self.facebookButton setImage:[UIImage imageNamed:@"facebook_logo"] forState:UIControlStateNormal];
  self.facebookButton.backgroundColor = [UIColor colorWithRed:0.23 green:0.35 blue:0.6 alpha:1.0];
  self.facebookButton.layer.cornerRadius = 22.0;
  self.facebookButton.layer.masksToBounds = YES;
  [self.facebookButton addTarget:self action:@selector(facebookButtonTapped) forControlEvents:UIControlEventTouchUpInside];
  [self.stackView addArrangedSubview:self.facebookButton];
  
  self.emailButton = [UIButton buttonWithType:UIButtonTypeCustom];
  self.emailButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.emailButton setTitle:@"Continue with Email" forState:UIControlStateNormal];
  [self.emailButton setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
  [self.emailButton setTitleColor:[UIColor whiteColor] forState:UIControlStateHighlighted];
  [self.emailButton setImage:[UIImage imageNamed:@"email_icon"] forState:UIControlStateNormal];
  self.emailButton.backgroundColor = [UIColor whiteColor];
  self.emailButton.layer.cornerRadius = 22.0;
  self.emailButton.layer.masksToBounds = YES;
  [self.emailButton addTarget:self action:@selector(emailButtonTapped) forControlEvents:UIControlEventTouchUpInside];
  [self.stackView addArrangedSubview:self.emailButton];
  
  UILayoutGuide *frameGuide = self.scrollView.frameLayoutGuide;
  UILayoutGuide *contentGuide = self.scrollView.contentLayoutGuide;
  
  [NSLayoutConstraint activateConstraints:@[
    [self.scrollView.topAnchor constraintEqualToAnchor:self.view.topAnchor],
    [self.scrollView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
    [self.scrollView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
    [self.scrollView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor],
    
    [self.stackView.topAnchor constraintEqualToAnchor:contentGuide.topAnchor constant:20.0],
    [self.stackView.leadingAnchor constraintEqualToAnchor:frameGuide.leadingAnchor constant:20.0],
    [self.stackView.trailingAnchor constraintEqualToAnchor:frameGuide.trailingAnchor constant:-20.0],
    [self.stackView.bottomAnchor constraintEqualToAnchor:contentGuide.bottomAnchor constant:-20.0],
    
    [self.appleButton.heightAnchor constraintEqualToConstant:44.0],
    [self.googleButton.heightAnchor constraintEqualToConstant:44.0],
    [self.facebookButton.heightAnchor constraintEqualToConstant:44.0],
    [self.emailButton.heightAnchor constraintEqualToConstant:44.0]
  ]];
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
