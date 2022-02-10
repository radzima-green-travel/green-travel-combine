//
//  ReferenceContentView.m
//  greenTravel
//
//  Created by Alex K on 10.02.22.
//

#import "ReferenceContentView.h"
#import "ColorsLegacy.h"
#import "Colors.h"

@interface  ReferenceContentView()

@property (strong, nonatomic) UIImageView *icon;
@property (strong, nonatomic) UILabel *title;
@property (strong, nonatomic) UIImageView *chevron;

@end

@implementation ReferenceContentView

- (instancetype)initWithIconVisible:(BOOL)iconVisible
                               text:(NSString *)text {
  self = [super initWithFrame:CGRectZero];
  if (self) {
    [self setUp:iconVisible text:text];
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  [self.title setTextColor:[Colors get].headlineText];
  [self.chevron setImage:[UIImage imageNamed:@"chevron-right"]];
}

- (void)setUp:(BOOL)iconVisible
         text:(NSString *)text {
#pragma mark - Image
  if (iconVisible) {
    UIImage *lockSlash;
    if (@available(iOS 13.0, *)) {
      lockSlash = [UIImage systemImageNamed:@"lock.slash"];
    } else {
      lockSlash = [UIImage imageNamed:@"lock.slash"];
    }
    self.icon = [[UIImageView alloc] init];
    [self addSubview:self.icon];
    
    self.icon.translatesAutoresizingMaskIntoConstraints = NO;
    self.icon.backgroundColor = [ColorsLegacy get].blue;
    
    [self.icon setImage:lockSlash];
    
    [NSLayoutConstraint activateConstraints:@[
      [self.icon.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
      [self.icon.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:16.0],
      [self.icon.widthAnchor constraintEqualToConstant:20.0],
      [self.icon.heightAnchor constraintEqualToConstant:20.0],
    ]];
  }
  
#pragma mark - Header label
  self.title = [[UILabel alloc] init];
  [self addSubview:self.title];
  
  self.title.translatesAutoresizingMaskIntoConstraints = NO;
  [self.title setFont:[UIFont fontWithName:@"Montserrat-Regular" size:15.0]];
  
  NSLayoutConstraint *leading = self.icon == nil ?
  [self.title.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:16.0] :
  [self.title.leadingAnchor constraintEqualToAnchor:self.icon.trailingAnchor constant:10.0];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.title.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
    leading,
  ]];
  [self.title setLineBreakMode:NSLineBreakByTruncatingTail];
  [self.title setText:text];
  
#pragma mark - Chevron
  self.chevron = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"chevron-right"]];
  self.chevron.tintColor = [ColorsLegacy get].black;
  [self addSubview:self.chevron];
  
  self.chevron.translatesAutoresizingMaskIntoConstraints = NO;
  
  [NSLayoutConstraint activateConstraints:@[
    [self.chevron.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
    [self.chevron.leadingAnchor constraintEqualToAnchor:self.title.trailingAnchor constant:10.0],
    [self.chevron.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-25.0],
  ]];
}

@end
