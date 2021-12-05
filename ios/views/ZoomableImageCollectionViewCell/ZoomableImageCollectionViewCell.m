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
@property (assign, nonatomic) CGPoint initialCenter;
@property (assign, nonatomic) CGRect startingRect;

@end

static const CGFloat kMinOvelayAlpha = 0.4;
static const CGFloat kMaxOvelayAlpha = 0.8;

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
    [[UIPinchGestureRecognizer alloc] initWithTarget:self action:@selector(pinch:)];
    pinchRecognizer.delegate = self;
  }
  return self;
}

- (void)pinch:(UIPinchGestureRecognizer)sender {
  switch (sender.state) {
    case UIGestureRecognizerStateBegan: {
      CGSize frameSize = self.imageView.frame.size;
      CGSize boundsSize = self.imageView.bounds.size;
      CGFloat currentScale = frameSize.width / boundsSize.width;
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
      self.overlayView = [UIView alloc] initWithFrame:CGRectMake(0, 0,
                                                                 windowSize.width,
                                                                 windowSize.height);
      self.overlayView.backgroundColor = UIColor.blackColor;
      self.overlayView.alpha = kMinOvelayAlpha;
      [sender locationInView:currentWindow];
      self.windowImageView = [[UIImageView alloc] initWithImage:self.imageView.image];
      [self.windowImageView setContentMode:UIViewContentModeScaleAspectFill];
      [self.windowImageView setClipsToBounds:YES];
      CGPoint originOfImageViewInWindow =
      [self.imageView convertPoint:self.imageView.frame.origin toView:nil];
      CGRect frameOfImageViewInWindow = CGRectMake(originOfImageViewInWindow.x,
                                                   originOfImageViewInWindow.y,
                                                   frameSize.width,
                                                   frameSize.height);
      [self.windowImageView setFrame:frameOfImageViewInWindow];
    };break;
    case UIGestureRecognizerStateChanged: {
      UIWindow *currentWindow = getCurrentWindow();
      if (currentWindow == nil) {
        return;
      }
      CGPoint initialCenter = self.initialCenter;
      CGFloat windowImageViewWidth = self.windowImageView.frame.size.width;
      CGFloat currentScale = windowImageViewWidth / self.startingRect.size.width;
      CGFloat newScale = currentScale * sender.scale;
      self.overlayView.alpha = kMinOvelayAlpha + (newScale - 1) < kMaxOvelayAlpha ?
      kMinOvelayAlpha + (newScale - 1) : kMaxOvelayAlpha;
      CGPoint pinchPointInWindow = [sender locationInView:currentWindow];
      CGFloat pinchCenter = CGPointMake(pinchPointInWindow.x - CGRectGetMidX(currentWindow.bounds.size),
                                        pinchPointInWindow.y - CGRectGetMidY(currentWindow.bounds.size));
      CGFloat centerXDifference = self.initialCenter.x - pinchPointInWindow.x;
      CGFloat centerYDifference = self.initialCenter.y - pinchPointInWindow.y;
      CGFloat zoomScale = (newScale * windowImageViewWidth >= self.imageView.frame.width) ?
          newScale : currentScale;
      CGAffineTransform transform = currentWindow.transform;
      transform = CGAffineTransformTranslate(transform, pinchCenter.x, pinchCenter.y);
      transform = CGAffineTransformScale(transform, zoomScale, zoomScale);
      transform = CGAffineTransformTranslate(transform, -centerXDifference, -centerYDifference);
      [currentWindow setTransform:transform];
      sender.scale = 1;
    };break;
    case UIGestureRecognizerStateEnded:
    case UIGestureRecognizerStateFailed:
    case UIGestureRecognizerStateCancelled: {
      if (self.windowImageView == nil) {
        return;
      }
      __weak typeof(self) weakSelf = self;
      UIView animateWithDuration:0.3 animations:^{
        [weakSelf.windowImageView setTransform:CGAffineTransformIdentity];
      } completion:^(BOOL finished) {
        [weakSelf.windowImageView removeFromSuperview];
        [weakSelf.overlayView removeFromSuperview];
        [weakSelf.imageView setHidden:NO];
        [weakSelf.delegate setZooming:NO];
      }
    };break;
    default:
      break;
  }
}


@end
