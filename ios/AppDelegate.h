#import <React/RCTBridgeDelegate.h>
#import <Expo/Expo.h>
#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>

@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (assign, nonatomic) UIInterfaceOrientationMask orientationLock;
@property (readonly, strong) NSPersistentContainer *persistentContainer;

- (void)saveContext;


@end

