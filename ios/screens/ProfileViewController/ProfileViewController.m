//
//  ProfileViewController.m
//  greenTravel
//
//  Created by Alex K on 19.05.22.
//

#import "ProfileViewController.h"
#import "Colors.h"
#import "StyleUtils.h"

@interface ProfileViewController ()

@end

@implementation ProfileViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  UINavigationBar *navigationBar = self.navigationController.navigationBar;
  configureNavigationBar(navigationBar);
  
  NSArray *items = @[NSLocalizedString(@"ProfileScreenChoiceSignIn", @""), NSLocalizedString(@"ProfileScreenChoiceSignUp", @"")];
  
  UISegmentedControl *procedureChoiceView = [[UISegmentedControl alloc] initWithItems:items];
  [procedureChoiceView addTarget:self action:@selector(onModeChoice:) forControlEvents:UIControlEventValueChanged];
  
  [self.view addSubview:procedureChoiceView];
  procedureChoiceView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [procedureChoiceView.centerXAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerXAnchor],
    [procedureChoiceView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor constant:19.0],
    [procedureChoiceView.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:23.5],
    [procedureChoiceView.trailingAnchor constraintLessThanOrEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-23.5],
    [procedureChoiceView.widthAnchor constraintGreaterThanOrEqualToConstant:328.0],
  ]];
  
  [procedureChoiceView setSelectedSegmentIndex:0];
}

- (void)onModeChoice:(id)sender {
  
}

@end
