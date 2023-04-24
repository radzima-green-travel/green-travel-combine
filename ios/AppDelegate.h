#import <React/RCTBridgeDelegate.h>
#import <Expo/Expo.h>
#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>

@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

- (void)saveContext;


@end

