//
//  SettingsEntryNavigate.h
//  greenTravel
//
//  Created by Alex K on 24.12.22.
//

#import "SettingsEntry.h"
#import "SettingsModelConstants.h"

NS_ASSUME_NONNULL_BEGIN

@class SettingsScreen;

@interface SettingsEntryNavigate : SettingsEntry

@property (assign, nonatomic) SettingsModelScreenKey *screenKey;
@property (strong, nonatomic) SettingsScreen *screen;

- (instancetype)initWithName:(NSString *)name
                 parentGroup:(SettingsGroup *)parentGroup
                      screen:(SettingsScreen *)screen;

@end

NS_ASSUME_NONNULL_END
