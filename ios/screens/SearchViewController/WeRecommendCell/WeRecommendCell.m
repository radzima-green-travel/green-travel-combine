//
//  WeRecommendCell.m
//  GreenTravel
//
//  Created by Alex K on 8/22/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "WeRecommendCell.h"
#import "ColorsLegacy.h"
#import "TextUtils.h"
#import "Typography.h"

@implementation WeRecommendCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)setUp {
    UILabel *header = [[UILabel alloc] init];
    [self.contentView addSubview:header];
    header.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [header.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:32.0],
        [header.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:-16.0],
        [header.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
        [header.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
    ]];
    
    [header setFont:[UIFont fontWithName:@"Montserrat-Bold" size:16.0]];
    header.attributedText = [[Typography get] makeBody:@"История поиска"];
}

@end
