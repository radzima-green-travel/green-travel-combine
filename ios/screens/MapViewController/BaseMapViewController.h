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
#import "MapViewState.h"
#import "MainViewControllerConstants.h"
#import "MapViewToStateIntermediary.h"

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
@class MapService;

@interface BaseMapViewController : UIViewController<MapItemsObserver, MGLMapViewDelegate, LocationObserver, BookmarksObserver, MapViewToStateIntermediary>

@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) UIButton *locationButton;
@property (strong, nonatomic) UIButton *searchButton;
@property (strong, nonatomic) MGLMapView *mapView;
@property (assign, nonatomic) BOOL intentionToFocusOnUserLocation;
@property (strong, nonatomic) MapItem *mapItem;
@property (strong, nonatomic) CategoriesFilterView *filterView;
@property (strong, nonatomic) NSLayoutConstraint *locationButtonBottomAnchor;
@property (strong, nonatomic) UIView *popup;
@property (weak, nonatomic) BottomSheetView *bottomSheet;
@property (strong, nonatomic) UITapGestureRecognizer *singleTap;
@property (assign, nonatomic) BOOL locationMonitoringEnabled;
@property (strong, nonatomic) MapViewState *mapViewState;
@property (strong, nonatomic) NSMutableArray<id<MGLAnnotation>> *annotations;

- (instancetype)initWithMapModel:(MapModel *)mapModel
                   locationModel:(LocationModel *)locationModel
                      indexModel:(IndexModel *)indexModel
                     searchModel:(SearchModel *)searchModel
                      apiService:(ApiService *)apiService
                 coreDataService:(CoreDataService *)coreDataService
                      mapService:(MapService *)mapService
                         mapItem:(nullable MapItem *)mapItem;
- (void)showPopupWithItem:(PlaceItem *)item;
- (void)hidePopup;
- (BottomSheetView *)addBottomSheet:(MainViewControllerBottomSheet)sheetType;
- (void)renderMap:(BOOL)initialLoad;
- (void)cleanMap;
- (void)onPopupShow:(BOOL)visible itemUUID:(NSString *)itemUUID;
- (void)showUserLocation:(BOOL)show;

@end

NS_ASSUME_NONNULL_END
