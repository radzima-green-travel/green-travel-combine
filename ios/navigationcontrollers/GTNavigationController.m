//
//  GTNavigationController.m
//  greenTravel
//
//  Created by Eugene Kudritsky on 16.06.22.
//

#import "GTNavigationController.h"

@interface GTNavigationController ()

@end

@implementation GTNavigationController

- (UIViewController *)childViewControllerForStatusBarStyle {
  return self.topViewController;
}

@end
