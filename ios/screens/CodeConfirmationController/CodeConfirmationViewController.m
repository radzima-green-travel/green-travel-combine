//
//  CodeConfirmationViewController.m
//  greenTravel
//
//  Created by Alex K on 28.05.22.
//

#import "CodeConfirmationViewController.h"
#import "PassCodeTextField.h"

@interface CodeConfirmationViewController ()

@property(strong, nonatomic) PassCodeTextField *passCodeField;
@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) UIView *contentView;

@end

@implementation CodeConfirmationViewController

- (void)viewDidLoad {
  [super viewDidLoad];
 
  self.title = NSLocalizedString(@"CodeConfirmationScreenTitle", @"");
  
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
  
  self.contentView = [[UIView alloc] init];
  self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.scrollView addSubview:self.contentView];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.contentView.topAnchor constraintEqualToAnchor:self.scrollView.topAnchor],
    [self.contentView.leadingAnchor constraintEqualToAnchor:self.scrollView.leadingAnchor],
    [self.contentView.trailingAnchor constraintEqualToAnchor:self.scrollView.trailingAnchor],
    [self.contentView.bottomAnchor constraintEqualToAnchor:self.scrollView.bottomAnchor],
    [self.contentView.widthAnchor constraintEqualToAnchor:self.scrollView.widthAnchor],
    [self.contentView.heightAnchor constraintGreaterThanOrEqualToAnchor:self.scrollView.heightAnchor]
  ]];
  
  self.passCodeField = [[PassCodeTextField alloc] init];
  self.passCodeField.translatesAutoresizingMaskIntoConstraints = NO;
  [self.contentView addSubview:self.passCodeField];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.passCodeField.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.passCodeField.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
  ]];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
