//
//  NavigationController.m
//  greenTravel
//
//  Created by Eugene Kudritsky on 16.06.22.
//

#import "NavigationController.h"

@interface NavigationController ()

@end

@implementation NavigationController

- (UIViewController *)childViewControllerForStatusBarStyle {
  return self.topViewController;
}

@end
