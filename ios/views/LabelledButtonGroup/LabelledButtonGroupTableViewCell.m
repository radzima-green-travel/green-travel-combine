//
//  LabelledButtonGroupTableViewCell.m
//  greenTravel
//
//  Created by Alex K on 9.02.22.
//
#import "LabelledButtonGroupTableViewCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "URLUtils.h"
#import "PlaceCategory.h"
#import "TypographyLegacy.h"
#import "IconNameToImageNameMap.h"
#import "InformationReference.h"

@interface LabelledButtonGroupTableViewCell()

@end

@implementation LabelledButtonGroupTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
}

- (void)setUp {
}

- (void)update:(NSObject *)dataItem {
  NSLog(@"Implement update method in subclass.");
}

@end
