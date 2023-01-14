//
//  SettingsController.m
//  greenTravel
//
//  Created by Alex K on 20.12.22.
//

#import "SettingsController.h"
#import "SettingsModel.h"
#import "SettingsEntry.h"
#import "SettingsGroup.h"
#import "SettingsEntryToggle.h"
#import "SettingsEntrySelect.h"
#import "SettingsEntryAction.h"
#import "SettingsEntryNavigate.h"
#import "SettingsViewController.h"
#import <UIKit/UIKit.h>

@interface SettingsController()

@property (strong, nonatomic) SettingsModel *model;

@end

@implementation SettingsController

- (instancetype)initWithModel:(SettingsModel *)settingsModel {
    if (self = [super init]) {
        _model = settingsModel;
    }
    return self;
}

- (void)interactWithSetting:(SettingsEntry *)entry
           onViewController:(UIViewController *)viewController {
    if ([entry isKindOfClass:[SettingsEntryToggle class]]) {
        SettingsEntryToggle *entryToggleUpdated = [SettingsEntryToggle new];
        SettingsEntryToggle *entryToggle = (SettingsEntryToggle *)entry;
        entryToggleUpdated.enabled = !entryToggle.enabled;
        [self.model updateEntry:entryToggleUpdated];
        return;
    }
    if ([entry isKindOfClass:[SettingsEntryAction class]]) {
        SettingsEntryAction *entryAction = (SettingsEntryAction *)entry;
        entryAction.doAction(viewController);
        return;
    }
    if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
        SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
        SettingsViewController *settingsViewController =
        [[SettingsViewController alloc] initWithSettingsController:self
                                                     settingsModel:self.model
                                                 settingsScreen:entryNavigate.screen];
        [viewController.navigationController pushViewController:settingsViewController animated:YES];
        return;
    }
    if ([entry isKindOfClass:[SettingsEntrySelect class]]) {
        SettingsEntrySelect *entrySelect = (SettingsEntrySelect *)entry;
        BOOL selected = entrySelect.selected;
        SettingsGroup *groupUpdated = [entrySelect.parentGroup copy];
      
        [groupUpdated.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry,
                                                           NSUInteger idx, BOOL * _Nonnull stop) {
            SettingsEntrySelect *entrySelectUpdated = (SettingsEntrySelect *)entry;
            if ([entrySelectUpdated.uid isEqual:entrySelect.uid]) {
                entrySelectUpdated.selected = selected;
                return;
            }
            entrySelectUpdated.selected = NO;
        }];
        [self.model updateGroup:groupUpdated];
        return;
    }
}

@end
