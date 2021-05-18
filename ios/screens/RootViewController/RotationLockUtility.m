//
//  RotationLockUtility.m
//  greenTravel
//
//  Created by Alex K on 5/15/21.
//

#import "RotationLockUtility.h"

@implementation RotationLockUtility

+ (void)lockToPortrait {
  AppDelegate *delegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  delegate.orientationLock = UIInterfaceOrientationMaskPortrait;
  [[UIDevice currentDevice] setValue:[NSNumber numberWithInt: UIInterfaceOrientationMaskPortrait] forKey:@"orientation"];
  [UINavigationController attemptRotationToDeviceOrientation];
}

@end
