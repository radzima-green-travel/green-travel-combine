//
//  ProfileViewController.m
//  greenTravel
//
//  Created by Alex K on 8.06.22.
//

#import "ProfileViewController.h"

@interface ProfileViewController ()

@end

@implementation ProfileViewController

- (instancetype)initWithController:(UserController *)controller
                             model:(UserModel *)model {
  self = [super init];
  if (self) {
    _userController = controller;
    _userModel = model;
  }
  return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  
  UILabel *loggedInLabel = [[UILabel alloc] init];
  [loggedInLabel setText:@"Logged in."];
  loggedInLabel.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.view addSubview:loggedInLabel];
  
  [NSLayoutConstraint activateConstraints:@[
    [loggedInLabel.centerYAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerYAnchor],
    [loggedInLabel.centerXAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerXAnchor],
  ]];
}

@end
