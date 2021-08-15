//
//  BottomSheetPresentationController.m
//  greenTravel
//
//  Created by Alex K on 8/15/21.
//

#import "BottomSheetPresentationController.h"
#import "BottomSheetTouchForwardingView.h"

@interface BottomSheetPresentationController()


@property (strong, nonatomic) BottomSheetTouchForwardingView *touchForwardingView;

@end

@implementation BottomSheetPresentationController

- (instancetype)initWithPresentedViewController:(UIViewController *)presentedViewController presentingViewController:(UIViewController *)presentingViewController {
  self = [super initWithPresentedViewController:presentedViewController presentingViewController:presentingViewController];
  if (self) {
    self.touchForwardingView = [[BottomSheetTouchForwardingView alloc] init];
  }
  return self;
}

- (CGRect)frameOfPresentedViewInContainerView {
  CGSize containerSize = self.containerView.bounds.size;
  return CGRectMake(0, containerSize.height - 200, containerSize.width, 200);
}

- (void)presentationTransitionWillBegin {
  [self.presentingViewController.transitionCoordinator animateAlongsideTransition:^(id<UIViewControllerTransitionCoordinatorContext>  _Nonnull context) {
      
  } completion:nil];

//  self.touchForwardingView.passthroughViews = @[self.presentingViewController.view];
//  [self.containerView insertSubview:self.touchForwardingView atIndex:0];
}

- (void)dismissalTransitionDidEnd:(BOOL)completed {
  
}

@end
