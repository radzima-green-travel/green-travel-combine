//
//  BottomSheetViewController.m
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import "BottomSheetViewController.h"
#import "Colors.h"
#import "CommonButton.h"

@interface BottomSheetViewController ()

@property(strong, nonatomic) UIPanGestureRecognizer *recognizer;
@property(strong, nonatomic) CommonButton *detailsButton;

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
  [self.view addSubview:gripView];
  
  [NSLayoutConstraint activateConstraints:@[
      [gripView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
      [gripView.centerXAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.centerXAnchor],
      [gripView.heightAnchor constraintEqualToConstant:3.5]
  ]];
  
  self.detailsButton = [[CommonButton alloc] init];
  self.detailsButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:self.detailsButton];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.detailsButton.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
      [self.detailsButton.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
      [self.detailsButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
      [self.detailsButton.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor]
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

- (void)resetView {
  __weak typeof(self) weakSelf = self;
  [UIView animateWithDuration:0.2 animations:^{
    CGRect frame = weakSelf.view.frame;
    CGFloat yComponent = UIScreen.mainScreen.bounds.size.height - 400.0;
    weakSelf.view.frame = CGRectMake(0, yComponent, frame.size.width, frame.size.height);
    weakSelf.visible = YES;
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
