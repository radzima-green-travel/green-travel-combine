//
//  ProfileViewController.m
//  greenTravel
//
//  Created by Alex K on 19.05.22.
//

#import "LoginViewController.h"
#import "Colors.h"
#import "StyleUtils.h"
#import "SignUpFormView.h"
#import "SignInFormView.h"
#import "Colors.h"
#import "UserController.h"
#import "UserModel.h"
#import "UserState.h"
#import "CodeConfirmationViewController.h"
#import "UserModelConstants.h"
#import "ResetPasswordEMailViewController.h"
#import "ProfileTableViewController.h"

@interface LoginViewController ()

@property (strong, nonatomic) SignUpFormView *signUpView;
@property (strong, nonatomic) SignInFormView *signInView;
@property (strong, nonatomic) UISegmentedControl *procedureChoiceView;
@property (assign, nonatomic) BOOL navigatedToCodeScreen;

@end

static const CGFloat kMinContentInset = 23.5;
static const CGFloat kMaxContentWidth = 328.0;
static const CGFloat kTopOffset = 90.0;

@implementation LoginViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.title = NSLocalizedString(@"ProfileScreenTitle", @"");
#pragma mark - Segmented control
  NSArray *items = @[NSLocalizedString(@"ProfileScreenChoiceSignIn", @""),
                     NSLocalizedString(@"ProfileScreenChoiceSignUp", @"")];
  
  self.procedureChoiceView = [[UISegmentedControl alloc] initWithItems:items];
  [self.procedureChoiceView addTarget:self action:@selector(onModeChoice:)
                     forControlEvents:UIControlEventValueChanged];
  [self.procedureChoiceView setTintColor:[Colors get].buttonTextTint];
  self.procedureChoiceView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.procedureChoiceView];
  NSLayoutConstraint *leading = [self.procedureChoiceView.leadingAnchor
                                 constraintEqualToAnchor:self.contentView.leadingAnchor
                                 constant:kMinContentInset];
  leading.priority = UILayoutPriorityDefaultHigh;
  NSLayoutConstraint *trailing = [self.procedureChoiceView.trailingAnchor
                                  constraintEqualToAnchor:self.contentView.trailingAnchor
                                  constant:-kMinContentInset];
  trailing.priority = UILayoutPriorityDefaultHigh;
  [NSLayoutConstraint activateConstraints:@[
    [self.procedureChoiceView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor],
    [self.procedureChoiceView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
    [self.procedureChoiceView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:19.0],
    leading,
    trailing,
    [self.procedureChoiceView.widthAnchor constraintLessThanOrEqualToConstant:kMaxContentWidth],
  ]];
  
  [self.procedureChoiceView setSelectedSegmentIndex:0];
  [self onModeChoice:self.procedureChoiceView];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [self onUserModelStateTransitionFrom:self.userModel.prevState
                        toCurrentState:self.userModel.state];
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
    __weak typeof(self) weakSelf = self;
    self.signUpView =
    [[SignUpFormView alloc] initWithOnSubmit:^(NSString *email,
                                               NSString *username,
                                               NSString *password){
      __strong typeof(weakSelf) strongSelf = weakSelf;
      [strongSelf onSubmitSignUp:email username:username password:password];
    }];
  }
  
  self.signUpView.textFieldMail.textField.delegate = self;
  self.signUpView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.signUpView];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.signUpView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kTopOffset],
    [self.signUpView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor],
    [self.signUpView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
    [self.signUpView.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor],
  ]];
}

-(void)addSignInView {
  [self.signUpView removeFromSuperview];
  
  if (self.signInView == nil) {
    __weak typeof(self) weakSelf = self;
    self.signInView = [[SignInFormView alloc] initWithOnSubmit:^(NSString * _Nonnull email,
                                                                 NSString * _Nonnull username,
                                                                 NSString * _Nonnull password) {
      __strong typeof(weakSelf) strongSelf = weakSelf;
      [strongSelf onSubmitSignIn:email password:password];
    } onForgotPasswordSubmit:^{
      __strong typeof(weakSelf) strongSelf = weakSelf;
      [strongSelf onSubmitForgotPassword];
    }];
  }
  
  self.signInView.textFieldMail.textField.delegate = self;
  self.signInView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.signInView];
  [NSLayoutConstraint activateConstraints:@[
    [self.signInView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kTopOffset],
    [self.signInView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor],
    [self.signInView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
    [self.signInView.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor],
  ]];
}

- (void)onSubmitSignUp:(NSString *)email
        username:(NSString *)username
        password:(NSString *)password {
  [self.userController initiateSignUp:email username:username password:password];
  self.navigatedToCodeScreen = NO;
}

- (void)onSubmitSignIn:(NSString *)email
        password:(NSString *)password {
  [self.userController initiateSignIn:email password:password];
}

- (void)onSubmitForgotPassword {
  ResetPasswordEMailViewController *resetPasswordEMailViewController =
  [[ResetPasswordEMailViewController alloc] initWithController:self.userController
                                                       model:self.userModel];
  [self.navigationController pushViewController:resetPasswordEMailViewController
                                       animated:YES];
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                  toCurrentState:(UserModelState)currentState {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      if (prevState == UserModelStateFetched && currentState == UserModelStateSignUpEmailInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (currentState == UserModelStateSignInInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStateSignInInProgress && currentState == UserModelStateFetched) {
        [self enableLoadingIndicator:NO];
        // TODO: catch error when user enter wrong password or email
        return;
      }
      if (prevState == UserModelStateConfirmCodeNotSent && currentState == UserModelStateSignUpEmailInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStateConfirmCodeNotSent && currentState == UserModelStateConfirmCodeInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress && currentState == UserModelStateConfirmCodeSent) {
        [self enableLoadingIndicator:NO];
        return;
      }
      
      if (prevState == UserModelStateSignUpEmailInProgress && currentState == UserModelStateConfirmCodeNotSent && !self.navigatedToCodeScreen) {
        CodeConfirmationViewController *codeConfirmationViewController =
        [[CodeConfirmationViewController alloc] initWithController:self.userController
                                                             model:self.userModel];
        [self.navigationController pushViewController:codeConfirmationViewController
                                             animated:YES];
        self.navigatedToCodeScreen = YES;
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress && currentState == UserModelStateConfirmCodeNotSent && self.navigatedToCodeScreen) {
        [self enableLoadingIndicator:NO];
        return;
      }
      if (prevState == UserModelStateFetched &&
          currentState == UserModelStateSignUpEmailInProgress) {
        [self enableLoadingIndicator:YES];
        return;
      }
      if (prevState == UserModelStateSignUpEmailInProgress &&
          currentState == UserModelStateFetched) {
        [self enableLoadingIndicator:NO];
        // TODO: catch errors handling and push to correct view
        return;
      }
    });
  });
}

@end
