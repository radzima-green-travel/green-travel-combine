//
//  SettingsGroup.m
//  greenTravel
//
//  Created by Alex K on 16.12.22.
//

#import "SettingsGroup.h"
#import "SettingsEntry.h"

@implementation SettingsGroup

- (instancetype)initWithName:(NSString *)name
                     entries:(NSArray<SettingsEntry *>*)entries {
  if (self = [super init]) {
    _entries = [[NSMutableArray alloc] initWithArray:entries];
    _name = name;
  }
  return self;
}

- (instancetype)copyWithZone:(NSZone *)zone {
	SettingsGroup *copy = [[SettingsGroup allocWithZone:zone] init];
	copy.name = self.name;
  NSMutableArray *entries = [NSMutableArray new];
	[self.entries enumerateObjectsUsingBlock:^(SettingsEntry * _Nonnull entry, NSUInteger idx, BOOL * _Nonnull stop) {
		[entries addObject:[entry copy]];
	}];
  copy.entries = entries;
	return copy;
}

@end
