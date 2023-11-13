#import <RCTAppDelegate.h>
#import <Expo/Expo.h>
#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>

@interface AppDelegate : EXAppDelegateWrapper

@property (nonatomic, strong) UIWindow *window;

- (void)saveContext;


@end

