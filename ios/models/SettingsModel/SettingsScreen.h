//
//  SettingsScreen.h
//  greenTravel
//
//  Created by Alex K on 24.12.22.
//

#import <Foundation/Foundation.h>


NS_ASSUME_NONNULL_BEGIN

@class SettingsGroup;

@interface SettingsScreen : NSObject

@property (strong, nonatomic) NSUUID *uid;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSMutableArray<SettingsGroup *> *groups;

- (instancetype)initWithName:(NSString *)name
                     groups:(NSArray<SettingsGroup *>*)groups;

@end

NS_ASSUME_NONNULL_END
