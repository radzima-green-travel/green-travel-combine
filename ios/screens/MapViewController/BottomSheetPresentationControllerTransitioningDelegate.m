//
//  BottomSheetPresentationControllerTransitioningDelegate.m
//  greenTravel
//
//  Created by Alex K on 8/15/21.
//

#import "BottomSheetPresentationControllerTransitioningDelegate.h"
#import "BottomSheetPresentationController.h"

@implementation BottomSheetPresentationControllerTransitioningDelegate

- (UIPresentationController *)presentationControllerForPresentedViewController:(UIViewController *)presented presentingViewController:(UIViewController *)presenting sourceViewController:(UIViewController *)source {
  return [[BottomSheetPresentationController alloc] initWithPresentedViewController:presented presentingViewController:presenting];
};

@end
