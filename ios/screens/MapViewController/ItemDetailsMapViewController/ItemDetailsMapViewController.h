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

typedef NS_OPTIONS(NSUInteger, ItemDetailsMapViewControllerAnnotationType) {
  ItemDetailsMapViewControllerAnnotationTypePoint = 1 << 0,
  ItemDetailsMapViewControllerAnnotationTypeArea = 1 << 1,
  ItemDetailsMapViewControllerAnnotationTypeOutline = 1 << 2,
  ItemDetailsMapViewControllerAnnotationTypeRoute = 1 << 3,
  ItemDetailsMapViewControllerAnnotationTypePath = 1 << 4,
  ItemDetailsMapViewControllerAnnotationTypeLocation = 1 << 5,
};

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
