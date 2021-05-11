//
//  BottomSheetViewController.m
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import "BottomSheetView.h"
#import "Colors.h"
#import "CommonButton.h"
#import "Typography.h"
#import "PlaceItem.h"
#import "BookmarkButton.h"

@interface BottomSheetView ()

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

@implementation BottomSheetView

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    [self setUp];
  }
  return self;
}

- (void)setUp {
  self.backgroundColor = [Colors get].white;
  self.recognizer =
  [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panGesture:)];
  [self.recognizer setMaximumNumberOfTouches:1];
  [self addGestureRecognizer:self.recognizer];
  
  self.layer.cornerRadius = 8.0;
  self.layer.masksToBounds= YES;
  self.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.heightAnchor constraintEqualToConstant:kViewTotalHeight]
  ]];
#pragma mark - Grip view
  UIView *gripView = [[UIView alloc] init];
  gripView.translatesAutoresizingMaskIntoConstraints = NO;
  gripView.backgroundColor = [Colors get].alto;
  gripView.layer.cornerRadius = 1.75;
  gripView.layer.masksToBounds = YES;
  [self addSubview:gripView];
  [NSLayoutConstraint activateConstraints:@[
    [gripView.topAnchor constraintEqualToAnchor:self.topAnchor constant:6.0],
    [gripView.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
    [gripView.widthAnchor constraintEqualToConstant:36.0],
    [gripView.heightAnchor constraintEqualToConstant:3.5]
  ]];
#pragma mark - Details button
  self.detailsButton = [[CommonButton alloc] initWithTarget:self action:@selector(onDetailsPress:) label:@"Узнать больше"];
  self.detailsButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self addSubview:self.detailsButton];
  
  NSLayoutConstraint *widthConstraint = [self.detailsButton.widthAnchor constraintEqualToConstant:500.0];
  NSLayoutConstraint *leadingConstraint = [self.detailsButton.leadingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.leadingAnchor constant:16.0];
  NSLayoutConstraint *trailingConstraint = [self.detailsButton.trailingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.trailingAnchor constant:-16.0];
  leadingConstraint.priority = UILayoutPriorityDefaultLow;
  trailingConstraint.priority = UILayoutPriorityDefaultLow;
  widthConstraint.priority = UILayoutPriorityDefaultLow;
  [NSLayoutConstraint activateConstraints:@[
      leadingConstraint,
      trailingConstraint,
      [self.detailsButton.bottomAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.bottomAnchor
                                                                   constant:-16.0 - (kViewTotalHeight - kViewVisibleHeight)],
      widthConstraint,
      [self.detailsButton.centerXAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.centerXAnchor]
  ]];
#pragma mark - Bookmark button
  self.bookmarkButton = [[BookmarkButton alloc] initWithOnBookmarkPress:^(BOOL bookmarked) {}];
  self.bookmarkButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self addSubview:self.bookmarkButton];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.bookmarkButton.topAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.topAnchor constant:14.5],
      [self.bookmarkButton.trailingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.trailingAnchor constant:-2.0]
  ]];
#pragma mark - Header label
  self.headerLabel = [[UILabel alloc] init];
  self.headerLabel.translatesAutoresizingMaskIntoConstraints = NO;
  self.headerLabel.numberOfLines = 0;
  self.headerLabel.lineBreakMode = NSLineBreakByWordWrapping;
  [self addSubview:self.headerLabel];
  
  [NSLayoutConstraint activateConstraints:@[
      [self.headerLabel.topAnchor constraintEqualToAnchor:gripView.bottomAnchor constant:14.5],
      [self.headerLabel.leadingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.leadingAnchor constant:16.0],
      [self.headerLabel.trailingAnchor constraintEqualToAnchor:self.bookmarkButton.leadingAnchor constant:-16.0],
      [self.headerLabel.bottomAnchor constraintLessThanOrEqualToAnchor:self.detailsButton.topAnchor constant:-24.0],
  ]];
}

- (NSLayoutConstraint *)getTopConstraint {
//  NSLayoutConstraint *topConstraint;
//  NSArray<NSLayoutConstraint *> *constraints = [self constraints];
//  topConstraint = [constraints filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(NSLayoutConstraint *  _Nullable constraint, NSDictionary<NSString *,id> * _Nullable bindings) {
//    return [constraint.identifier isEqualToString:@"top"];
//  }]].firstObject;
  return self.top;
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
    [weakSelf getTopConstraint].constant = -kViewVisibleHeight;
    [weakSelf.superview layoutIfNeeded];
    weakSelf.visible = YES;
  } completion:^(BOOL finished) {
    weakSelf.inProgress = NO;
  }];
}

- (void)disappear {
  __weak typeof(self) weakSelf = self;
  self.inProgress = YES;
  [UIView animateWithDuration:0.2 animations:^{
    [weakSelf getTopConstraint].constant = 0;
    [weakSelf.superview layoutIfNeeded];
  } completion:^(BOOL finished) {
    weakSelf.visible = NO;
    weakSelf.inProgress = NO;
  }];
}

- (void)panGesture:(UIPanGestureRecognizer *)recognizer {
  CGPoint translation = [recognizer translationInView:self];
  CGPoint velocity = [recognizer velocityInView:self];
  
  if (recognizer.state == UIGestureRecognizerStateEnded && velocity.y >= kVelocityEnoughToSwipeDown) {
    [self disappear];
    [recognizer setTranslation:CGPointZero inView:self];
    return;
  }
  CGFloat y = CGRectGetMinY(self.frame);
  CGFloat resultY = y + translation.y;
  CGFloat minY = UIScreen.mainScreen.bounds.size.height - kViewVisibleHeight;
  if (recognizer.state == UIGestureRecognizerStateEnded) {
    if (resultY > (minY + kViewVisibleHeight / 3)) {
      [self disappear];
      [recognizer setTranslation:CGPointZero inView:self];
      return;
    }
    [self appear];
    [recognizer setTranslation:CGPointZero inView:self];
    return;
  }
  if (resultY < minY && translation.y < 0) {
    CGFloat divider = logf(fabs(resultY - minY)) / logf(2);
    NSLog(@"Divider: %f", divider);
    resultY = y + translation.y / (divider < 1 ? 1 : divider);
  }
  NSLog(@"Result y: %f", resultY);
  NSLog(@"translation.y: %f", translation.y);
  self.frame = CGRectMake(0, resultY, self.frame.size.width,
                               self.frame.size.height);
  [recognizer setTranslation:CGPointZero inView:self];
}

- (void)onDetailsPress:(id)sender {
  [self hide];
  self.onNavigatePress();
}

@end
