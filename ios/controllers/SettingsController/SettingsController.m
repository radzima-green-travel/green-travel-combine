//
//  SettingsController.m
//  greenTravel
//
//  Created by Alex K on 20.12.22.
//

#import "SettingsController.h"
#import "SettingsModel.h"
#import "SettingsModelConstants.h"
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
        [model updateEntry:entryToggleUpdated];
        return;
    }
    if ([entry isKindOfClass:[SettingsEntryAction class]]) {
        SettingsEntryAction *entryAction = (SettingsEntryAction *)entry;
        entryAction.doAction();
        return;
    }
    if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
        SettingsEntryNavigate *entryNavigate = (SettingsEntryNavigate *)entry;
        SettingsViewController *settingsViewController =
        [[SettingsViewController alloc] initWithSettingsController:self
                                                     settingsModel:self.model
                                                 settingsScreenKey:entryNavigate.key];
        [viewController.navigationController pushViewController:settingsViewController animated:YES];
        return;
    }
    if ([entry isKindOfClass:[SettingsEntrySelect class]]) {
        SettingsEntrySelect *entrySelect = (SettingsEntrySelect *)entry;
        SettingsEntrySelect *entrySelectUpdated = [SettingsEntrySelect new];
        SettingsGroup *groupUpdated = [entrySelect.parentGroup copy];
        entrySelectUpdated.selected = entrySelect.selected;
        [groupUpdated.cells enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull cell, NSUInteger idx, BOOL * _Nonnull stop) {
            SettingsEntrySelect *cellSelect = (SettingsEntrySelect *)cell;
            if (cell.key == entrySelectUpdated.key) {
                cellSelect.selected = entrySelect.selected;
                return;
            }
            cellSelect.selected = NO;
        }];
        [model updateGroup:groupUpdated];
        return;
    }
}

@end
