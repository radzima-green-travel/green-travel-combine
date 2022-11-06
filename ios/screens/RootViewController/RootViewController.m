//
//  RootViewController.m
//  RsSchoolTask2.6
//
//  Created by Alex K on 6/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "RootViewController.h"
#import "MainViewController.h"
#import "ColorsLegacy.h"
#import "TextUtils.h"
#import "UserDefaultsService.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RotationLockUtility.h"
#import "UserDefaultsServiceConstants.h"
@import Amplitude;
#import <react-native-ultimate-config/ConfigValues.h>
#import "AnalyticsEvents.h"

// #ifdef FB_SONARKIT_ENABLED
// #import <FlipperKit/FlipperClient.h>
// #import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
// #import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
// #import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
// #import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h> 
// #import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

// static void InitializeFlipper(UIApplication *application) {
//   FlipperClient *client = [FlipperClient sharedClient];
//   SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//   [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//   [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//   [client addPlugin:[FlipperKitReactPlugin new]];
//   [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//   [client start];
// }
// #endif


@interface RootViewController ()

@property (strong, nonatomic) UIViewController *current;
@property (weak, nonatomic) UIApplication *application;
@property (strong, nonatomic) NSDictionary *launchOptions;
@property (strong, nonatomic) UserDefaultsService *userDefaultsService;
@property (strong, nonatomic) RCTRootView *reactRootView;

@end

@implementation RootViewController

- (instancetype)initWithApplication:(UIApplication *)application
                      launchOptions:(NSDictionary *)launchOptions
{
    self = [super init];
    if (self) {
        _application = application;
        _launchOptions = launchOptions;
        _userDefaultsService = [UserDefaultsService get];
    }
    return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.view.backgroundColor = UIColor.whiteColor;
  
  [self initAppBasedOnDefaults];
}

- (void)initAppBasedOnDefaults {
  NSString *framework = [self.userDefaultsService loadFrameworkValue];
  if (framework == nil || [UserDefaultsServiceConstantsFrameworkRandom isEqualToString:
                          framework]) {
    u_int32_t randomNumber = arc4random_uniform(UINT32_MAX);
    u_int32_t pivot = UINT32_MAX / 2;
    if (randomNumber > pivot) {
      [self.userDefaultsService saveFrameworkValue:UserDefaultsServiceConstantsFrameworkUIKit];
    } else {
      [self.userDefaultsService saveFrameworkValue:UserDefaultsServiceConstantsFrameworkReact];
    }
  }
  
  [self saveVersion];
}

- (bool)getIsNativeControllerShouldBeLaunched {
  if ([UserDefaultsServiceConstantsFrameworkReact isEqualToString:
       [self.userDefaultsService loadFrameworkValue]]) {
    return false;
  }
  
  return true;
}

- (void)showNativeViewController {
  [Amplitude instance].trackingSessionEvents = YES;
  [[Amplitude instance] initializeApiKey:AMPLITUDE_KEY];
  [[Amplitude instance] setUserProperties:@{
    AnalyticsEventsUserPropertyFramework: UserDefaultsServiceConstantsFrameworkUIKit
  }];
  
  MainViewController *mainViewController = [[MainViewController alloc] init];
  [self addChildViewController:mainViewController];
  mainViewController.view.frame = self.view.bounds;
  [self.view addSubview:mainViewController.view];
  [mainViewController didMoveToParentViewController:self];
  
  [self.current willMoveToParentViewController:nil];
  [self.current.view removeFromSuperview];
  [self.current removeFromParentViewController];
  
  self.current = mainViewController;
}

- (void)saveVersion {
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    [weakSelf.userDefaultsService saveBuildNumber:[NSBundle mainBundle].infoDictionary[@"CFBundleVersion"]];
    [weakSelf.userDefaultsService saveVersion:[NSBundle mainBundle].infoDictionary[@"CFBundleShortVersionString"]];
  });
}

- (void)loadCategories {
  if ([self.current isKindOfClass:MainViewController.class]) {
    [(MainViewController *) self.current loadCategories];
  }
}

@end
