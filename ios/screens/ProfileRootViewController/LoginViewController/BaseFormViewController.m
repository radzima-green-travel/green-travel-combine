//
//  BaseFormViewController.m
//  greenTravel
//
//  Created by Alex K on 1.06.22.
//

#import "BaseFormViewController.h"
#import "Colors.h"
#import "StyleUtils.h"
#import "SignUpFormView.h"
#import "SignInFormView.h"
#import "Colors.h"
#import "UserController.h"
#import "UserModel.h"
#import "UserState.h"
#import "CodeConfirmationViewController.h"
#import "CommonTextField.h"

@interface BaseFormViewController ()

@end

static const CGFloat kMinContentInset = 23.5;

@implementation BaseFormViewController

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
  self.view.backgroundColor = [Colors get].background;
  configureNavigationBar(self.navigationController.navigationBar);
}

- (void)viewDidLoad {
  [super viewDidLoad];
  [self registerForKeyboardNotifications];
  [self.userModel addUserModelObserver:self];
  
  UITapGestureRecognizer *tap =
  [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(dismissKeyboard:)];
  [self.view addGestureRecognizer:tap];
  
  self.scrollView = [[UIScrollView alloc] init];
  self.scrollView.translatesAutoresizingMaskIntoConstraints = NO;
  self.scrollView.alwaysBounceVertical = YES;
  [self.view addSubview:self.scrollView];
  [NSLayoutConstraint activateConstraints:@[
    [self.scrollView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
    [self.scrollView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
    [self.scrollView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
    [self.scrollView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor]
  ]];
  
  self.contentView = [[UIView alloc] init];
  self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.scrollView addSubview:self.contentView];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.contentView.topAnchor constraintEqualToAnchor:self.scrollView.topAnchor],
    [self.contentView.centerXAnchor constraintEqualToAnchor:self.scrollView.centerXAnchor],
    [self.contentView.leadingAnchor constraintEqualToAnchor:self.scrollView.leadingAnchor constant:kMinContentInset],
    [self.contentView.trailingAnchor constraintEqualToAnchor:self.scrollView.trailingAnchor constant:-kMinContentInset],
    [self.contentView.bottomAnchor constraintEqualToAnchor:self.scrollView.bottomAnchor],
    [self.contentView.heightAnchor constraintGreaterThanOrEqualToAnchor:self.scrollView.heightAnchor]
  ]];
  
#pragma mark - Loading indicator
  if (@available(iOS 13.0, *)) {
    self.loadingView =
    [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleLarge];
  } else {
    self.loadingView = [[UIActivityIndicatorView alloc] init];
  }
  self.loadingView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:self.loadingView];
  [NSLayoutConstraint activateConstraints:@[
    [self.loadingView.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
    [self.loadingView.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
  ]];
  
  self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemCancel target:self action:@selector(onDonePress:)];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [self.userModel addUserModelObserver:self];
  [self onUserModelStateTransitionFrom:self.userModel.prevState
                        toCurrentState:self.userModel.state];
}

- (void)viewDidDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  [self.userModel removeUserModelObserver:self];
}

- (void)viewDidLayoutSubviews {
  [super viewDidLayoutSubviews];
  self.view.backgroundColor = [Colors get].background;
}

-(void)onDonePress:(id)sender {
  __weak typeof(self) weakSelf = self;
  [self.navigationController dismissViewControllerAnimated:YES completion:^{
    [weakSelf.userController reset];
  }];
}

- (void)dismissKeyboard:(id)sender {
  [self.view endEditing:YES];
}

- (void)enableLoadingIndicator:(BOOL)enable {
  [self.contentView setHidden:enable];
  [self.loadingView setHidden:!enable];
  if (enable) {
    [self.loadingView startAnimating];
    return;
  }
  [self.loadingView stopAnimating];
}

- (void)registerForKeyboardNotifications {
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(keyboardWasShown:)
                                               name:UIKeyboardDidShowNotification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(keyboardWillBeHidden:)
                                               name:UIKeyboardWillHideNotification object:nil];
}



- (void)keyboardWasShown:(NSNotification*)aNotification {
  NSDictionary* info = [aNotification userInfo];
  CGSize kbSize = [[info objectForKey:UIKeyboardFrameEndUserInfoKey] CGRectValue].size;
  UIEdgeInsets contentInsets = UIEdgeInsetsMake(0.0, 0.0, kbSize.height - self.view.safeAreaInsets.bottom, 0.0);
  self.scrollView.contentInset = contentInsets;
  self.scrollView.scrollIndicatorInsets = contentInsets;
}

- (void)keyboardWillBeHidden:(NSNotification*)aNotification {
  UIEdgeInsets contentInsets = UIEdgeInsetsZero;
  self.scrollView.contentInset = contentInsets;
  self.scrollView.scrollIndicatorInsets = contentInsets;
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      if (prevState == UserModelStateConfirmCodeInProgress &&
          currentState == UserModelStateSignUpSuccess) {
        [self.navigationController dismissViewControllerAnimated:YES completion:^{}];
        return;
      }
      if (prevState == UserModelStateSignInInProgress &&
          currentState == UserModelStateSignedIn) {
        [self.navigationController dismissViewControllerAnimated:YES completion:^{}];
        return;
      }
      if (prevState == UserModelStatePasswordResetConfirmCodeInProgress &&
          currentState == UserModelStatePasswordResetSuccess) {
        [self.navigationController dismissViewControllerAnimated:YES completion:^{}];
        return;
      }
    });
  });
}

- (void)textFieldDidEndEditing:(UITextField *)textField {
  textField.text = [textField.text stringByTrimmingCharactersInSet:
               [NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

- (void)onUserStateUpdate:(nonnull UserState *)emailSendingState {}

@end
