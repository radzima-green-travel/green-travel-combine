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
#import <React/RCTAppSetupUtils.h>
#import "RNBootSplash.h"
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

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>
#import <react/config/ReactNativeConfig.h>
static NSString *const kRNConcurrentRoot = @"concurrentRoot";
@interface RootViewController () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
  
  @property (strong, nonatomic) UIViewController *current;
  @property (weak, nonatomic) UIApplication *application;
  @property (strong, nonatomic) NSDictionary *launchOptions;
  @property (strong, nonatomic) UserDefaultsService *userDefaultsService;
  @property (strong, nonatomic) RCTRootView *reactRootView;
}
@end

#elseif

@interface RootViewController ()

@property (strong, nonatomic) UIViewController *current;
@property (weak, nonatomic) UIApplication *application;
@property (strong, nonatomic) NSDictionary *launchOptions;
@property (strong, nonatomic) UserDefaultsService *userDefaultsService;
@property (strong, nonatomic) RCTRootView *reactRootView;

@end

#endif

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
  
  [self showAppBasedOnDefaults];
}

- (void)showAppBasedOnDefaults {
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
  
  if ([UserDefaultsServiceConstantsFrameworkReact isEqualToString:
       [self.userDefaultsService loadFrameworkValue]]) {
    [self showRNViewController];
    return;
  }
  [self showNativeViewController];
}

- (void)showRNViewController {
  // #ifdef FB_SONARKIT_ENABLED
  //   InitializeFlipper(self.application);
  // #endif
  
  RCTAppSetupPrepareApp(self.application);
  
  UIViewController *rnViewController = [[UIViewController alloc] init];
  RCTBridge *bridge =
  [[RCTBridge alloc] initWithDelegate:self launchOptions:self.launchOptions];
  
#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif
  
  self.reactRootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"greenTravel"
                                            initialProperties:nil];
  if (@available(iOS 13.0, *)) {
    self.reactRootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    self.reactRootView.backgroundColor = [UIColor whiteColor];
  }
  
  
  rnViewController.view = self.reactRootView;
  
  [self addChildViewController:rnViewController];
  rnViewController.view.frame = self.view.bounds;
  [self.view addSubview:rnViewController.view];
  [rnViewController didMoveToParentViewController:self];
  
  [self.current willMoveToParentViewController:nil];
  [self.current.view removeFromSuperview];
  [self.current removeFromParentViewController];
  
  self.current = rnViewController;
  [RotationLockUtility lockToPortrait];
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  // Switch this bool to turn on and off the concurrent root
  return true;
}
- (NSDictionary *)prepareInitialProps
{
  NSMutableDictionary *initProps = [NSMutableDictionary new];
#ifdef RCT_NEW_ARCH_ENABLED
  initProps[kRNConcurrentRoot] = @([self concurrentRootEnabled]);
#endif
  return initProps;
}

#if RCT_NEW_ARCH_ENABLED
#pragma mark - RCTCxxBridgeDelegate
- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}
#pragma mark RCTTurboModuleManagerDelegate
- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
initParams:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}
- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}
#endif

- (void)initRNBootSplash {
  if(self.reactRootView != nil) {
    [RNBootSplash initWithStoryboard:@"BootSplash" rootView: self.reactRootView];
  }
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

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
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
