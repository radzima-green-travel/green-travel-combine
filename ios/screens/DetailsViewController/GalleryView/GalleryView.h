//
//  GalleryView.h
//  GreenTravel
//
//  Created by Alex K on 11/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ZoomableImageCollectionViewCellDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@class GalleryPageControl;

@interface GalleryView : UIView<UICollectionViewDelegate,
    UICollectionViewDelegateFlowLayout, UICollectionViewDataSource, ZoomableImageCollectionViewCellDelegate>

@property (strong, nonatomic) UICollectionView *collectionView;
@property (assign, readonly, nonatomic) CGFloat indexOfScrolledItem;
@property (strong, nonatomic) GalleryPageControl *pageControl;

- (instancetype)initWithFrame:(CGRect)frame
                    imageURLs:(NSArray<NSString *>*)imageURLs
                 onPageChange:(void(^)(void))onPageChange; 
- (void)setUpWithPictureURLs:(NSArray<NSString *>*)pictureURLs;
- (void)toggleSkipAnimation;
- (UIImageView *)getCurrentImageView;

@end

NS_ASSUME_NONNULL_END
