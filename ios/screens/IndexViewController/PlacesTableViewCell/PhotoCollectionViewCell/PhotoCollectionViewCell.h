//
//  PhotoCollectionViewCell.h
//  GreenTravel
//
//  Created by Alex K on 8/16/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;
@class PlaceCategory;

typedef NS_ENUM(NSInteger, PhotoCollectionViewCellImageType) {
  PhotoCollectionViewCellImageTypeLight = 0,
  PhotoCollectionViewCellImageTypeDark = 1
};

@interface PhotoCollectionViewCell : UICollectionViewCell

- (void)updateItem:(PlaceItem *)item;
- (void)updateBookmark:(BOOL)bookmark;
- (void)updateCategory:(PlaceCategory *)category;
+ (UIImage *)imageForType:(PhotoCollectionViewCellImageType)imageType
                baseImage:(UIImage *)baseImage;

@end

NS_ASSUME_NONNULL_END
