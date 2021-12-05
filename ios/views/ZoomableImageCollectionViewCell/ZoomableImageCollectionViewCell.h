//
//  ZoomableImageCollectionViewCell.h
//  greenTravel
//
//  Created by Alex K on 5.12.21.
//

#import <UIKit/UIKit.h>
#import "ZoomableImageCollectionViewCellDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@interface ZoomableImageCollectionViewCell : UICollectionViewCell<UIGestureRecognizerDelegate>

@property (strong, nonatomic) UIImageView *imageView;
@property (weak, nonatomic) id<ZoomableImageCollectionViewCellDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
