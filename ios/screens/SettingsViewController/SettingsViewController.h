//
//  SettingsViewController.h
//  greenTravel
//
//  Created by Alex K on 25.12.22.
//

#import <UIKit/UIKit.h>
#import "SettingsModelObserver.h"
#import "UserModelObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class SettingsController;
@class SettingsModel;
@class SettingsScreen;

@interface SettingsViewController : UITableViewController<SettingsModelObserver, UserModelObserver>

- (instancetype)initWithSettingsController:(SettingsController *)settingsController
                             settingsModel:(SettingsModel *)settingsModel
                            settingsScreen:(SettingsScreen *)settingsScreen;

@end

NS_ASSUME_NONNULL_END
