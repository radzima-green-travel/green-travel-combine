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

@interface BaseFormViewController ()

@property(strong, nonatomic) UIView *contentContainerView;

@end

static const CGFloat kMinContentInset = 23.5;
static const CGFloat kMaxContentWidth = 328.0;
static const CGFloat kTopOffset = 90.0;

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
    [self.scrollView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
    [self.scrollView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
    [self.scrollView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor]
  ]];
  
  self.contentContainerView = [[UIView alloc] init];
  self.contentContainerView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.scrollView addSubview:self.contentContainerView];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.contentContainerView.topAnchor constraintEqualToAnchor:self.scrollView.topAnchor],
    [self.contentContainerView.leadingAnchor constraintEqualToAnchor:self.scrollView.leadingAnchor],
    [self.contentContainerView.trailingAnchor constraintEqualToAnchor:self.scrollView.trailingAnchor],
    [self.contentContainerView.widthAnchor constraintEqualToAnchor:self.scrollView.widthAnchor],
    [self.contentContainerView.bottomAnchor constraintEqualToAnchor:self.scrollView.bottomAnchor],
    [self.contentContainerView.heightAnchor constraintGreaterThanOrEqualToAnchor:self.scrollView.heightAnchor]
  ]];
  
  
  self.contentView = [[UIView alloc] init];
  self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.scrollView addSubview:self.contentView];
  
  NSLayoutConstraint *leading = [self.contentView.leadingAnchor
                                 constraintEqualToAnchor:self.contentContainerView.leadingAnchor constant:kMinContentInset];
  leading.priority = UILayoutPriorityDefaultHigh;
  NSLayoutConstraint *trailing = [self.contentView.trailingAnchor
                                  constraintEqualToAnchor:self.scrollView.trailingAnchor constant:-kMinContentInset];
  trailing.priority = UILayoutPriorityDefaultHigh;
  
  [NSLayoutConstraint activateConstraints:@[
    [self.contentView.topAnchor constraintEqualToAnchor:self.scrollView.topAnchor],
    [self.contentView.centerXAnchor constraintEqualToAnchor:self.scrollView.centerXAnchor],
    leading,
    trailing,
    [self.contentView.widthAnchor constraintLessThanOrEqualToConstant:kMaxContentWidth],
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
  [self.scrollView addSubview:self.loadingView];
  [NSLayoutConstraint activateConstraints:@[
    [self.loadingView.centerXAnchor constraintEqualToAnchor:self.scrollView.centerXAnchor],
    [self.loadingView.centerYAnchor constraintEqualToAnchor:self.scrollView.centerYAnchor],
  ]];
}

- (void)viewDidLayoutSubviews {
  [super viewDidLayoutSubviews];
  self.view.backgroundColor = [Colors get].background;
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
  UIEdgeInsets contentInsets = UIEdgeInsetsMake(0.0, 0.0, kbSize.height, 0.0);
  self.scrollView.contentInset = contentInsets;
  self.scrollView.scrollIndicatorInsets = contentInsets;
}

- (void)keyboardWillBeHidden:(NSNotification*)aNotification {
  UIEdgeInsets contentInsets = UIEdgeInsetsZero;
  self.scrollView.contentInset = contentInsets;
  self.scrollView.scrollIndicatorInsets = contentInsets;
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {}

@end
