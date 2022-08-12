//
//  SettingsTableViewCell.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 12.08.22.
//

#import "SettingsTableViewCellModel.h"

@implementation SettingsTableViewCellModel

- (instancetype)initWithTitle:(NSString *)title subTitle:(NSString *)subtitle image:(UIImage *)image handler:(void (^)(void))handler {
  self = [super init];
  if (self) {
    _title = title;
    _subTitle = subtitle;
    _image = image;
    _handler = handler;
  }
  return self;
}

@end
