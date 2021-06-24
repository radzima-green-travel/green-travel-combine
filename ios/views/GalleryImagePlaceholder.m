//
//  GalleryImagePlaceholder.m
//  GreenTravel
//
//  Created by Alex K on 2/7/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "GalleryImagePlaceholder.h"
#import "ColorsLegacy.h"
#import "Colors.h"

@implementation GalleryImagePlaceholder

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setUp];
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].galleryNoImagePlaceholder;
}

- (void)setUp {
    self.backgroundColor = [ColorsLegacy get].alabaster;
    UIImageView *placeHolderViewImage = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"camera"]];
    placeHolderViewImage.translatesAutoresizingMaskIntoConstraints = NO;
    [self addSubview:placeHolderViewImage];
    [NSLayoutConstraint activateConstraints:@[
        [placeHolderViewImage.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
        [placeHolderViewImage.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
    ]];
}

@end
