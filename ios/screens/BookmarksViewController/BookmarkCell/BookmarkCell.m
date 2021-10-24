//
//  BookmarkCell.m
//  GreenTravel
//
//  Created by Alex K on 8/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "BookmarkCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "Category.h"
#import "StyleUtils.h"
#import "BookmarkItem.h"
#import "TypographyLegacy.h"

@interface BookmarkCell ()

@property (strong, nonatomic) UILabel *headerLabel;
@property (strong, nonatomic) UILabel *countLabel;

@end

@implementation BookmarkCell

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)layoutSubviews {
  self.backgroundColor = [Colors get].bookmarkCard;
  drawShadow(self);
  if (self.item == nil) {
    return;
  }
  self.headerLabel.attributedText =
  [[TypographyLegacy get] makeBookmarkText:[self.item.title uppercaseString]];
  self.countLabel.attributedText =
  [[TypographyLegacy get] makeBookmarkText:[@(self.item.howMany) stringValue]];
}

- (void)setUp {
    self.layer.cornerRadius = 4.0;
#pragma mark - Header label
    self.headerLabel = [[UILabel alloc] init];
    [self addSubview:self.headerLabel];
    
    [self.headerLabel setNumberOfLines:2];
    self.headerLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [self.headerLabel setFont:[UIFont fontWithName:@"Montserratt-SemiBold" size:12.0]];
    [self.headerLabel setTextAlignment:NSTextAlignmentCenter];
    
    [NSLayoutConstraint activateConstraints:@[
        [self.headerLabel.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
        [self.headerLabel.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
        [self.headerLabel.widthAnchor constraintLessThanOrEqualToAnchor:self.widthAnchor constant:-20.0],
    ]];
    
    self.countLabel = [[UILabel alloc] init];
    [self addSubview:self.countLabel];
    
    self.countLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [self.countLabel setFont:[UIFont fontWithName:@"Montserratt-SemiBold" size:12.0]];
    
    [NSLayoutConstraint activateConstraints:@[
        [self.countLabel.topAnchor constraintEqualToAnchor:self.topAnchor constant:10.0],
        [self.countLabel.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-10.0],
    ]];
}

- (void)update:(BookmarkItem *)item {
    self.headerLabel.attributedText =
    [[TypographyLegacy get] makeBookmarkText:[item.title uppercaseString]];
    self.countLabel.attributedText =
    [[TypographyLegacy get] makeBookmarkText:[@(item.howMany) stringValue]];
}

- (void)prepareForReuse {
    [super prepareForReuse];
    self.headerLabel.attributedText = [[NSAttributedString alloc] init];
    self.countLabel.attributedText =  [[NSAttributedString alloc] init];
    self.layer.shadowPath = nil;
}

@end
