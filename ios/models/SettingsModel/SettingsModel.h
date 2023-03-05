//
//  SettingsModel.h
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import <Foundation/Foundation.h>
#import "SettingsModelObserver.h"
#import "SettingsModelObservable.h"
#import "UserModelObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class UserModel;
@class UserController;
@class SettingsEntry;
@class SettingsGroup;
@class SettingsScreen;

@interface SettingsModel : NSObject<SettingsModelObservable, UserModelObserver>

@property (strong, nonatomic) SettingsScreen *tree;
@property (strong, nonatomic) NSMutableArray<id<SettingsModelObserver>> *settingsModelObservers;
@property (strong, nonatomic) NSString *userEmail;

- (instancetype)initWithUserController:(UserController *)userController
                             userModel:(UserModel *)userModel;
- (void)notifyAboutEntryUpdate:(SettingsEntry *)updatedEntry;
- (void)notifyAboutGroupUpdate:(SettingsGroup *)updatedGroup;
- (void)notifyAboutScreenUpdate:(SettingsScreen *)updatedScreen;
- (SettingsScreen *)findScreenByID:(NSUUID *)uuid;

@end

NS_ASSUME_NONNULL_END
