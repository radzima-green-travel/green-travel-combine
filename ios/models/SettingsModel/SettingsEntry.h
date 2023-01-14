//
//  SettingsEntry.h
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class SettingsGroup;

@interface SettingsEntry : NSObject<NSCopying>

@property (strong, nonatomic) NSUUID *uid;
@property (strong, nonatomic) NSString *name;
@property (weak, nonatomic) SettingsGroup *parentGroup;

- (instancetype)initWithName:(NSString *)name
                 parentGroup:(SettingsGroup *)parentGroup;

@end

NS_ASSUME_NONNULL_END
