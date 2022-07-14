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
#import "MapViewControllerConstants.h"
#import "MapViewToStateIntermediary.h"
#import "MapButton/MapButton.h"

NS_ASSUME_NONNULL_BEGIN

@class MapModel;
@class MapItem;
@class LocationModel;
@class SearchModel;
@class IndexModel;
@class CoreDataService;
@class DetailsModel;
@class CategoriesFilterView;
@class BottomSheetView;
@class MapService;
@protocol IndexLoader;

@interface BaseMapViewController : UIViewController<MapItemsObserver, MGLMapViewDelegate, LocationObserver, BookmarksObserver, MapViewToStateIntermediary>

@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) DetailsModel *detailsModel;
@property (strong, nonatomic) id<IndexLoader> apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) MapButton *locationButton;
@property (strong, nonatomic) MapButton *searchButton;
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
@property (assign, nonatomic) BOOL showingUserLocation;

- (instancetype)initWithMapModel:(MapModel *)mapModel
                   locationModel:(LocationModel *)locationModel
                      indexModel:(IndexModel *)indexModel
                     searchModel:(SearchModel *)searchModel
                     detailsModel:(DetailsModel *)detailsModel
                      apiService:(id<IndexLoader>)apiService
                 coreDataService:(CoreDataService *)coreDataService
                      mapService:(MapService *)mapService
                         mapItem:(nullable MapItem *)mapItem;
- (void)showPopupWithItem:(PlaceItem *)item;
- (void)hidePopup;
- (BottomSheetView *)addBottomSheet:(MapViewControllerType)sheetType;
- (void)renderMap:(BOOL)initialLoad;
- (void)cleanMap;
- (void)onPopupShow:(BOOL)visible itemUUID:(NSString *)itemUUID;
- (void)showUserLocation:(BOOL)show;
- (void)saveMapCoordinates;
- (void)updateLocationButton:(BOOL)centeredOnUserLocation;
- (void)showBigPicture;
- (BOOL)locationIsInvalid;

@end

NS_ASSUME_NONNULL_END
