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

@end

@implementation BottomSheetViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [Colors get].white;
  self.recognizer =
  [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panGesture:)];
  self.recognizer.delegate = self;
  UISwipeGestureRecognizer *recognizerSwipe =
  [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(swipeGesture:)];
  recognizerSwipe.numberOfTouchesRequired = 1;
  recognizerSwipe.direction = UISwipeGestureRecognizerDirectionDown;
  //[self.view addGestureRecognizer:recognizerSwipe];
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
      [self.headerLabel.topAnchor constraintEqualToAnchor:gripView.bottomAnchor constant:10.0],
      [self.headerLabel.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:10.0],
      [self.headerLabel.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-10.0],
  ]];
  
  self.detailsButton = [[CommonButton alloc] initWithTarget:self action:@selector(onDetailsPress:) label:@"Подробнее"];
  self.detailsButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:self.detailsButton];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.detailsButton.topAnchor constraintEqualToAnchor:self.headerLabel.bottomAnchor constant:10.0],
      [self.detailsButton.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
      [self.detailsButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
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

- (void)show:(NSString *)title {
  [self.headerLabel setAttributedText:[[Typography get] makeTitle1Bold:title]];
  
  [self resetView];
}

- (void)resetView {
  __weak typeof(self) weakSelf = self;
  [UIView animateWithDuration:0.3 delay:0 usingSpringWithDamping:0.8 initialSpringVelocity:0.2 options:UIViewAnimationOptionCurveLinear animations:^{
    CGRect frame = weakSelf.view.frame;
    CGFloat yComponent = UIScreen.mainScreen.bounds.size.height - 200.0;
    weakSelf.view.frame = CGRectMake(0, yComponent, frame.size.width, frame.size.height);
    weakSelf.visible = YES;
  } completion:^(BOOL finished) {
    
  }];
}

- (void)dismissView {
  __weak typeof(self) weakSelf = self;
  [UIView animateWithDuration:0.2 animations:^{
    CGRect frame = weakSelf.view.frame;
    CGFloat yComponent = 0;
    weakSelf.view.frame = CGRectMake(0, UIScreen.mainScreen.bounds.size.height,
                                     frame.size.width,
                                     frame.size.height);
    weakSelf.visible = NO;
  }];
}

-(void)panGesture:(UIPanGestureRecognizer *)recognizer {
  CGPoint translation = [recognizer translationInView:self.view];
  CGPoint velocity = [recognizer velocityInView:self.view];
  
  //NSLog(@"velocity: %@", [NSValue valueWithCGPoint:velocity]);
  
  if (recognizer.state == UIGestureRecognizerStateEnded && velocity.y >= 1000.0) {
    [self dismissView];
    //[recognizer setTranslation:CGPointZero inView:self.view];
    return;
  }
  if (recognizer.state == UIGestureRecognizerStateEnded) {
    [self resetView];
    [recognizer setTranslation:CGPointZero inView:self.view];
    return;
  }
  CGFloat y = CGRectGetMinY(self.view.frame);
  CGFloat resultY = y + translation.y;
  NSLog(@"Result y: %f", resultY);
  self.view.frame = CGRectMake(0, resultY, self.view.frame.size.width,
                               self.view.frame.size.height);
  [recognizer setTranslation:CGPointZero inView:self.view];
}

-(void)swipeGesture:(UISwipeGestureRecognizer *)recognizer {
  if (recognizer.direction == UISwipeGestureRecognizerDirectionDown &&
      recognizer.state == UIGestureRecognizerStateEnded) {
    [self dismissView];
  }
}

@end
