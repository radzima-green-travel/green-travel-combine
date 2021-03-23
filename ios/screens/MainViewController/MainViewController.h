//
//  MainContentViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class UserDefaultsService;

@interface MainViewController : UITabBarController

- (void)loadCategories;
- (instancetype)initWithUserDefaultsService:(UserDefaultsService *)userDefaultsService;

@end

NS_ASSUME_NONNULL_END
