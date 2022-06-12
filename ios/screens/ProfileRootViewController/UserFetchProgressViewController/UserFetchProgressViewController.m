//
//  UserFetchProgressViewController.m
//  greenTravel
//
//  Created by Alex K on 9.06.22.
//

#import "UserFetchProgressViewController.h"

@interface UserFetchProgressViewController ()

@end

@implementation UserFetchProgressViewController

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
}

- (void)viewDidLoad {
  [super viewDidLoad];
  UIActivityIndicatorView *loadingIndicator;
  if (@available(iOS 13.0, *)) {
    loadingIndicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleLarge];
  } else {
    loadingIndicator = [[UIActivityIndicatorView alloc] init];
  }
  [loadingIndicator startAnimating];
  
  loadingIndicator.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:loadingIndicator];
  
  [NSLayoutConstraint activateConstraints:@[
    [loadingIndicator.centerXAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerXAnchor],
    [loadingIndicator.centerYAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerYAnchor],
  ]];
}

@end
