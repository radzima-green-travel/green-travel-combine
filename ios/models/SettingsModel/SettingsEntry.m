//
//  SettingsEntry.m
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import "SettingsEntry.h"

@implementation SettingsEntry

- (instancetype)copyWithZone:(NSZone *)zone {
  SettingsEntry *copy = [[SettingsEntry alloc] init];
  copy.key = self.key;
  copy.name = self.name;
  return copy;
}

@end
