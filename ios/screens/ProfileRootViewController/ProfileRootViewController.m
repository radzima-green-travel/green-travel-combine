//
//  ProfileRootViewController.m
//  greenTravel
//
//  Created by Alex K on 8.06.22.
//

#import "ProfileRootViewController.h"
#import "UserModelConstants.h"
#import "LoginViewController.h"
#import "ProfileViewController.h"
#import "UserFetchProgressViewController.h"
#import "UserFetchErrorViewController.h"
#import "UserController.h"
#import "UserModel.h"
#import "ColorsLegacy.h"
#import "TypographyLegacy.h"

@interface ProfileRootViewController ()

@property (strong, nonatomic) UIViewController *current;

@end

@implementation ProfileRootViewController

- (instancetype)initWithController:(UserController *)controller model:(UserModel *)model {
  self = [super init];
  if (self) {
    _userController = controller;
    _userModel = model;
  }
  return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  [self.userModel addUserModelObserver:self];
  [self onUserModelStateTransitionFrom:self.userModel.prevState toCurrentState:self.userModel.state];
}

- (void)showLoginViewController {
  LoginViewController *loginViewController =
  [[LoginViewController alloc] initWithController:self.userController
                                                  model:self.userModel];
  loginViewController.title = NSLocalizedString(@"ProfileTitle", @"");
  UINavigationController *loginViewControllerWithNavigation =
  [[UINavigationController alloc ] initWithRootViewController:loginViewController];
  
  loginViewControllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
  loginViewControllerWithNavigation.navigationBar.titleTextAttributes =
  [TypographyLegacy get].navigationSemiboldAttributes;
  
  [self addChildViewController:loginViewControllerWithNavigation];
  loginViewControllerWithNavigation.view.frame = self.view.bounds;
  [self.view addSubview:loginViewControllerWithNavigation.view];
  [loginViewControllerWithNavigation didMoveToParentViewController:self];
  
  [self.current willMoveToParentViewController:nil];
  [self.current.view removeFromSuperview];
  [self.current removeFromParentViewController];
  
  self.current = loginViewControllerWithNavigation;
}

- (void)showProfileViewController {
  ProfileViewController *profileViewController =
  [[ProfileViewController alloc] initWithController:self.userController
                                              model:self.userModel];
  
  [self addChildViewController:profileViewController];
  profileViewController.view.frame = self.view.bounds;
  [self.view addSubview:profileViewController.view];
  [profileViewController didMoveToParentViewController:self];
  
  [self.current willMoveToParentViewController:nil];
  [self.current.view removeFromSuperview];
  [self.current removeFromParentViewController];
  
  self.current = profileViewController;
}

- (void)showUserFetchProgressViewController {
  UserFetchProgressViewController *userFetchProgressViewController =
  [[UserFetchProgressViewController alloc] init];
  
  [self addChildViewController:userFetchProgressViewController];
  userFetchProgressViewController.view.frame = self.view.bounds;
  [self.view addSubview:userFetchProgressViewController.view];
  [userFetchProgressViewController didMoveToParentViewController:self];
  
  [self.current willMoveToParentViewController:nil];
  [self.current.view removeFromSuperview];
  [self.current removeFromParentViewController];
  
  self.current = userFetchProgressViewController;
}

- (void)showUserFetchErrorViewController {
  UserFetchErrorViewController *userFetchErrorViewController =
  [[UserFetchErrorViewController alloc] initWithController:self.userController
                                                     model:self.userModel];
  
  [self addChildViewController:userFetchErrorViewController];
  userFetchErrorViewController.view.frame = self.view.bounds;
  [self.view addSubview:userFetchErrorViewController.view];
  [userFetchErrorViewController didMoveToParentViewController:self];
  
  [self.current willMoveToParentViewController:nil];
  [self.current.view removeFromSuperview];
  [self.current removeFromParentViewController];
  
  self.current = userFetchErrorViewController;
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      __weak typeof(self) strongSelf = weakSelf;
      if (currentState == UserModelStateFetchingInProgress) {
        [strongSelf showUserFetchProgressViewController];
        return;
      }
      BOOL fetched = prevState == UserModelStateFetchingInProgress &&
        currentState == UserModelStateFetched;
      if (fetched && strongSelf.userModel.error != nil) {
        [strongSelf showUserFetchErrorViewController];
        return;
      }
      BOOL signedIn = strongSelf.userModel.signedIn;
      if (fetched && signedIn) {
        [strongSelf showProfileViewController];
        return;
      }
      if (fetched && !signedIn) {
        [strongSelf showLoginViewController];
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress &&
          currentState == UserModelStateSignUpSuccess) {
        [strongSelf showProfileViewController];
        return;
      }
    });
  });
}

@end
