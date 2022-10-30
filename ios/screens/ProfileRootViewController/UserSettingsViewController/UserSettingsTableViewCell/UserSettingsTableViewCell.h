//
//  UserSettingsTableViewCell.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 11.09.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UserSettingsTableViewCell : UITableViewCell

- (void)prepareSettingsCellWithMainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText withChevron:(BOOL) withChevron;

@end

NS_ASSUME_NONNULL_END
