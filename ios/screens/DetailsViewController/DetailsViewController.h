//
//  DetailsViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/19/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BookmarksObserver.h"
#import "CategoriesObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;
@class ApiService;
@class CoreDataService;
@class MapModel;
@class LocationModel;
@class IndexModel;
@class SearchModel;
@class MapService;

@interface DetailsViewController : UIViewController <BookmarksObserver, CategoriesObserver, UIScrollViewDelegate>

- (instancetype)initWithApiService:(ApiService *)apiService
                   coreDataService:(nonnull CoreDataService *)coreDataService
                   mapService:(nonnull MapService *)mapService
                        indexModel:(IndexModel *)indexModel
                          mapModel:(MapModel *)mapModel
                     locationModel:(LocationModel *)locationModel
                       searchModel:(SearchModel *) searchModel;
@property (strong, nonatomic) PlaceItem *item;

@end

NS_ASSUME_NONNULL_END
