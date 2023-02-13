//
//  SettingsEntryNavigate.m
//  greenTravel
//
//  Created by Alex K on 24.12.22.
//

#import "SettingsEntryNavigate.h"

@implementation SettingsEntryNavigate

- (instancetype)initWithName:(NSString *)name
                 parentGroup:(SettingsGroup *)parentGroup
                      screen:(SettingsScreen *)screen {
  if (self = [super initWithName:name parentGroup:parentGroup]) {
    _screen = screen;
  }
  self.chevron = YES;
  return self;
}

@end
