//
//  SettingsGroupSelect.h
//  greenTravel
//
//  Created by Alex K on 24.12.22.
//

#import "SettingsGroup.h"
#import "SettingsModelConstants.h"

NS_ASSUME_NONNULL_BEGIN

@interface SettingsGroupSelect : SettingsGroup

@property (assign, nonatomic) SettingsModelEntryKey *selectedKey;

@end

NS_ASSUME_NONNULL_END
