//
//  SettingsModel.h
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import <Foundation/Foundation.h>
#import "SettingsModelConstants.h"
#import "SettingsModelObserver.h"
#import "SettingsModelObservable.h"
#import "UserModelObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class UserModel;
@class SettingsEntry;
@class SettingsGroup;

@interface SettingsModel : NSObject<SettingsModelObservable, UserModelObserver>

@property (strong, nonatomic) NSMutableArray<SettingsGroup *> *tree;
@property (strong, nonatomic) NSMutableArray<id<SettingsModelObserver>> *settingsModelObservers;

- (instancetype)initWithUserModel:(UserModel *)userModel;
- (void)updateEntry:(SettingsEntry *)updatedEntry;
- (void)updateGroup:(SettingsGroup *)updatedGroup;

@end

NS_ASSUME_NONNULL_END
