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
#import "PlaceItem.h"
#import "BookmarkButton.h"

@interface BottomSheetViewController ()

@property(strong, nonatomic) UIPanGestureRecognizer *recognizer;
@property(strong, nonatomic) CommonButton *detailsButton;
@property(strong, nonatomic) NSString *itemUUID;
@property(strong, nonatomic) UILabel *headerLabel;
@property(assign, nonatomic, readwrite) BOOL inProgress;
@property(strong, nonatomic) BookmarkButton *bookmarkButton;
@property(copy, nonatomic) void(^onNavigatePress)(void);

@end

static const CGFloat kViewTotalHeight = 510.0;
static const CGFloat kViewVisibleHeight = 200.0;
static const CGFloat kVelocityEnoughToSwipeDown = 200.0;

@implementation BottomSheetViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [Colors get].white;
  self.recognizer =
  [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panGesture:)];
  [self.recognizer setMaximumNumberOfTouches:1];
  [self.view addGestureRecognizer:self.recognizer];
  
  self.view.layer.cornerRadius = 8.0;
  self.view.layer.masksToBounds= YES;
#pragma mark - Grip view
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
#pragma mark - Details button
  self.detailsButton = [[CommonButton alloc] initWithTarget:self action:@selector(onDetailsPress:) label:@"Узнать больше"];
  self.detailsButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:self.detailsButton];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.detailsButton.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:16.0],
      [self.detailsButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
      [self.detailsButton.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor
                                                                   constant:-16.0 - (UIScreen.mainScreen.bounds.size.height - kViewVisibleHeight)]
  ]];
#pragma mark - Bookmark button
  self.bookmarkButton = [[BookmarkButton alloc] initWithOnBookmarkPress:^(BOOL bookmarked) {}];
  self.bookmarkButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:self.bookmarkButton];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.bookmarkButton.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor constant:14.5],
      [self.bookmarkButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-2.0]
  ]];
#pragma mark - Header label
  self.headerLabel = [[UILabel alloc] init];
  self.headerLabel.translatesAutoresizingMaskIntoConstraints = NO;
  self.headerLabel.numberOfLines = 0;
  self.headerLabel.lineBreakMode = NSLineBreakByWordWrapping;
  [self.view addSubview:self.headerLabel];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.headerLabel.topAnchor constraintEqualToAnchor:gripView.bottomAnchor constant:14.5],
      [self.headerLabel.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:16.0],
      [self.headerLabel.trailingAnchor constraintEqualToAnchor:self.bookmarkButton.leadingAnchor constant:-16.0],
      [self.headerLabel.bottomAnchor constraintLessThanOrEqualToAnchor:self.detailsButton.topAnchor constant:-24.0],
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

- (void)show:(PlaceItem *)item
onNavigatePress:(void(^)(void))onNavigatePress
onBookmarkPress:(void(^)(BOOL))onBookmarkPress {
  self.itemUUID = item.uuid;
  self.onNavigatePress = onNavigatePress;
  [self.bookmarkButton setOnBookmarkPress:onBookmarkPress];
  [self.bookmarkButton setSelected:item.bookmarked];
  [self.headerLabel setAttributedText:[[Typography get] makeTitle1Bold:item.title]];
  //[self.headerLabel sizeToFit];
  
  if (self.inProgress || self.visible) {
    return;
  }
  [self appear];
}

- (void)hide {
  if (self.inProgress || !self.visible) {
    return;
  }
  [self disappear];
}

- (void)setBookmarked:(PlaceItem *)item bookmarked:(BOOL)bookmarked {
  if ([item.uuid isEqualToString:self.itemUUID]) {
    [self.bookmarkButton setSelected:bookmarked];
  }
}

- (void)appear {
  __weak typeof(self) weakSelf = self;
  self.inProgress = YES;
  [UIView animateWithDuration:0.3 delay:0 usingSpringWithDamping:0.8 initialSpringVelocity:0.2 options:UIViewAnimationOptionCurveLinear animations:^{
    CGRect frame = weakSelf.view.frame;
    CGFloat yComponent = UIScreen.mainScreen.bounds.size.height - kViewVisibleHeight;
    weakSelf.view.frame = CGRectMake(0, yComponent, frame.size.width, frame.size.height);
    weakSelf.visible = YES;
  } completion:^(BOOL finished) {
    weakSelf.inProgress = NO;
  }];
}

- (void)disappear {
  __weak typeof(self) weakSelf = self;
  self.inProgress = YES;
  [UIView animateWithDuration:0.2 animations:^{
    CGRect frame = weakSelf.view.frame;
    CGFloat yComponent = 0;
    weakSelf.view.frame = CGRectMake(0, UIScreen.mainScreen.bounds.size.height,
                                     frame.size.width,
                                     frame.size.height);
  } completion:^(BOOL finished) {
    weakSelf.visible = NO;
    weakSelf.inProgress = NO;
  }];
}

- (void)panGesture:(UIPanGestureRecognizer *)recognizer {
  CGPoint translation = [recognizer translationInView:self.view];
  CGPoint velocity = [recognizer velocityInView:self.view];
  
  if (recognizer.state == UIGestureRecognizerStateEnded && velocity.y >= kVelocityEnoughToSwipeDown) {
    [self disappear];
    [recognizer setTranslation:CGPointZero inView:self.view];
    return;
  }
  CGFloat y = CGRectGetMinY(self.view.frame);
  CGFloat resultY = y + translation.y;
  CGFloat minY = UIScreen.mainScreen.bounds.size.height - kViewVisibleHeight;
  if (recognizer.state == UIGestureRecognizerStateEnded) {
    if (resultY > (minY + kViewVisibleHeight / 3)) {
      [self disappear];
      [recognizer setTranslation:CGPointZero inView:self.view];
      return;
    }
    [self appear];
    [recognizer setTranslation:CGPointZero inView:self.view];
    return;
  }
  if (resultY < minY && translation.y < 0) {
    CGFloat divider = logf(fabs(resultY - minY)) / logf(2);
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
  [self hide];
  self.onNavigatePress();
}

@end
