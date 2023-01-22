//
//  SettingsToggleTableViewCell.h
//  greenTravel
//
//  Created by Alex K on 14.01.23.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class SettingsEntryToggle;

@interface SettingsToggleTableViewCell : UITableViewCell

- (void)update:(NSString *)title enabled:(BOOL)enabled onToggle:(void(^_Nonnull)(BOOL))onToggle;

@end

NS_ASSUME_NONNULL_END
