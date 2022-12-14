//
//  SettingsGroup.h
//  greenTravel
//
//  Created by Alex K on 16.12.22.
//

#import <Foundation/Foundation.h>
#import "SettingsModelConstants.h"

NS_ASSUME_NONNULL_BEGIN

@class SettingsEntry;

@interface SettingsGroup : NSObject<NSCopying>

@property (assign, nonatomic) SettingsModelGroupKey key;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSArray<SettingsEntry *> *cells;

@end

NS_ASSUME_NONNULL_END
