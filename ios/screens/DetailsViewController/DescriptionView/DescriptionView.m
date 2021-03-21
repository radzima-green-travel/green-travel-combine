//
//  DescriptionView.m
//  GreenTravel
//
//  Created by Alex K on 2/7/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "DescriptionView.h"
#import "LinkedCategoriesView.h"
#import "Typography.h"
#import "Colors.h"

@interface DescriptionView()

@property (strong, nonatomic) UITextView *descriptionTextView;
@property (strong, nonatomic) LinkedCategoriesView *linkedCategoriesView;
@property (strong, nonatomic) UIStackView *descriptionPlaceholderView;

@end

@implementation DescriptionView

- (void)update:(NSAttributedString *)text showPlaceholder:(BOOL)showPlaceholder{
#pragma mark - Description text
    if (!showPlaceholder && !self.descriptionTextView) {
        [self.descriptionPlaceholderView removeFromSuperview];
        self.descriptionPlaceholderView = nil;
        
        self.descriptionTextView = [[UITextView alloc] init];

        self.descriptionTextView.translatesAutoresizingMaskIntoConstraints = NO;
        self.descriptionTextView.editable = NO;
        self.descriptionTextView.scrollEnabled = NO;
        [self addSubview:self.descriptionTextView];
        [self.descriptionTextView setAttributedText:text];
        [NSLayoutConstraint activateConstraints:@[
            [self.descriptionTextView.topAnchor constraintEqualToAnchor:self.topAnchor],
            [self.descriptionTextView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:16.0],
            [self.descriptionTextView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-16.0],
            [self.descriptionTextView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
        ]];
        return;
    }
    if (showPlaceholder && !self.descriptionPlaceholderView) {
        [self.descriptionTextView removeFromSuperview];
        self.descriptionTextView = nil;
        
        self.descriptionPlaceholderView = [[UIStackView alloc] init];
        self.descriptionPlaceholderView.distribution = UIStackViewDistributionFill;
        self.descriptionPlaceholderView.alignment = UIStackViewAlignmentCenter;
        self.descriptionPlaceholderView.axis = UILayoutConstraintAxisVertical;
        self.descriptionPlaceholderView.spacing = 0.0;
        self.descriptionPlaceholderView.translatesAutoresizingMaskIntoConstraints = NO;
        [self addSubview:self.descriptionPlaceholderView];
        UIImage *placeholderImage = [UIImage imageNamed:arc4random_uniform(2) > 0 ?
                                     @"fox-in-the-jungle" : @"trekking"];

        UILabel *placeholderLabel = [[UILabel alloc] init];
        [placeholderLabel setAttributedText:[[Typography get] makeLoadingScreenText:@"Описание будет дополняться"]];
        [self.descriptionPlaceholderView addArrangedSubview:placeholderLabel];
        [self.descriptionPlaceholderView addArrangedSubview:[[UIImageView alloc] initWithImage:placeholderImage]];
        [NSLayoutConstraint activateConstraints:@[
            [self.descriptionPlaceholderView.topAnchor constraintEqualToAnchor:self.topAnchor constant:20.0],
            [self.descriptionPlaceholderView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
            [self.descriptionPlaceholderView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
            [self.descriptionPlaceholderView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
        ]];
    }
}

@end
