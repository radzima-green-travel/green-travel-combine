//
//  NearbyPlacesViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/21/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MapItemsObserver.h"
#import "LocationObserver.h"
@import Mapbox;

NS_ASSUME_NONNULL_BEGIN

@class MapModel;
@class MapItem;
@class LocationModel;
@class SearchModel;
@class IndexModel;
@class ApiService;
@class CoreDataService;
@class DetailsModel;

@interface MapViewController : UIViewController<MapItemsObserver, MGLMapViewDelegate, LocationObserver>

- (instancetype)initWithMapModel:(MapModel *)mapModel
                   locationModel:(LocationModel *)locationModel
                      indexModel:(IndexModel *)indexModel
                     searchModel:(SearchModel *)searchModel
                      apiService:(ApiService *)apiService
                 coreDataService:(CoreDataService *)coreDataService
                         mapItem:(nullable MapItem *)mapItem;

@end

NS_ASSUME_NONNULL_END
