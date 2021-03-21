//
//  CategoriesFilterCollectionViewCell.h
//  GreenTravel
//
//  Created by Alex K on 2/25/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class FilterOption;

@interface CategoriesFilterCollectionViewCell : UICollectionViewCell

- (void)update:(FilterOption *)option;

@end

NS_ASSUME_NONNULL_END
