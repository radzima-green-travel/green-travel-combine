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
@property (strong, nonatomic) NSSet<NSString *> *lastFilter;

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
            self.flatMapItems = [[NSMutableDictionary alloc] init];
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
    [self.uuids removeAllObjects];
    [self.mapItemsOriginal removeAllObjects];
    [self fillMapItemsFromCategories:categories];
    [self updateCloseItems];
    [self applyCategoryFiltersLast];
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
    NSMutableArray<Category *> *сategoriesWithDefinedCoords = [[NSMutableArray alloc] init];
    [categories enumerateObjectsUsingBlock:^(Category * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        Category *categoryWithDefinedCoords = [self mapCategoryWithCoordsFromCategory:obj];
        if (categoryWithDefinedCoords != nil) {
            [сategoriesWithDefinedCoords addObject:categoryWithDefinedCoords];
        }
    }];
    self.categories = сategoriesWithDefinedCoords;
    traverseCategories(сategoriesWithDefinedCoords, ^(Category *category, PlaceItem *item) {
        if (category != nil) {
            [self.categoryFilter addObject:category.uuid];
        }
        if (item != nil && ![self.uuids containsObject:item.uuid]) {
            MapItem *mapItem = [[MapItem alloc] init];
            mapItem.coords = item.coords;
            mapItem.title = item.title;
            mapItem.correspondingPlaceItem = item;
            self.flatMapItems[item.uuid] = mapItem;
            [self.mapItemsOriginal addObject:mapItem];
            [self.uuids addObject:item.uuid];
        }
    });
}

- (Category *)mapCategoryWithCoordsFromCategory:(Category *)category {
    Category *mappedCategory = [[Category alloc] init];
    mappedCategory.cover = category.cover;
    mappedCategory.icon = category.icon;
    mappedCategory.title = category.title;
    mappedCategory.onAllButtonPress = category.onAllButtonPress;
    mappedCategory.onPlaceCellPress = category.onPlaceCellPress;
    mappedCategory.uuid= category.uuid;
    NSMutableArray<Category *> *resultedCategories = [[NSMutableArray alloc] init];
    NSMutableArray<PlaceItem *> *resultedItems = [[NSMutableArray alloc] init];
    [category.categories enumerateObjectsUsingBlock:^(Category * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        Category *resultedCategory = [self mapCategoryWithCoordsFromCategory:obj];
        if (resultedCategory != nil) {
            [resultedCategories addObject:resultedCategory];
        }
    }];
    [category.items enumerateObjectsUsingBlock:^(PlaceItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        PlaceItem *resultedItem = [self mapMapItemWithCoordsFromItem:obj];
        if (resultedItem != nil) {
            [resultedItems addObject:resultedItem];
        }
    }];
    if ([resultedItems count] == 0 && [resultedCategories count] == 0) {
        return nil;
    }
    category.items = resultedItems;
    category.categories = resultedCategories;
    return category;
}

- (PlaceItem *)mapMapItemWithCoordsFromItem:(PlaceItem *)item {
    if (item != nil && ![self.uuids containsObject:item.uuid] &&
        (item.coords.latitude != kCLLocationCoordinate2DInvalid.latitude &&
         item.coords.longitude != kCLLocationCoordinate2DInvalid.longitude)) {
        return item;
    }
    return nil;
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

- (void)applyCategoryFiltersLast {
    [self.mapItemsFiltered removeAllObjects];
    if (self.lastFilter == nil) {
        [self.mapItemsFiltered addObjectsFromArray:self.mapItemsOriginal];
        [self notifyObservers];
        return;
    }
    [self.mapItemsOriginal enumerateObjectsUsingBlock:^(MapItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([self.lastFilter containsObject:obj.correspondingPlaceItem.category.uuid]) {
            [self.mapItemsFiltered addObject:obj];
        }
    }];
    [self notifyObservers];
}


- (void)applyCategoryFilters:(NSSet<NSString *> *)categoryUUIDs {
    self.lastFilter = [categoryUUIDs copy];
    [self applyCategoryFiltersLast];
}

@end
