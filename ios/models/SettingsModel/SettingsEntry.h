//
//  SettingsEntry.h
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import <Foundation/Foundation.h>
#import "SettingsModelConstants.h"

NS_ASSUME_NONNULL_BEGIN

@class SettingsGroup;

@interface SettingsEntry : NSObject<NSCopying>

@property (assign, nonatomic) SettingsModelEntryKey key;
@property (strong, nonatomic) NSString *name;
@property (weak, nonatomic) SettingsGroup *parentGroup;

@end

NS_ASSUME_NONNULL_END
