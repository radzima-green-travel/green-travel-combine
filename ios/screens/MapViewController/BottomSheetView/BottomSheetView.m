//
//  BottomSheetViewController.m
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import "BottomSheetView.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "CommonButton.h"
#import "TypographyLegacy.h"
#import "PlaceItem.h"
#import "BookmarkButton.h"
#import "PlaceDetails.h"
#import "BookmarkButtonConstants.h"
#import "PlaceCategory.h"

@interface BottomSheetView ()

@property(strong, nonatomic) UIPanGestureRecognizer *recognizer;
@property(strong, nonatomic) NSString *itemUUID;
@property(strong, nonatomic) UILabel *headerLabel;
@property(strong, nonatomic) UILabel *addressLabel;
@property(strong, nonatomic) UIView *gripView;
@property(strong, nonatomic) BookmarkButton *bookmarkButton;
@property(assign, nonatomic) NSUInteger progressCounter;
@property(strong, nonatomic) NSString * kilometers;

@end

static const CGFloat kViewTotalHeight = 510.0;
static const CGFloat kViewVisibleHeight = 200.0;
static const CGFloat kVelocityEnoughToSwipeDown = 200.0;
static const CGFloat kDistanceTopGrip = 6;
static const CGFloat kGripWidth = 3.5;
static const CGFloat kDistanceGripTitle = 14.5;
static const CGFloat kDistanceTitleAddress = 4;
static const CGFloat kDistanceAddressButton = 24;
static const CGFloat kDistanceButtonBottom = 24;

@implementation BottomSheetView

- (instancetype)init {
  self = [super initWithFrame:CGRectZero];
  if (self) {
    [self setUp];
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  self.gripView.backgroundColor = [Colors get].bottomSheetGrip;
  [self.headerLabel setTextColor:[Colors get].headlineText];

  if (self.visible && self.progressCounter == 0) {
    [self adaptToContent];
  }
}

- (void)setUp {
  self.backgroundColor = [ColorsLegacy get].white;
  self.recognizer =
  [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panGesture:)];
  [self.recognizer setMaximumNumberOfTouches:1];
  [self addGestureRecognizer:self.recognizer];

  self.layer.cornerRadius = 15.0;
  self.layer.masksToBounds= YES;
  self.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.heightAnchor constraintEqualToConstant:kViewTotalHeight]
  ]];
#pragma mark - Grip view
  self.gripView = [[UIView alloc] init];
  self.gripView.translatesAutoresizingMaskIntoConstraints = NO;
  self.gripView.layer.cornerRadius = 1.75;
  self.gripView.layer.masksToBounds = YES;
  [self addSubview:self.gripView];
  [NSLayoutConstraint activateConstraints:@[
    [self.gripView.topAnchor constraintEqualToAnchor:self.topAnchor constant:kDistanceTopGrip],
    [self.gripView.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
    [self.gripView.widthAnchor constraintEqualToConstant:36.0],
    [self.gripView.heightAnchor constraintEqualToConstant:kGripWidth]
  ]];
#pragma mark - Details button

#pragma mark - Bookmark button
  self.bookmarkButton = [[BookmarkButton alloc] initWithFlavor:BookmarkButtonFlavorBottomSheet
                                               onBookmarkPress:self.onBookmarkPress];
  self.bookmarkButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self addSubview:self.bookmarkButton];

  [NSLayoutConstraint activateConstraints:@[
      [self.bookmarkButton.topAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.topAnchor constant:14.5],
      [self.bookmarkButton.trailingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.trailingAnchor constant:-2.0]
  ]];

  self.headerLabel = [[UILabel alloc] init];
  self.headerLabel.translatesAutoresizingMaskIntoConstraints = NO;
  self.headerLabel.numberOfLines = 0;
  self.headerLabel.lineBreakMode = NSLineBreakByWordWrapping;
  [self addSubview:self.headerLabel];

  [NSLayoutConstraint activateConstraints:@[
    [self.headerLabel.topAnchor constraintEqualToAnchor:self.gripView.bottomAnchor constant:kDistanceGripTitle],
    [self.headerLabel.leadingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.leadingAnchor constant:16.0],
    [self.headerLabel.trailingAnchor constraintEqualToAnchor:self.bookmarkButton.leadingAnchor constant:-16.0],
  ]];

  #pragma mark - Address label
  self.addressLabel = [[UILabel alloc] init];
  self.addressLabel.translatesAutoresizingMaskIntoConstraints = NO;
  self.addressLabel.numberOfLines = 0;
  self.addressLabel.lineBreakMode = NSLineBreakByWordWrapping;
  self.kilometers = NSLocalizedString(@"DetailsScreenBottomSheetKilometers", "");
  [self addSubview:self.addressLabel];

  [NSLayoutConstraint activateConstraints:@[
    [self.addressLabel.topAnchor constraintEqualToAnchor:self.headerLabel.bottomAnchor constant:kDistanceTitleAddress],
    [self.addressLabel.leadingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.leadingAnchor constant:16.0],
    [self.addressLabel.trailingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
  ]];

  self.detailsButton = [self makeDetailsButton];

  self.detailsButton.translatesAutoresizingMaskIntoConstraints = NO;
  [self addSubview:self.detailsButton];

  NSLayoutConstraint *widthConstraint = [self.detailsButton.widthAnchor constraintEqualToConstant:500.0];
  NSLayoutConstraint *leadingConstraint = [self.detailsButton.leadingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.leadingAnchor constant:16.0];
  NSLayoutConstraint *trailingConstraint = [self.detailsButton.trailingAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.trailingAnchor constant:-16.0];
  leadingConstraint.priority = UILayoutPriorityDefaultLow;
  trailingConstraint.priority = UILayoutPriorityDefaultLow;
  widthConstraint.priority = UILayoutPriorityDefaultLow;
  [NSLayoutConstraint activateConstraints:@[
    [self.detailsButton.topAnchor constraintEqualToAnchor:self.addressLabel.bottomAnchor constant:kDistanceAddressButton],
    leadingConstraint,
    trailingConstraint,
    widthConstraint,
    [self.detailsButton.centerXAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.centerXAnchor]
  ]];
}

#pragma mark - Details button
- (CommonButton *)makeDetailsButton {
  return [[CommonButton alloc] initWithTarget:self
                                       action:@selector(onDetailsPress:)
                                        label:NSLocalizedString(@"ButtonMoreInfoLabel", @"")];
}

- (CGFloat)heightOfContent {
  CGFloat heightTitle = self.headerLabel.intrinsicContentSize.height;
  CGFloat heightAddress = self.addressLabel.intrinsicContentSize.height;
  CGFloat heightButton = self.detailsButton.frame.size.height;
  CGFloat totalHeight = kDistanceTopGrip + kGripWidth + kDistanceGripTitle +
    heightTitle + kDistanceTitleAddress + heightAddress + kDistanceAddressButton +
    heightButton + kDistanceButtonBottom;
  return totalHeight;
}

- (BOOL)isInProgress {
  return self.progressCounter > 0;
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer
shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)
otherGestureRecognizer {
  return YES;
}

- (void)show:(PlaceItem *)item {
  self.itemUUID = item.uuid;
  [self.bookmarkButton setSelected:item.bookmarked];
  [self.headerLabel setAttributedText:[[TypographyLegacy get] makeTitle1Bold:item.title]];
  [self.headerLabel setTextColor:[Colors get].headlineText];
  [self.addressLabel setAttributedText:[[TypographyLegacy get] makeSubtitle2Regular:item.address color:[Colors get].mainText]];
  if (item.length.description && ![item.length.description isEqual:[NSNull null]] ) {
    self.addressLabel.attributedText = [[TypographyLegacy get] makeSubtitle3Regular:[NSString stringWithFormat:@"%@\n%.2f %@, %@", item.address, item.length.doubleValue, self.kilometers, item.category.singularName]];
  }

  [self appear];
}

- (void)setOnBookmarkPress:(void (^)(BOOL))onBookmarkPress {
  _onBookmarkPress = onBookmarkPress;
  [self.bookmarkButton setOnBookmarkPress:onBookmarkPress];
}

- (void)show:(PlaceItem *)item
 buttonLabel:(NSString *)buttonLabel
onPressDetails:(void(^)(void))onPressDetails
onBookmarkPress:(void(^)(BOOL))onBookmarkPress {
  self.itemUUID = item.uuid;
  self.onPressDetails = onPressDetails;
  [self.bookmarkButton setOnBookmarkPress:onBookmarkPress];
  [self.bookmarkButton setSelected:item.bookmarked];
  [self.headerLabel setAttributedText:[[TypographyLegacy get] makeTitle1Bold:item.title]];
  [self.headerLabel setTextColor:[Colors get].headlineText];
  [self.addressLabel setAttributedText:[[TypographyLegacy get] makeSubtitle2Regular:item.address color:[Colors get].mainText]];
  if (item.length.description && ![item.length.description isEqual:[NSNull null]] ) {
    self.addressLabel.attributedText = [[TypographyLegacy get] makeSubtitle3Regular:[NSString stringWithFormat:@"%@\n%.2f %@, %@", item.address, item.length.doubleValue, self.kilometers, item.category.singularName]];
  }

  [self appear];
}

- (void)hide {
  [self disappear];
}

- (void)setBookmarked:(PlaceItem *)item bookmarked:(BOOL)bookmarked {
  if ([item.uuid isEqualToString:self.itemUUID]) {
    [self.bookmarkButton setSelected:bookmarked];
  }
}

- (void)adaptToContent {
  self.top.constant = -[self heightOfContent];
  CGRect frame = self.frame;
  self.frame = CGRectMake(frame.origin.x,
                              [UIScreen mainScreen].bounds.size.height -
                              [self heightOfContent],
                              frame.size.width,
                              frame.size.height);
}

- (void)appear {
  __weak typeof(self) weakSelf = self;
  self.progressCounter++;
  [UIView animateWithDuration:0.3 delay:0 usingSpringWithDamping:0.8
        initialSpringVelocity:0.2 options:UIViewAnimationOptionCurveLinear
                   animations:^{
    [weakSelf adaptToContent];
  } completion:^(BOOL finished) {
    weakSelf.progressCounter--;
    if (!weakSelf.visible) {
      weakSelf.visible = YES;
      [weakSelf appearAnimationDidEnd:YES];
    }
  }];
}

- (void)disappear {
  __weak typeof(self) weakSelf = self;
  self.progressCounter++;
  [UIView animateWithDuration:0.2 animations:^{
    weakSelf.top.constant = 0;
    CGRect frame = weakSelf.frame;
    weakSelf.frame = CGRectMake(frame.origin.x, [UIScreen mainScreen].bounds.size.height, frame.size.width, frame.size.height);
  } completion:^(BOOL finished) {
    weakSelf.progressCounter--;
    if (weakSelf.visible) {
      weakSelf.visible = NO;
      [weakSelf appearAnimationDidEnd:NO];
    }
  }];
}

- (void)appearAnimationDidEnd:(BOOL)appear {
  if (self.onShow && self.active) {
    self.onShow(appear, self.itemUUID);
  }
}

- (void)panGesture:(UIPanGestureRecognizer *)recognizer {
  CGPoint translation = [recognizer translationInView:self];
  CGPoint velocity = [recognizer velocityInView:self];
  if (recognizer.state == UIGestureRecognizerStateEnded &&
      velocity.y >= kVelocityEnoughToSwipeDown) {
    [self disappear];
    [recognizer setTranslation:CGPointZero inView:self];
    return;
  }
  CGFloat y = self.frame.origin.y;
  CGFloat resultY = y + translation.y;
  CGFloat minY = [UIScreen mainScreen].bounds.size.height - kViewVisibleHeight;
  if (recognizer.state == UIGestureRecognizerStateEnded) {
    if (resultY > (minY + [self heightOfContent] / 3)) {
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
    resultY = y + translation.y / (divider < 1 ? 1 : divider);
  }
  self.frame = CGRectMake(self.frame.origin.x, resultY, self.frame.size.width, self.frame.size.height);
  [recognizer setTranslation:CGPointZero inView:self];
}

- (void)onDetailsPress:(id)sender {
  [self hide];
  self.onPressDetails();
}

@end
