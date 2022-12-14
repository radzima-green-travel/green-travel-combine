//
//  SettingsGroup.m
//  greenTravel
//
//  Created by Alex K on 16.12.22.
//

#import "SettingsGroup.h"

@implementation SettingsGroup

- (instancetype)copyWithZone:(NSZone *)zone {
	SettingsGroup *copy = [[SettingsGroup alloc] init];
	copy.title = self.title;
	copy.cells = [NSMutableArray new];
	self.cells enumerateObjectsUsingBlock:^(SettingsCell * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
		[copy.cells addObject:[obj copy]];
	}];
	return copy;
}

@end
