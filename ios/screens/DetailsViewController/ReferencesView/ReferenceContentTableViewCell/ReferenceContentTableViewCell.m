//
//  ReferenceContentTableViewCell.m
//  greenTravel
//
//  Created by Alex K on 11.02.22.
//

#import "ReferenceContentTableViewCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TextUtils.h"
#import "URLUtils.h"
#import "PlaceCategory.h"
#import "TypographyLegacy.h"
#import "IconNameToImageNameMap.h"
#import "InformationReference.h"

@interface ReferenceContentTableViewCell()

@property (strong, nonatomic) UIImageView *icon;
@property (strong, nonatomic) UILabel *title;
@property (strong, nonatomic) UIImageView *chevron;

@end

@implementation ReferenceContentTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)setUp {
}

- (void)update:(NSObject *)dataItem {
  InformationReference *reference = (InformationReference *) dataItem;
  [self.icon removeFromSuperview];
  [self.title removeFromSuperview];
  [self.chevron removeFromSuperview];

  BOOL safeURL = urlIsSafe(reference.url);
#pragma mark - Image
  if (!safeURL) {
    UIImage *lockSlash;
    if (@available(iOS 13.0, *)) {
      lockSlash = [UIImage systemImageNamed:@"lock.slash"];
    } else {
      lockSlash = [UIImage imageNamed:@"lock.slash"];
    }
    self.icon = [[UIImageView alloc] init];
    [self.contentView addSubview:self.icon];
    
    self.icon.translatesAutoresizingMaskIntoConstraints = NO;
    
    [self.icon setImage:lockSlash];
    
    [NSLayoutConstraint activateConstraints:@[
      [self.icon.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
      [self.icon.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0],
      [self.icon.widthAnchor constraintEqualToConstant:20.0],
      [self.icon.heightAnchor constraintEqualToConstant:20.0],
    ]];
  }
#pragma mark - Chevron
  if (safeURL) {
    self.chevron = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"chevron-right"]];
    self.chevron.tintColor = [ColorsLegacy get].black;
    [self.contentView addSubview:self.chevron];
    
    self.chevron.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
      [self.chevron.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
      [self.chevron.widthAnchor constraintEqualToConstant:7.0],
      [self.chevron.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:-25.0],
    ]];
  }
  
#pragma mark - Header label
  self.title = [[UILabel alloc] init];
  [self.contentView addSubview:self.title];
  
  self.title.translatesAutoresizingMaskIntoConstraints = NO;
  [self.title setFont:[UIFont fontWithName:@"Montserrat-Regular" size:15.0]];
  
  NSLayoutConstraint *leading = self.icon == nil ?
  [self.title.leadingAnchor constraintEqualToAnchor:self.contentView.leadingAnchor constant:16.0] :
  [self.title.leadingAnchor constraintEqualToAnchor:self.icon.trailingAnchor constant:10.0];
  
  NSLayoutConstraint *trailing = self.chevron == nil ?
  [self.title.trailingAnchor constraintEqualToAnchor:self.contentView.trailingAnchor constant:16.0] :
  [self.title.leadingAnchor constraintLessThanOrEqualToAnchor:self.chevron.leadingAnchor constant:10.0];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.title.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
    leading,
    trailing,
  ]];
  [self.title setLineBreakMode:NSLineBreakByTruncatingTail];
  [self.title setAttributedText:[[TypographyLegacy get] makeBody:reference.title]];
}

- (void)prepareForReuse {
  [super prepareForReuse];
  [self.icon removeFromSuperview];
  [self.title removeFromSuperview];
  [self.chevron removeFromSuperview];
}

@end
