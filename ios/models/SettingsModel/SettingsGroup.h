//
//  SettingsGroup.h
//  greenTravel
//
//  Created by Alex K on 16.12.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class SettingsEntry;
@class SettingsScreen;

@interface SettingsGroup : NSObject<NSCopying>

@property (assign, nonatomic) NSUUID *uid;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSMutableArray<SettingsEntry *> *entries;
@property (weak, nonatomic) SettingsScreen *parentScreen;

- (instancetype)initWithName:(NSString *)name
                     entries:(NSArray<SettingsEntry *>*)entries;

@end

NS_ASSUME_NONNULL_END
