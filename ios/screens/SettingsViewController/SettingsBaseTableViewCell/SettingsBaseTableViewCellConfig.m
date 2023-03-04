//
//  SettingsBaseTableViewCellConfig.m
//  greenTravel
//
//  Created by Alex K on 22.01.23.
//

#import "SettingsBaseTableViewCellConfig.h"

@implementation SettingsBaseTableViewCellConfig

- (instancetype)initWithTitle:(NSString *)title
                     subTitle:(NSString *)subTitle
                     iconName:(NSString *)iconName
                      chevron:(BOOL)chevron {
  if (self = [super init]) {
    _title = title;
    _subTitle = subTitle;
    _chevron = chevron;
    _iconName = iconName;
  }
  return self;
}

@end
