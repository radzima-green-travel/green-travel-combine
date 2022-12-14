//
//  SettingsViewController.h
//  greenTravel
//
//  Created by Alex K on 25.12.22.
//

#import <UIKit/UIKit.h>
#import "SettingsModelConstants.h"

NS_ASSUME_NONNULL_BEGIN

@class SettingsController;
@class SettingsModel;

@interface SettingsViewController : UITableViewController

- (instancetype)initWithSettingsController:(SettingsController *)settingsController
                             settingsModel:(SettingsModel *)settingsModel
                         settingsScreenKey:(SettingsModelScreenKey)settingsScreenKey;

@end

NS_ASSUME_NONNULL_END
