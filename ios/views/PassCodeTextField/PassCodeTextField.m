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
    [self.heightAnchor constraintEqualToConstant:NumberViewHeight],
  ]];
  
  self.backingTextField = [[UITextField alloc] init];
  [self addSubview:self.backingTextField];
  self.backingTextField.translatesAutoresizingMaskIntoConstraints = NO;
  [self.backingTextField setKeyboardType:UIKeyboardTypeNumberPad];
  [self.backingTextField setTextContentType:UITextContentTypeOneTimeCode];
  self.backingTextField.delegate = self;
  [NSLayoutConstraint activateConstraints:@[
    [self.backingTextField.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
    [self.backingTextField.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
  ]];
  [self.backingTextField addTarget:self action:@selector(onTextChange:)
                  forControlEvents:UIControlEventEditingChanged];
  
  UIView *shieldView = [[UIView alloc] init];
  shieldView.backgroundColor = [Colors get].background;
  [self addSubview:shieldView];
  shieldView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [shieldView.widthAnchor constraintEqualToAnchor:self.widthAnchor],
    [shieldView.heightAnchor constraintEqualToAnchor:self.heightAnchor],
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
  
  UITapGestureRecognizer *tap =
  [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(focusOnTextField:)];
  [self addGestureRecognizer:tap];
  
  [self fillWithNumbers:self.backingTextField.text];
}

- (void)fillWithNumbers:(NSString *)numbers {
  [self.numbersView.arrangedSubviews
   enumerateObjectsUsingBlock:^(__kindof NumberView * _Nonnull numberView,
                                NSUInteger idx, BOOL * _Nonnull stop) {
    if (idx < numbers.length) {
      NSString *substr = [numbers substringWithRange:NSMakeRange(idx, 1)];
      [numberView.numberLabel setText:substr];
      return;
    }
    if (idx == numbers.length) {
      [numberView.numberLabel setText:@"_"];
      return;
    }
    [numberView.numberLabel setText:@""];
  }];
}

- (UIView *)createNumberView {
  return [NumberView new];
}

- (BOOL)textField:(UITextField *)textField
shouldChangeCharactersInRange:(NSRange)range
replacementString:(NSString *)string {
  NSString *currentString = textField.text;
  NSString *modifiedString = [currentString stringByReplacingCharactersInRange:range withString:string];
  return modifiedString.length <= kMaxSymbols;
}

- (void)focusOnTextField:(id)sender {
  [self.backingTextField becomeFirstResponder];
}

- (void)onTextChange:(UITextField *)sender {
  [self fillWithNumbers:sender.text];
}

- (NSString *)text {
  return self.backingTextField.text;
}

- (void)setText:(NSString *)text {
  [self.backingTextField setText:text];
  [self fillWithNumbers:text];
}

- (BOOL)becomeFirstResponder {
  [super becomeFirstResponder];
  return [self.backingTextField becomeFirstResponder];
}

@end
