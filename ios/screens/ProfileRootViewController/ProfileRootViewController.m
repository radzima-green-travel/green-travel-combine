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
#import "StyleUtils.h"

@interface ProfileRootViewController ()

@property (strong, nonatomic) UINavigationController *current;

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

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
  configureNavigationBar(self.current.navigationBar);
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
  [self showViewController:loginViewController title:@"Profile"];
}

- (void)showProfileViewController {
  ProfileViewController *profileViewController =
  [[ProfileViewController alloc] initWithController:self.userController
                                              model:self.userModel];
  [self showViewController:profileViewController title:@"Profile"];
}

- (void)showUserFetchProgressViewController {
  UserFetchProgressViewController *userFetchProgressViewController =
  [[UserFetchProgressViewController alloc] init];
  [self showViewController:userFetchProgressViewController title:@"Profile"];
}

- (void)showUserFetchErrorViewController {
  UserFetchErrorViewController *userFetchErrorViewController =
  [[UserFetchErrorViewController alloc] initWithController:self.userController
                                                     model:self.userModel];
  [self showViewController:userFetchErrorViewController title:@"Profile"];
}

- (void)showViewController:(UIViewController *)controller
                     title:(NSString *)title {
  controller.title = NSLocalizedString(title, @"");
  UINavigationController *controllerWithNavigation =
  [[UINavigationController alloc ] initWithRootViewController:controller];
  
  controllerWithNavigation.navigationBar.barTintColor = [ColorsLegacy get].green;
  controllerWithNavigation.navigationBar.titleTextAttributes =
  [TypographyLegacy get].navigationSemiboldAttributes;
  
  [self addChildViewController:controllerWithNavigation];
  controllerWithNavigation.view.frame = self.view.bounds;
  [self.view addSubview:controllerWithNavigation.view];
  [controllerWithNavigation didMoveToParentViewController:self];
  
  [self.current willMoveToParentViewController:nil];
  [self.current.view removeFromSuperview];
  [self.current removeFromParentViewController];
  
  self.current = controllerWithNavigation;
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
      if (prevState == UserModelStateSignInInProgress &&
          currentState == UserModelStateSignedIn) {
        [strongSelf showProfileViewController];
        return;
      }
    });
  });
}

@end
