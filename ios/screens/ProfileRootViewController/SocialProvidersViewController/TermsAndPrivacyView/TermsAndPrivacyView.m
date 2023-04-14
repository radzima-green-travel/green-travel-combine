//
//  TermsAndPrivacyView.m
//  greenTravel
//
//  Created by Alex K on 14.04.23.
//

#import "TermsAndPrivacyView.h"

@interface TermsAndPrivacyView () <UITextViewDelegate>
@property (nonatomic, strong) UITextView *textView;
@end

@implementation TermsAndPrivacyView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self setup];
    }
    return self;
}

- (void)setup {
    NSString *text = @"Создавая или входя в аккаунт, вы соглашаетесь с нашими %@ и %@";
    NSString *termsAndConditions = @"Условиями использования";
    NSString *privacyPolicy = @"Политикой конфиденциальности";
    
    NSMutableAttributedString *attributedText = [[NSMutableAttributedString alloc] initWithString:text];
    NSRange range1 = [text rangeOfString:termsAndConditions];
    NSRange range2 = [text rangeOfString:privacyPolicy];
    [attributedText addAttribute:NSLinkAttributeName value:@"terms" range:range1];
    [attributedText addAttribute:NSLinkAttributeName value:@"privacy" range:range2];
    [attributedText addAttribute:NSUnderlineStyleAttributeName value:@(NSUnderlineStyleSingle) range:range1];
    [attributedText addAttribute:NSUnderlineStyleAttributeName value:@(NSUnderlineStyleSingle) range:range2];
    
    UITextView *textView = [[UITextView alloc] initWithFrame:CGRectZero];
    textView.translatesAutoresizingMaskIntoConstraints = NO;
    textView.attributedText = attributedText;
    textView.delegate = self;
    textView.editable = NO;
    textView.scrollEnabled = NO;
    textView.textAlignment = NSTextAlignmentCenter;
    textView.backgroundColor = [UIColor clearColor];
    [self addSubview:textView];
    
    [NSLayoutConstraint activateConstraints:@[
        [textView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
        [textView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
        [textView.topAnchor constraintEqualToAnchor:self.topAnchor],
        [textView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
    ]];
}

- (BOOL)textView:(UITextView *)textView shouldInteractWithURL:(NSURL *)URL inRange:(NSRange)characterRange {
    if ([[URL absoluteString] isEqualToString:@"terms"]) {
        // Handle terms link tapped
        return NO;
    } else if ([[URL absoluteString] isEqualToString:@"privacy"]) {
        // Handle privacy link tapped
        return NO;
    }
    return YES;
}

@end
