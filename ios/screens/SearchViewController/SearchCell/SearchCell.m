//
//  SearchCell.m
//  GreenTravel
//
//  Created by Alex K on 8/22/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "SearchCell.h"
#import "Colors.h"
#import "TextUtils.h"
#import "SearchCellConfiguration.h"
#import "Typography.h"
#import "IconNameToImageNameMap.h"
#import "Category.h"
#import "PlaceItem.h"

@interface SearchCell ()

@property (strong, nonatomic) UIStackView *titleStack;
@property (strong, nonatomic) UILabel *title;
@property (strong, nonatomic) UILabel *titleCategory;
@property (strong, nonatomic) UIImageView *iconView;

@end

static const NSUInteger kMaxNumberOfLinesForTitle = 5;

@implementation SearchCell

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
#pragma mark - Icon
    self.iconView = [[UIImageView alloc] init];
    self.iconView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.contentView addSubview:self.iconView];
    [NSLayoutConstraint activateConstraints:@[
        [self.iconView.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
        [self.iconView.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
        [self.iconView.widthAnchor constraintEqualToConstant:36.0],
        [self.iconView.heightAnchor constraintEqualToConstant:36.0],
    ]];
#pragma mark - Title
    self.title = [[UILabel alloc] init];
    [self.contentView addSubview:self.title];
    self.title.numberOfLines = kMaxNumberOfLinesForTitle;
    self.title.lineBreakMode = NSLineBreakByWordWrapping;
    self.title.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.title.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:8.0],
        
        [self.title.leadingAnchor constraintEqualToAnchor:self.iconView.trailingAnchor constant:8.0],
        [self.title.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-16.0],
    ]];
    [self.title setFont:[UIFont fontWithName:@"Montserrat-Bold" size:15.0]];
#pragma mark - Title category
    self.titleCategory = [[UILabel alloc] init];
    [self.contentView addSubview:self.titleCategory];
    self.titleCategory.numberOfLines = kMaxNumberOfLinesForTitle;
    self.title.lineBreakMode = NSLineBreakByWordWrapping;
    self.titleCategory.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [self.title.bottomAnchor constraintEqualToAnchor:self.titleCategory.topAnchor],
        [self.titleCategory.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:-8.0],
        [self.titleCategory.leadingAnchor constraintEqualToAnchor:self.iconView.trailingAnchor constant:8.0],
        [self.titleCategory.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-16.0],
    ]];
    [self.titleCategory setFont:[UIFont fontWithName:@"Montserrat-Bold" size:14.0]];
    
    UIView *separatorView = [[UIView alloc] init];
    [self.contentView addSubview:separatorView];
    separatorView.translatesAutoresizingMaskIntoConstraints = NO;
    separatorView.backgroundColor = [Colors get].alto;
    
    [NSLayoutConstraint activateConstraints:@[
        [separatorView.heightAnchor constraintEqualToConstant:1.0],
        [separatorView.leadingAnchor constraintEqualToAnchor:self.iconView.trailingAnchor],
        [separatorView.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor],
        [separatorView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor],
    ]];
}

- (void)update:(SearchCellConfiguration *)configuration {
    self.title.attributedText =
    [[Typography get] makeTitle2:configuration.title color:[Colors get].black];
    self.titleCategory.attributedText =
    [[Typography get] makeSubtitle2Regular:configuration.categoryTitle
                           color:[Colors get].boulder];
    [self.iconView setImage:[[IconNameToImageNameMap get]
                             iconForName:configuration.iconName]];
}

@end
