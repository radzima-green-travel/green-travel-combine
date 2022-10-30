//
//  ProfileSection.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 12.08.22.
//

#import "ProfileSection.h"

@implementation ProfileSection

- (instancetype)initWithTitle:(NSString *)title cellModels:(NSMutableArray<SettingsTableViewCellModel *>*)cellModels {
  self = [super init];
  if (self) {
    _title = title;
    _cellModels = cellModels;
  }
  return self;
}

@end
