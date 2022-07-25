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

@class PlaceCategory;
@class PlaceItem;
@class CoreDataService;
@class MapModel;
@class LocationModel;
@class IndexModel;
@class SearchModel;
@class DetailsModel;
@class MapService;
@protocol IndexLoader;

@interface PlacesViewController : UICollectionViewController<BookmarksObserver>

@property (strong, nonatomic) PlaceCategory *category;
- (instancetype)initWithIndexModel:(IndexModel *)indexModel
                        apiService:(id<IndexLoader>)apiService
                   coreDataService:(CoreDataService *)coreDataService
                   mapService:(MapService *)mapService
                          mapModel:(MapModel *)mapModel
                     locationModel:(LocationModel *)locationModel
                       searchModel:(SearchModel *)searchModel
                       detailsModel:(DetailsModel *)detailsModel
                        bookmarked:(BOOL)bookmarked
                  allowedItemUUIDs:(nullable NSOrderedSet<NSString *> *)allowedItemUUIDs;


@end

NS_ASSUME_NONNULL_END
