//
//  SettingsUtils.h
//  greenTravel
//
//  Created by Alex K on 26.02.23.
//

#import <Foundation/Foundation.h>

@class SettingsScreen;
@class SettingsGroup;
@class SettingsEntry;

void traverseSettingsTree(SettingsScreen *root,
                          void (^onVisit)(SettingsScreen *, SettingsGroup *,
                                          SettingsEntry *, BOOL *));

BOOL isScreenInRoot(SettingsScreen *root, SettingsScreen *screen);

BOOL treeContainsScreen(SettingsScreen *tree, SettingsScreen *screen);
