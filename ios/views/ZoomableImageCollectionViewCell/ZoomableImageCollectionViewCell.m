//
//  ZoomableImageCollectionViewCell.m
//  greenTravel
//
//  Created by Alex K on 5.12.21.
//

#import "ZoomableImageCollectionViewCell.h"
#import "ViewUtils.h"

@interface ZoomableImageCollectionViewCell()

@property (strong, nonatomic) UIView *overlayView;
@property (strong, nonatomic) UIView *windowImageView;
@property (assign, nonatomic) CGRect startingRect;
@property (strong, nonatomic) UISelectionFeedbackGenerator *feedbackGenerator;

@end

static const CGFloat kMinOvelayAlpha = 0.0;
static const CGFloat kMaxOvelayAlpha = 0.5;
static const NSTimeInterval kAnimationSnapBackDuration = 0.3;

@implementation ZoomableImageCollectionViewCell

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    self.imageView = [[UIImageView alloc] init];
    [self addSubview:self.imageView];
    self.imageView.translatesAutoresizingMaskIntoConstraints = NO;
    self.imageView.contentMode = UIViewContentModeScaleAspectFill;
    self.imageView.clipsToBounds = YES;
    [NSLayoutConstraint activateConstraints:@[
      [self.imageView.topAnchor constraintEqualToAnchor:self.topAnchor],
      [self.imageView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [self.imageView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      [self.imageView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
    ]];
    UIPinchGestureRecognizer *pinchRecognizer =
    [[UIPinchGestureRecognizer alloc] initWithTarget:self action:@selector(onPinch:)];
    UIPanGestureRecognizer *panRecognizer =
    [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(onPan:)];
    panRecognizer.delegate = self;
    [self addGestureRecognizer:pinchRecognizer];
    [self addGestureRecognizer:panRecognizer];
  }
  return self;
}

#pragma mark - onPinch
- (void)onPinch:(UIPinchGestureRecognizer *)sender {
  switch (sender.state) {
    case UIGestureRecognizerStateBegan: {
      if (self.imageView.image == nil) {
        return;
      }
      CGSize imageFrameSize = self.imageView.frame.size;
      CGSize boundsSize = self.imageView.bounds.size;
      CGFloat currentScale = imageFrameSize.width / boundsSize.width;
      CGFloat newScale = currentScale * sender.scale;
      if (newScale <= 1) {
        return;
      }
      UIWindow *currentWindow = getCurrentWindow();
      if (currentWindow == nil) {
        return;
      }
      CGSize windowSize = currentWindow.frame.size;
      [self.delegate setZooming:YES];
      self.overlayView = [[UIView alloc] initWithFrame:CGRectMake(0, 0,
                                                                  windowSize.width,
                                                                  windowSize.height)];
      self.overlayView.backgroundColor = UIColor.blackColor;
      self.overlayView.alpha = kMinOvelayAlpha;
      [currentWindow addSubview:self.overlayView];
      
      self.windowImageView = [[UIImageView alloc] initWithImage:self.imageView.image];
      [self.windowImageView setContentMode:UIViewContentModeScaleAspectFill];
      [self.windowImageView setClipsToBounds:YES];
      CGPoint pinchPointInImage = [sender locationInView:self.imageView];
      self.windowImageView.layer.anchorPoint =
      CGPointMake(pinchPointInImage.x / imageFrameSize.width,
                  pinchPointInImage.y / imageFrameSize.height);
      
      CGPoint originOfImageViewInWindow =
      [self.imageView convertPoint:self.imageView.frame.origin toView:nil];
      CGRect frameOfImageViewInWindow = CGRectMake(originOfImageViewInWindow.x,
                                                   originOfImageViewInWindow.y,
                                                   imageFrameSize.width,
                                                   imageFrameSize.height);
      self.startingRect = frameOfImageViewInWindow;
      [self.windowImageView setFrame:self.startingRect];
      [currentWindow addSubview:self.windowImageView];
      [self.imageView setHidden:YES];
      self.feedbackGenerator = [[UISelectionFeedbackGenerator alloc] init];
      [self.feedbackGenerator prepare];
    };break;
    case UIGestureRecognizerStateChanged: {
      UIWindow *currentWindow = getCurrentWindow();
      if (currentWindow == nil) {
        return;
      }
      CGFloat windowImageViewWidth = self.windowImageView.frame.size.width;
      CGFloat currentScale = windowImageViewWidth / self.startingRect.size.width;
      CGFloat newScale = currentScale * sender.scale;
      self.overlayView.alpha = kMinOvelayAlpha + (newScale - 1) < kMaxOvelayAlpha ?
      kMinOvelayAlpha + (newScale - 1) : kMaxOvelayAlpha;
      CGFloat zoomScale = (newScale * windowImageViewWidth >= self.imageView.frame.size.width) ?
      newScale : currentScale;
      CGAffineTransform transform = currentWindow.transform;
      CGAffineTransform scale = CGAffineTransformMakeScale(zoomScale, zoomScale);
      transform = CGAffineTransformConcat(transform, scale);
      [self.windowImageView setTransform:transform];
      sender.scale = 1;
    };break;
    case UIGestureRecognizerStateEnded:
    case UIGestureRecognizerStateFailed:
    case UIGestureRecognizerStateCancelled: {
      if (self.windowImageView == nil) {
        return;
      }
      __weak typeof(self) weakSelf = self;
      [UIView animateWithDuration:kAnimationSnapBackDuration animations:^{
        [weakSelf.windowImageView setTransform:CGAffineTransformIdentity];
        weakSelf.overlayView.alpha = kMinOvelayAlpha;
      } completion:^(BOOL finished) {
        [weakSelf.windowImageView removeFromSuperview];
        [weakSelf.overlayView removeFromSuperview];
        [weakSelf.imageView setHidden:NO];
        [weakSelf.delegate setZooming:NO];
        [weakSelf.feedbackGenerator selectionChanged];
        weakSelf.feedbackGenerator = nil;
      }];
    };break;
    default:
      break;
  }
}

#pragma mark - onPan
- (void)onPan:(UIPanGestureRecognizer *)sender {
  switch (sender.state) {
    case UIGestureRecognizerStateBegan:break;
    case UIGestureRecognizerStateChanged: {
      UIWindow *currentWindow = getCurrentWindow();
      if (currentWindow == nil) {
        return;
      }
      CGPoint translation = [sender translationInView:currentWindow];
      CGAffineTransform transform = self.windowImageView.transform;
      CGAffineTransform translate = CGAffineTransformMakeTranslation(translation.x,
                                                                     translation.y);
      transform = CGAffineTransformConcat(transform, translate);
      [self.windowImageView setTransform:transform];
    };break;
    case UIGestureRecognizerStateEnded:
    case UIGestureRecognizerStateFailed:
    case UIGestureRecognizerStateCancelled:break;
    default:
      break;
  }
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer {
  return YES;
}

@end
