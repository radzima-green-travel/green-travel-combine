//
//  SettingsEntry.m
//  greenTravel
//
//  Created by Alex K on 13.12.22.
//

#import "SettingsEntry.h"

@implementation SettingsEntry

- (instancetype)initWithName:(NSString *)name
                 parentGroup:(SettingsGroup *)parentGroup {
  if (self = [super self]) {
    _uid = [NSUUID UUID];
    _parentGroup = parentGroup;
    _name = name;
  }
  return self;
}

- (instancetype)copyWithZone:(NSZone *)zone {
  SettingsEntry *copy = [[SettingsEntry alloc] init];
  copy.uid = [self.uid copy];
  copy.name = self.name;
  return copy;
}

@end
