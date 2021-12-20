//
//  SlideCollectionViewCell.h
//  GreenTravel
//
//  Created by Alex K on 11/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ZoomableImageCollectionViewCell.h"

NS_ASSUME_NONNULL_BEGIN

@interface SlideCollectionViewCell : ZoomableImageCollectionViewCell

- (void)setUpWithImageURL:(NSString *)imageURL;

@end

NS_ASSUME_NONNULL_END
