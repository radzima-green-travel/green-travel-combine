//
//  SettingsGroup.h
//  greenTravel
//
//  Created by Alex K on 16.12.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class SettingsEntry;

@interface SettingsGroup : NSObject<NSCopying>

@property (assign, nonatomic) NSUUID *uid;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSMutableArray<SettingsEntry *> *entries;

- (instancetype)initWithName:(NSString *)name
                     entries:(NSArray<SettingsEntry *>*)entries;

@end

NS_ASSUME_NONNULL_END
