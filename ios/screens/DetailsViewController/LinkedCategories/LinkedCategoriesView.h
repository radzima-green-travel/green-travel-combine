//
//  LinkedCategoriesView.h
//  GreenTravel
//
//  Created by Alex K on 11/6/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

@class PlaceCategory;
@class MapModel;
@class LocationModel;
@class IndexModel;
@class CategoryUUIDToRelatedItemUUIDs;
@class PlacesViewController;

NS_ASSUME_NONNULL_BEGIN

@interface LinkedCategoriesView : UIView

- (instancetype)initWithIndexModel:(IndexModel *)indexModel
                             title:(nonnull NSString *)title
              onCategoryLinkSelect:(void(^)(PlaceCategory *, NSOrderedSet<NSString *> *))onCategoryLinkSelect;
- (void)update:(NSArray<CategoryUUIDToRelatedItemUUIDs *>*)categoryIdToItems;

@end

NS_ASSUME_NONNULL_END
