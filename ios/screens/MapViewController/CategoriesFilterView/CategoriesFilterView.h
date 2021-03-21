//
//  CategoriesFilterView.h
//  GreenTravel
//
//  Created by Alex K on 2/25/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CategoriesFilterObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class CategoriesFilterModel;
@class IndexModel;
@class PlaceItem;

@interface CategoriesFilterView : UICollectionView<UICollectionViewDelegateFlowLayout, UICollectionViewDataSource, CategoriesFilterObserver> 


- (instancetype)initWithIndexModel:(IndexModel *)indexModel
                    onFilterUpdate:(void(^)(NSSet<NSString *>*))onFilterUpdate;
- (void)activateFilterForPlaceItem:(PlaceItem *)item;

@end

NS_ASSUME_NONNULL_END
