//
//  SettingsScreen.m
//  greenTravel
//
//  Created by Alex K on 24.12.22.
//

#import "SettingsScreen.h"
#import "SettingsGroup.h"

@implementation SettingsScreen

- (instancetype)iniWithName:(NSString *)name
                     groups:(NSArray<SettingsGroup *> *)groups {
	self = [super init];
	if (self) {
		_name = name;
		_uid = [NSUUID UUID];
		_groups = [NSMutableArray<SettingsGroup *> new];
	}
	return self;
}

- (instancetype)copyWithZone:(NSZone *)zone {
	SettingsScreen *copy = [[SettingsScreen allocWithZone:zone] init];
	copy.name = self.name;
	copy.uid = [self.uid copy];
  copy.groups = [self.groups copy];
  [self.groups enumerateObjectsUsingBlock:^(SettingsGroup * _Nonnull origGroup,
                                            NSUInteger idx, BOOL * _Nonnull stop) {
		[copy.groups addObject:[origGroup copy]];
	}];
	return copy;
}

@end
