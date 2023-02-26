//
//  SettingsUtils.h
//  greenTravel
//
//  Created by Alex K on 26.02.23.
//

#import <Foundation/Foundation.h>

@class SettingsScreen;

void traverseSettingsTree(SettingsScreen *root);

BOOL isScreenInRoot(SettingsScreen *root, SettingsScreen *screen);
