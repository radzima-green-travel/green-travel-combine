//
//  SearchViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/16/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SearchItemsObserver.h"
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@class SearchModel;
@class LocationModel;
@class MapModel;
@class DetailsModel;
@class CoreDataService;
@class IndexModel;
@class PlaceItem;
@protocol IndexLoader;

@interface SearchViewController : UIViewController<UISearchResultsUpdating, SearchItemsObserver, CLLocationManagerDelegate, UITableViewDelegate, UITableViewDataSource, UISearchBarDelegate>

- (instancetype)initWithModel:(SearchModel *)model
                   indexModel:(IndexModel *)indexModel
                locationModel:(LocationModel *)locationModel
                     mapModel:(MapModel *)mapModel
                   apiService:(id<IndexLoader>)apiService
              coreDataService:(CoreDataService *)coreDataService
          itemsWithCoordsOnly:(BOOL)itemsWithCoordsOnly
           onSearchItemSelect:(void(^)(PlaceItem *))onSearchItemSelect
onViewDidDisappearWithSelectedItem:(void(^)(PlaceItem *))onViewDidDisappearWithSelectedItem;

@end

NS_ASSUME_NONNULL_END
