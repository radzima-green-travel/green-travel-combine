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
#import "UserController.h"
#import "UserModel.h"
#import "UserState.h"
#import "CodeConfirmationViewController.h"

@interface ProfileViewController ()

@property (strong, nonatomic) SignUpFormView *signUpView;
@property (strong, nonatomic) SignInFormView *signInView;
@property (strong, nonatomic) UISegmentedControl *procedureChoiceView;

@end

static const CGFloat kMinContentInset = 23.5;
static const CGFloat kMaxContentWidth = 328.0;
static const CGFloat kTopOffset = 90.0;

@implementation ProfileViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
#pragma mark - Segmented control
  NSArray *items = @[NSLocalizedString(@"ProfileScreenChoiceSignIn", @""),
                     NSLocalizedString(@"ProfileScreenChoiceSignUp", @"")];
  
  self.procedureChoiceView = [[UISegmentedControl alloc] initWithItems:items];
  [self.procedureChoiceView addTarget:self action:@selector(onModeChoice:)
                     forControlEvents:UIControlEventValueChanged];
  
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
    [self.procedureChoiceView.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.procedureChoiceView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:19.0],
    leading,
    trailing,
    [self.procedureChoiceView.widthAnchor constraintLessThanOrEqualToConstant:kMaxContentWidth],
  ]];
  
  [self.procedureChoiceView setSelectedSegmentIndex:0];
  [self onModeChoice:self.procedureChoiceView];
  [self onUserStateUpdate:self.userModel.emailSendingState];
}

- (void)viewDidLayoutSubviews {
  [super viewDidLayoutSubviews];
  self.view.backgroundColor = [Colors get].background;
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  CodeConfirmationViewController *codeConfirmationViewController =
  [[CodeConfirmationViewController alloc] init];
  [self.navigationController pushViewController:codeConfirmationViewController
                                       animated:YES];
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
      [strongSelf onSubmit:email username:username password:password];
    }];
  }
  
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
    self.signInView = [[SignInFormView alloc] init];
  }
  
  self.signInView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.signInView];
  [NSLayoutConstraint activateConstraints:@[
    [self.signInView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:kTopOffset],
    [self.signInView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor],
    [self.signInView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
    [self.signInView.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor],
  ]];
}

- (void)onSubmit:(NSString *)email
        username:(NSString *)username
        password:(NSString *)password {
  [self.userController initiateSignUp:email username:username password:password];
}

- (void)onUserStateUpdate:(nonnull UserState *)emailSendingState {
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      if (emailSendingState.error) {
        
      }
      if (emailSendingState.inProgress) {
        [self enableLoadingIndicator:YES];
      }
      if (emailSendingState.codeSent) {
        [self enableLoadingIndicator:NO];
        CodeConfirmationViewController *codeConfirmationViewController =
        [[CodeConfirmationViewController alloc] initWithController:self.userController
                                                             model:self.userModel];
        [self.navigationController pushViewController:codeConfirmationViewController
                                             animated:YES];
      }
    });
  });
}

@end
