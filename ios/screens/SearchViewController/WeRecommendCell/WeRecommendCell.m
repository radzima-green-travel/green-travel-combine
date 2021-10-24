//
//  WeRecommendCell.m
//  GreenTravel
//
//  Created by Alex K on 8/22/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "WeRecommendCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "TypographyLegacy.h"

@interface WeRecommendCell()

@property (strong, nonatomic) UILabel *header;

@end

@implementation WeRecommendCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  self.header.attributedText = [[TypographyLegacy get] makeBody:NSLocalizedString(@"SearchHistory", @"")
                                                    color:[Colors get].mainText];
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
  self.header = [[UILabel alloc] init];
  [self.contentView addSubview:self.header];
  self.header.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.header.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:32.0],
    [self.header.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:-16.0],
    [self.header.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
    [self.header.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
  ]];
  
  [self.header setFont:[UIFont fontWithName:@"Montserrat-Bold" size:16.0]];
  self.header.attributedText = [[TypographyLegacy get] makeBody:@"История поиска" color:[Colors get].mainText];
}

@end
