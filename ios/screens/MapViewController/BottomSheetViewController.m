//
//  BottomSheetViewController.m
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import "BottomSheetViewController.h"
#import "Colors.h"
#import "CommonButton.h"
#import "Typography.h"

@interface BottomSheetViewController ()

@property(strong, nonatomic) UIPanGestureRecognizer *recognizer;
@property(strong, nonatomic) CommonButton *detailsButton;
@property(strong, nonatomic) UILabel *headerLabel;
@property(assign, nonatomic, readwrite) BOOL inProgress;

@end

@implementation BottomSheetViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [Colors get].white;
  self.recognizer =
  [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panGesture:)];
  [self.recognizer setMaximumNumberOfTouches:1];
  [self.view addGestureRecognizer:self.recognizer];
  
  UIView *gripView = [[UIView alloc] init];
  gripView.translatesAutoresizingMaskIntoConstraints = NO;
  gripView.backgroundColor = [Colors get].alto;
  gripView.layer.cornerRadius = 1.75;
  gripView.layer.masksToBounds = YES;
  [self.view addSubview:gripView];
  [NSLayoutConstraint activateConstraints:@[
    [gripView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor constant:6.0],
      [gripView.centerXAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerXAnchor],
      [gripView.widthAnchor constraintEqualToConstant:36.0],
      [gripView.heightAnchor constraintEqualToConstant:3.5]
  ]];
  
  self.headerLabel = [[UILabel alloc] init];
  self.headerLabel.translatesAutoresizingMaskIntoConstraints = NO;
  self.headerLabel.numberOfLines = 3;
  [self.view addSubview:self.headerLabel];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.headerLabel.topAnchor constraintEqualToAnchor:gripView.bottomAnchor constant:14.5],
      [self.headerLabel.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:16.0],
      [self.headerLabel.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
  ]];
  
  self.detailsButton = [[CommonButton alloc] initWithTarget:self action:@selector(onDetailsPress:) label:@"Узнать больше"];
  self.detailsButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:self.detailsButton];
  [NSLayoutConstraint activateConstraints:@[
      [self.detailsButton.topAnchor constraintEqualToAnchor:self.headerLabel.bottomAnchor constant:24.0],
      [self.detailsButton.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:16.0],
      [self.detailsButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
  ]];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer
shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)
otherGestureRecognizer {
  return YES;
}

- (void)show:(NSString *)title completion:(void(^)(void))completion {
  if (self.inProgress) {
    return;
  }
  if (self.visible) {
    self.inProgress = YES;
    __weak typeof(self) weakSelf = self;
    [self disappear:^{
      [weakSelf.headerLabel setAttributedText:[[Typography get] makeTitle1Bold:title]];
      [weakSelf appear:^{
        weakSelf.inProgress = NO;
      }];
    }];
    return;
  }
  self.inProgress = YES;
  [self.headerLabel setAttributedText:[[Typography get] makeTitle1Bold:title]];
  __weak typeof(self) weakSelf = self;
  [self appear:^{
    weakSelf.inProgress = NO;
  }];
}

- (void)appear:(void(^)(void))completion {
  __weak typeof(self) weakSelf = self;
  [UIView animateWithDuration:0.3 delay:0 usingSpringWithDamping:0.8 initialSpringVelocity:0.2 options:UIViewAnimationOptionCurveLinear animations:^{
    CGRect frame = weakSelf.view.frame;
    CGFloat yComponent = UIScreen.mainScreen.bounds.size.height - 200.0;
    weakSelf.view.frame = CGRectMake(0, yComponent, frame.size.width, frame.size.height);
    weakSelf.visible = YES;
  } completion:^(BOOL finished) {
    completion();
  }];
}

- (void)disappear:(void(^)(void))completion {
  __weak typeof(self) weakSelf = self;
  [UIView animateWithDuration:0.2 animations:^{
    CGRect frame = weakSelf.view.frame;
    CGFloat yComponent = 0;
    weakSelf.view.frame = CGRectMake(0, UIScreen.mainScreen.bounds.size.height,
                                     frame.size.width,
                                     frame.size.height);
    weakSelf.visible = NO;
  } completion:^(BOOL finished) {
    completion();
  }];
}

- (void)panGesture:(UIPanGestureRecognizer *)recognizer {
  CGPoint translation = [recognizer translationInView:self.view];
  CGPoint velocity = [recognizer velocityInView:self.view];
  
  if (recognizer.state == UIGestureRecognizerStateEnded && velocity.y >= 1000.0) {
    [self disappear:^{}];
    [recognizer setTranslation:CGPointZero inView:self.view];
    return;
  }
  CGFloat y = CGRectGetMinY(self.view.frame);
  CGFloat resultY = y + translation.y;
  if (recognizer.state == UIGestureRecognizerStateEnded) {
    if (resultY > 650.0) {
      [self disappear:^{}];
      [recognizer setTranslation:CGPointZero inView:self.view];
      return;
    }
    [self appear:^{}];
    [recognizer setTranslation:CGPointZero inView:self.view];
    return;
  }
  if (resultY < 530.0) {
    CGFloat divider = logf(fabs(resultY - 530)) / logf(2);
    NSLog(@"Divider: %f", divider);
    resultY = y + translation.y / (divider < 1 ? 1 : divider);
  }
  NSLog(@"Result y: %f", resultY);
  NSLog(@"translation.y: %f", translation.y);
  self.view.frame = CGRectMake(0, resultY, self.view.frame.size.width,
                               self.view.frame.size.height);
  [recognizer setTranslation:CGPointZero inView:self.view];
}

- (void)onDetailsPress:(id)sender {
  
}

@end
