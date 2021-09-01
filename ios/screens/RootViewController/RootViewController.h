//
//  RootViewController.h
//  RsSchoolTask2.6
//
//  Created by Alex K on 6/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeDelegate.h>

NS_ASSUME_NONNULL_BEGIN

@interface RootViewController : UIViewController<RCTBridgeDelegate>

- (instancetype)initWithApplication:(UIApplication *)application
                      launchOptions:(NSDictionary *)launchOptions;
- (void)showRNViewController;
- (void)showNativeViewController;
- (void)loadCategories;
- (void)initRNBootSplash;
@end

NS_ASSUME_NONNULL_END
