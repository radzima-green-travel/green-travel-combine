//
//  ProfileViewController.m
//  greenTravel
//
//  Created by Alex K on 19.05.22.
//

#import "ProfileViewController.h"
#import "Colors.h"
#import "StyleUtils.h"
#import "SignUpFormView.h"
#import "SignInFormView.h"
#import "Colors.h"

@interface ProfileViewController ()

@property (strong, nonatomic) SignUpFormView *signUpView;
@property (strong, nonatomic) SignInFormView *signInView;
@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) UIView *contentView;

@end

static const CGFloat kMinContentInset = 23.5;
static const CGFloat kMaxContentWidth = 328.0;
static const CGFloat kTopOffset = 90.0;

@implementation ProfileViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  UINavigationBar *navigationBar = self.navigationController.navigationBar;
  configureNavigationBar(navigationBar);
  
  self.scrollView = [[UIScrollView alloc] init];
  self.scrollView.translatesAutoresizingMaskIntoConstraints = NO;
  self.scrollView.alwaysBounceVertical = YES;
  [self.view addSubview:self.scrollView];
  [NSLayoutConstraint activateConstraints:@[
    [self.scrollView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
    [self.scrollView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
    [self.scrollView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
    [self.scrollView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor]
  ]];
  
  self.contentView = [[UIView alloc] init];
  self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.scrollView addSubview:self.contentView];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.contentView.topAnchor constraintEqualToAnchor:self.scrollView.topAnchor],
    [self.contentView.leadingAnchor constraintEqualToAnchor:self.scrollView.leadingAnchor],
    [self.contentView.trailingAnchor constraintEqualToAnchor:self.scrollView.trailingAnchor],
    [self.contentView.bottomAnchor constraintEqualToAnchor:self.scrollView.bottomAnchor],
    [self.contentView.widthAnchor constraintEqualToAnchor:self.scrollView.widthAnchor],
    [self.contentView.heightAnchor constraintGreaterThanOrEqualToAnchor:self.scrollView.heightAnchor]
  ]];
  
  NSArray *items = @[NSLocalizedString(@"ProfileScreenChoiceSignIn", @""),
                     NSLocalizedString(@"ProfileScreenChoiceSignUp", @"")];
  
  UISegmentedControl *procedureChoiceView = [[UISegmentedControl alloc] initWithItems:items];
  [procedureChoiceView addTarget:self action:@selector(onModeChoice:) forControlEvents:UIControlEventValueChanged];
  
  procedureChoiceView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:procedureChoiceView];
  [NSLayoutConstraint activateConstraints:@[
    [procedureChoiceView.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [procedureChoiceView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:19.0],
    [procedureChoiceView.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.contentView.leadingAnchor constant:kMinContentInset],
    [procedureChoiceView.trailingAnchor constraintLessThanOrEqualToAnchor:self.contentView.trailingAnchor constant:-kMinContentInset],
    [procedureChoiceView.widthAnchor constraintGreaterThanOrEqualToConstant:kMaxContentWidth],
  ]];
  
  [procedureChoiceView setSelectedSegmentIndex:0];
  [self onModeChoice:procedureChoiceView];
}

- (void)viewDidLayoutSubviews {
  [super viewDidLayoutSubviews];
  self.view.backgroundColor = [Colors get].background;
}

- (void)onModeChoice:(UISegmentedControl *)sender {
  if (sender.selectedSegmentIndex == 1) {
    [self addSignUpView];
    return;
  }
  [self addSignInView];
}

-(void)addSignUpView {
  [self.signInView removeFromSuperview];
  
  if (self.signUpView == nil) {
    self.signUpView = [[SignUpFormView alloc] init];
  }
  
  self.signUpView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.signUpView];
  [NSLayoutConstraint activateConstraints:@[
    [self.signUpView.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.signUpView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kTopOffset],
    [self.signUpView.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.contentView.leadingAnchor constant:kMinContentInset],
    [self.signUpView.trailingAnchor constraintLessThanOrEqualToAnchor:self.contentView.trailingAnchor constant:-kMinContentInset],
    [self.signUpView.widthAnchor constraintGreaterThanOrEqualToConstant:kMaxContentWidth],
    
    [self.signUpView.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor],
  ]];
}

-(void)addSignInView {
  [self.signUpView removeFromSuperview];
  
  if (self.signInView == nil) {
    self.signInView = [[SignInFormView alloc] init];
  }
  
  self.signInView.translatesAutoresizingMaskIntoConstraints = NO;
  self.signInView.backgroundColor = [UIColor redColor];
  [self.contentView addSubview:self.signInView];
  [NSLayoutConstraint activateConstraints:@[
    [self.signInView.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.signInView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kTopOffset],
    [self.signInView.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.contentView.leadingAnchor constant:kMinContentInset],
    [self.signInView.trailingAnchor constraintLessThanOrEqualToAnchor:self.contentView.trailingAnchor constant:-kMinContentInset],
    [self.signInView.widthAnchor constraintGreaterThanOrEqualToConstant:kMaxContentWidth],
    
    [self.signInView.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor],
  ]];
}

@end
