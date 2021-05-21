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
#import "BookmarksObserver.h"
#import "BaseMapViewController.h"

NS_ASSUME_NONNULL_BEGIN

@class MapModel;
@class MapItem;
@class LocationModel;
@class SearchModel;
@class IndexModel;
@class ApiService;
@class CoreDataService;
@class DetailsModel;

@interface ItemDetailsMapViewController : BaseMapViewController<MapItemsObserver, MGLMapViewDelegate, LocationObserver, BookmarksObserver>

@end

NS_ASSUME_NONNULL_END
