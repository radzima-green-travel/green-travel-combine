//
//  SettingsModelObservable.h
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

@protocol SettingsModelObserver;
@class SettingsEntry;
@class SettingsGroup;

@protocol SettingsModelObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<SettingsModelObserver>> *settingsModelObservers;
- (void)addSettingsModelObserver:(id<SettingsModelObserver>)observer;
- (void)removeSettingsModelObserver:(id<SettingsModelObserver>)observer;
- (void)notifySettingsModelObserversOnTreeChange:(NSMutableArray<SettingsGroup *> *)tree;
- (void)notifySettingsModelObserversOnEntryChange:(SettingsEntry *)entry;
- (void)notifySettingsModelObserversOnGroupChange:(SettingsGroup *)group;

@end
