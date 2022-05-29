//
//  PassCodeTextField.m
//  greenTravel
//
//  Created by Alex K on 29.05.22.
//

#import "PassCodeTextField.h"
#import "NumberView.h"
#import "Colors.h"
#import "NumberViewConstants.h"

@interface PassCodeTextField()

@property (strong, nonatomic) UIStackView *numbersView;
@property (strong, nonatomic) UITextField *backingTextField;

@end

static const NSUInteger kMaxSymbols = 6;
static const CGFloat kSpacing = 8.0;

@implementation PassCodeTextField

- (instancetype)init
{
  self = [self initWithFrame:CGRectZero];
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
  self.translatesAutoresizingMaskIntoConstraints = NO;
  self.backgroundColor = [Colors get].background;
  [NSLayoutConstraint activateConstraints:@[
    [self.widthAnchor constraintEqualToConstant:
     (kMaxSymbols * NumberViewWidth + (kMaxSymbols - 1) * kSpacing)],
    [self.heightAnchor constraintEqualToConstant:NumberViewWidth],
  ]];
  
  self.numbersView = [[UIStackView alloc] init];
  [self.numbersView setSpacing:kSpacing];
  [self.numbersView setAlignment:UIStackViewAlignmentCenter];
  [self.numbersView setDistribution:UIStackViewDistributionEqualSpacing];
  [self.numbersView setAxis:UILayoutConstraintAxisHorizontal];
  [self addSubview:self.numbersView];
  self.numbersView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.numbersView.widthAnchor constraintEqualToAnchor:self.widthAnchor],
    [self.numbersView.heightAnchor constraintEqualToAnchor:self.heightAnchor],
  ]];
  
  for (NSUInteger i = 0; i < kMaxSymbols; i++) {
    [self.numbersView addArrangedSubview:[self createNumberView]];
  }
  
  self.backingTextField = [[UITextField alloc] init];
  [self addSubview:self.backingTextField];
  self.backingTextField.translatesAutoresizingMaskIntoConstraints = NO;
  [self.backingTextField setKeyboardType:UIKeyboardTypeNumberPad];
  self.backingTextField.delegate = self;
  [NSLayoutConstraint activateConstraints:@[
    [self.backingTextField.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
    [self.backingTextField.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
  ]];
  
  
}

- (void)fillWithNumbers:(NSString *)numbers {
  [self.numbersView.arrangedSubviews
   enumerateObjectsUsingBlock:^(__kindof NumberView * _Nonnull numberView,
                                NSUInteger idx, BOOL * _Nonnull stop) {
    [numberView.numberLabel setText: numbers ];
  }];
}

- (UIView *)createNumberView {
  return [NumberView new];
}

- (BOOL)textField:(UITextField *)textField
shouldChangeCharactersInRange:(NSRange)range
replacementString:(NSString *)string {
  if ([textField.text length] > kMaxSymbols) {
    textField.text = [textField.text substringToIndex:kMaxSymbols - 1];
    return NO;
  }
  return YES;
}

@end
