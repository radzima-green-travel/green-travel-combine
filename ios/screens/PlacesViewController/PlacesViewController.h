//
//  PlacesViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/19/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CategoriesObserver.h"
#import "BookmarksObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class Category;
@class PlaceItem;
@class ApiService;
@class CoreDataService;
@class MapModel;
@class LocationModel;
@class IndexModel;
@class SearchModel;

@interface PlacesViewController : UICollectionViewController<BookmarksObserver>

@property (strong, nonatomic) Category *category;
- (instancetype)initWithIndexModel:(IndexModel *)indexModel
                        apiService:(ApiService *)apiService
                   coreDataService:(CoreDataService *)coreDataService
                          mapModel:(MapModel *)mapModel
                     locationModel:(LocationModel *)locationModel
                       searchModel:(SearchModel *)searchModel
                        bookmarked:(BOOL)bookmarked
                  allowedItemUUIDs:(nullable NSOrderedSet<NSString *> *)allowedItemUUIDs;


@end

NS_ASSUME_NONNULL_END
