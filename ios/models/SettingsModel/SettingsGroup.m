//
//  SettingsGroup.m
//  greenTravel
//
//  Created by Alex K on 16.12.22.
//

#import "SettingsGroup.h"

@implementation SettingsGroup

- (instancetype)initWithName:(NSString *)name
                     entries:(NSArray<SettingsEntry *>)entries {
  if (self = [super init]) {
    _entries = entries;
    _name = name;
  }
  return self;
}

- (instancetype)copyWithZone:(NSZone *)zone {
	SettingsGroup *copy = [[SettingsGroup allocWithZone:zone] init];
	copy.title = self.title;
	copy.entries = [NSMutableArray new];
	[self.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry, NSUInteger idx, BOOL * _Nonnull stop) {
		[copy.entries addObject:[entry copy]];
	}];
	return copy;
}

@end
