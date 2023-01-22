//
//  SettingsBaseTableViewCell.h
//  greenTravel
//
//  Created by Alex K on 21.01.23.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class SettingsBaseTableViewCellConfig;

@interface SettingsBaseTableViewCell : UITableViewCell

- (void)update:(SettingsBaseTableViewCellConfig *)config;

@end

NS_ASSUME_NONNULL_END
