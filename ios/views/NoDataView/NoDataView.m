//
//  NoDataView.m
//  greenTravel
//
//  Created by Alex K on 27.11.21.
//

#import "NoDataView.h"
#import "TypographyLegacy.h"
#import "Colors.h"
#import "CommonButton.h"

@interface NoDataView()

@property (copy, nonatomic) void(^action)(void);
@property (strong, nonatomic) UIView *contentView;
@property (strong, nonatomic) UIView *placeholder;
@property (strong, nonatomic) UIImageView *placeholderImageView;
@property (strong, nonatomic) UILabel *somethingIsWrongLabel;
@property (strong, nonatomic) CommonButton *retryButton;

@end

static CGFloat kMinHeightOfPlaceholderView = 500.0;

@implementation NoDataView

- (instancetype)initWithAction:(void(^)(void))action {
  self = [self initWithFrame:CGRectZero];
  if (self) {
    _action = action;
    [self setUp];
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
}

- (void)setUp {
  self.translatesAutoresizingMaskIntoConstraints = NO;
  self.backgroundColor = [Colors get].background;
  self.alwaysBounceVertical = YES;
  self.contentView = [[UIView alloc] init];
  [self addSubview:self.contentView];
  self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.contentView.topAnchor constraintEqualToAnchor:self.topAnchor],
      [self.contentView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
      [self.contentView.widthAnchor constraintEqualToAnchor:self.widthAnchor],
      [self.contentView.heightAnchor constraintGreaterThanOrEqualToAnchor:self.heightAnchor],
      [self.contentView.heightAnchor constraintGreaterThanOrEqualToConstant:kMinHeightOfPlaceholderView],
  ]];
  self.placeholder = [[UIView alloc] init];
  [self.contentView addSubview:self.placeholder];
  self.placeholder.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.placeholder.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
      [self.placeholder.centerYAnchor constraintEqualToAnchor:self.contentView.centerYAnchor],
      [self.placeholder.widthAnchor constraintEqualToAnchor:self.contentView.widthAnchor],
  ]];
  
  self.placeholderImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"coffee-break"]];
  [self.placeholder addSubview:self.placeholderImageView];
  self.placeholderImageView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.placeholderImageView.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
      [self.placeholderImageView.topAnchor constraintEqualToAnchor:self.placeholder.topAnchor],
  ]];
  
  self.somethingIsWrongLabel = [[UILabel alloc] init];
  [self.placeholder addSubview:self.somethingIsWrongLabel];
  [self.somethingIsWrongLabel setAttributedText:
   [[TypographyLegacy get] makeLoadingScreenText:NSLocalizedString(@"NoDataText", @"")]];
  self.somethingIsWrongLabel.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.somethingIsWrongLabel.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
      [self.somethingIsWrongLabel.topAnchor constraintEqualToAnchor:self.placeholderImageView.bottomAnchor constant:32.0],
  ]];
  
  self.retryButton = [[CommonButton alloc] initWithTarget:self
                                                   action:@selector(onRetry:)
                                                    label:NSLocalizedString(@"NoDataActionLabel", @"")];
  [self.placeholder addSubview:self.retryButton];
  self.retryButton.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
      [self.retryButton.centerXAnchor constraintEqualToAnchor:self.placeholder.centerXAnchor],
      [self.retryButton.topAnchor constraintEqualToAnchor:self.somethingIsWrongLabel.bottomAnchor constant:27.28],
      [self.retryButton.bottomAnchor constraintEqualToAnchor:self.placeholder.bottomAnchor],
  ]];
}

- (void)onRetry:(id)sender {
  self.action();
}

@end
