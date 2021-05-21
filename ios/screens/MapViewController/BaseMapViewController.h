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

NS_ASSUME_NONNULL_BEGIN

@class MapModel;
@class MapItem;
@class LocationModel;
@class SearchModel;
@class IndexModel;
@class ApiService;
@class CoreDataService;
@class DetailsModel;
@class CategoriesFilterView;
@class BottomSheetView;

@interface BaseMapViewController : UIViewController<MapItemsObserver, MGLMapViewDelegate, LocationObserver, BookmarksObserver>

@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) UIButton *locationButton;
@property (strong, nonatomic) UIButton *searchButton;
@property (strong, nonatomic) MGLMapView *mapView;
@property (assign, nonatomic) BOOL intentionToFocusOnUserLocation;
@property (strong, nonatomic) MapItem *mapItem;
@property (strong, nonatomic) CategoriesFilterView *filterView;
@property (strong, nonatomic) NSLayoutConstraint *locationButtonBottomAnchor;
@property (strong, nonatomic) UIView *popup;
@property (strong, nonatomic) BottomSheetView *bottomSheet;

- (instancetype)initWithMapModel:(MapModel *)mapModel
                   locationModel:(LocationModel *)locationModel
                      indexModel:(IndexModel *)indexModel
                     searchModel:(SearchModel *)searchModel
                      apiService:(ApiService *)apiService
                 coreDataService:(CoreDataService *)coreDataService
                         mapItem:(nullable MapItem *)mapItem;
- (void)showPopupWithItem:(PlaceItem *)item;
- (void)hidePopup;
- (void)addBottomSheet:(NSString *)buttonLabel;

@end

NS_ASSUME_NONNULL_END
