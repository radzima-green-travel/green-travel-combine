//
//  ProfileViewController.m
//  greenTravel
//
//  Created by Alex K on 8.06.22.
//

#import "ProfileViewController.h"
#import "CommonButton.h"
#import "UserController.h"

@interface ProfileViewController ()

@property (strong, nonatomic) CommonButton *logOutButton;

@end

@implementation ProfileViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  UILabel *loggedInLabel = [[UILabel alloc] init];
  [loggedInLabel setText:@"Logged in."];
  loggedInLabel.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:loggedInLabel];
  
  [NSLayoutConstraint activateConstraints:@[
    [loggedInLabel.centerYAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerYAnchor],
    [loggedInLabel.centerXAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerXAnchor],
  ]];
  
  self.logOutButton = [[CommonButton alloc] initWithTarget:self action:@selector(onLogOutPress:) label:@"Log out"];
  self.logOutButton.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:self.logOutButton];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.logOutButton.topAnchor constraintEqualToAnchor:loggedInLabel.bottomAnchor],
    [self.logOutButton.centerXAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerXAnchor],
  ]];
}

- (void)onLogOutPress:(CommonButton *)sender {
  [self.userController initiateSignOut];
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState toCurrentState:(UserModelState)currentState {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      if (currentState == UserModelStateSignOutInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStateSignOutInProgress &&
          currentState == UserModelStateSignUpSuccess) {
        [self enableLoadingIndicator:NO];
        return;
      }
    });
  });
}

@end
