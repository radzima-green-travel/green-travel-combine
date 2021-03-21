//
//  MapModel.m
//  GreenTravel
//
//  Created by Alex K on 8/30/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "MapModel.h"
#import "IndexModel.h"
#import "LocationModel.h"
#import "MapItemsObserver.h"
#import "Category.h"
#import "PlaceItem.h"
#import "MapItem.h"
#import <CoreLocation/CoreLocation.h>
#import "CategoryUtils.h"

@interface MapModel ()

@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) NSMutableSet *uuids;
@property (strong, nonatomic) NSMutableSet<NSString *> *categoryFilter;

@end

static const CLLocationDistance kCloseDistanceKm = 200.0;
static const CLLocationDistance kMetersInKilometer = 1000.0;
static const CLLocationDistance kLocationAccuracy = 500.0;

@implementation MapModel

- (instancetype)initWithIndexModel:(IndexModel *)model
                     locationModel:(nonnull LocationModel *)locationModel{
        self = [super init];
        if (self) {
            self.indexModel = model;
            _locationModel = locationModel;
            self.mapItemsOriginal = [[NSMutableArray alloc] init];
            self.mapItemsFiltered = [[NSMutableArray alloc] init];
            self.closeMapItems = [[NSMutableArray alloc] init];
            self.uuids = [[NSMutableSet alloc] init];
            self.mapItemsObservers = [[NSMutableArray alloc] init];
            self.categoryFilter = [[NSMutableSet alloc] init];
            [self.indexModel addObserver:self];
            [self.locationModel addObserver:self];
        }
        return self;
}

#pragma mark - Observers
- (void)onCategoriesUpdate:(nonnull NSArray<Category *> *)categories {
    [self fillMapItemsFromCategories:categories];
    [self updateCloseItems];
    [self notifyObservers];
}

- (void)onCategoriesLoading:(BOOL)loading {}

- (void)onCategoriesNewDataAvailable {}

- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {
}

- (void)onLocationUpdate:(CLLocation *)lastLocation {
    self.lastLocation = lastLocation;
    [self updateCloseItems];
}

- (void)onAuthorizationStatusChange:(CLAuthorizationStatus)status {
    self.lastLocation = self.locationModel.lastLocation;
    [self updateCloseItems];
}

- (void)fillMapItemsFromCategories:(NSArray<Category *> *)categories {
    traverseCategories(categories, ^(Category *category, PlaceItem *item) {
        if (category != nil) {
            [self.categoryFilter addObject:category.uuid];
        }
        if (item != nil && ![self.uuids containsObject:item.uuid]) {
            MapItem *mapItem = [[MapItem alloc] init];
            mapItem.coords = item.coords;
            mapItem.title = item.title;
            mapItem.correspondingPlaceItem = item;
            [self.mapItemsOriginal addObject:mapItem];
            [self.uuids addObject:item.uuid];
        }
    });
}

- (void)updateCloseItems {
    NSMutableArray<MapItem *> *closeItems = [[NSMutableArray alloc] init];
    [self.mapItemsOriginal enumerateObjectsUsingBlock:^(MapItem * _Nonnull mapItem, NSUInteger idx, BOOL * _Nonnull stop) {
        if (self.locationModel.lastLocation) {
            CLLocation *lastLocation = self.locationModel.lastLocation;
            NSLog(@"Last location: %@", lastLocation);
            CLLocation *itemLocation = [[CLLocation alloc] initWithCoordinate:mapItem.coords altitude:0 horizontalAccuracy:kLocationAccuracy verticalAccuracy:kLocationAccuracy timestamp:[[NSDate alloc] init]];
            CLLocationDistance distance = [lastLocation distanceFromLocation:itemLocation] / kMetersInKilometer;
            NSLog(@"Distance: %f", distance);
            if (distance <= kCloseDistanceKm) {
                [closeItems addObject:mapItem];
            }
        }
    }];
    [self.closeMapItems removeAllObjects];
    [self.closeMapItems addObjectsFromArray:closeItems];
}

- (void)addObserver:(nonnull id<MapItemsObserver>)observer {
    if ([self.mapItemsObservers containsObject:observer]) {
        return;
    }
    [self.mapItemsObservers addObject:observer];
}

- (void)notifyObservers {
    [self.mapItemsObservers enumerateObjectsUsingBlock:^(id<MapItemsObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onMapItemsUpdate:self.mapItemsFiltered];
    }];
}

- (void)removeObserver:(nonnull id<MapItemsObserver>)observer {
    [self.mapItemsObservers removeObject:observer];
}

- (void)applyCategoryFilters:(NSSet<NSString *> *)categoryUUIDs {
    [self.mapItemsFiltered removeAllObjects];
    [self.mapItemsOriginal enumerateObjectsUsingBlock:^(MapItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([categoryUUIDs containsObject:obj.correspondingPlaceItem.category.uuid]) {
            [self.mapItemsFiltered addObject:obj];
        }
    }];
    [self notifyObservers];
}

@end
