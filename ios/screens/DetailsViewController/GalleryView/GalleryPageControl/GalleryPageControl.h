//
//  GalleryPageControl.h
//  GreenTravel
//
//  Created by Alex K on 12/12/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface GalleryPageControl : UIControl

- (instancetype)initWithNumberOfPages:(NSUInteger)numberOfPages;
- (void)moveToNextPage;
- (void)moveToPrevPage;
- (void)toggleSkipAnimation;
- (void)dispose;

@end

NS_ASSUME_NONNULL_END
