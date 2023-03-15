#import <UIKit/UIKit.h>

#import "AppDelegate.h"

int main(int argc, char * argv[]) {
  @autoreleasepool {
    Class testingAppDelegateClass = NSClassFromString(@"TestingAppDelegate");
    if (testingAppDelegateClass == nil) {
      return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
    } else {
      return UIApplicationMain(argc, argv, nil, @"TestingAppDelegate");
    }
  }
}
