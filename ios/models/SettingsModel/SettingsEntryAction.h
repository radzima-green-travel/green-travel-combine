//
//  SettingsEntryAction.h
//  greenTravel
//
//  Created by Alex K on 24.12.22.
//

#import "SettingsEntry.h"

NS_ASSUME_NONNULL_BEGIN

@interface SettingsEntryAction : SettingsEntry

@property (nonatomic, copy, nonnull) void (^doAction)(void); 

@end

NS_ASSUME_NONNULL_END
