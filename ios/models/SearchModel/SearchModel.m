//
//  SearchModel.m
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "SearchModel.h"
#import "IndexModel.h"
#import "SearchItemsObserver.h"
#import "PlaceCategory.h"
#import "SearchItem.h"
#import "PlaceItem.h"
#import "LocationModel.h"
#import "CoreDataService.h"
#import "CategoryUtils.h"

@interface SearchModel ()

@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) NSMutableSet *uuids;
@property (strong, nonatomic) CoreDataService *coreDataService;

@end

@implementation SearchModel

- (instancetype)initWithIndexModel:(IndexModel *)model
                     locationModel:(LocationModel *)locationModel
                   coreDataService:(CoreDataService *)coreDataService
{
    self = [super init];
    if (self) {
        _indexModel = model;
        _locationModel = locationModel;
        _coreDataService = coreDataService;
        self.searchItems = [[NSMutableArray alloc] init];
        self.searchHistoryItems = [[NSMutableArray alloc] init];
        self.uuids = [[NSMutableSet alloc] init];
        self.searchItemsObservers = [[NSMutableArray alloc] init];
        [self.indexModel addObserver:self];
        [self.locationModel addObserver:self];
    }
    return self;
}
 
#pragma mark - Observers
- (void)onCategoriesUpdate:(nonnull NSArray<PlaceCategory *> *)categories {
    [self.searchItems removeAllObjects];
    [self.searchHistoryItems removeAllObjects];
    [self.uuids removeAllObjects];
    [self fillSearchItemsFromCategories:categories];
    [self loadSearchHistoryItems];
    [self notifyObservers];
}

- (void)onCategoriesLoading:(BOOL)loading {}

- (void)onCategoriesNewDataAvailable {}

- (void)onDetailsLoading:(BOOL)loading {}

- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {}

- (void)fillSearchItemsFromCategories:(NSArray<PlaceCategory *>*)categories {
    traverseCategories(categories, ^(PlaceCategory *category, PlaceItem *item) {
        if (item == nil) {
            return;
        }
        if (![self.uuids containsObject:item.uuid]) {
            SearchItem *searchItem = [[SearchItem alloc] init];
            searchItem.correspondingPlaceItemUUID = item.uuid;
            searchItem.title = item.title;
            // TODO: Take into account when Geolocation is enabled.
            searchItem.distance = -1;
            
            [self.searchItems addObject:searchItem];
            [self.uuids addObject:item.uuid];
        }
    });
}

- (void)addObserver:(nonnull id<SearchItemsObserver>)observer {
    if ([self.searchItemsObservers containsObject:observer]) {
        return;
    }
    [self.searchItemsObservers addObject:observer];
}

- (void)notifyObservers {
    [self.searchItemsObservers enumerateObjectsUsingBlock:^(id<SearchItemsObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onSearchItemsUpdate:self.searchItems];
    }];
}

- (void)notifyObserversOfSearchHistoryUpdate {
    [self.searchItemsObservers enumerateObjectsUsingBlock:^(id<SearchItemsObserver>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj onSearchHistoryItemsUpdate:self.searchHistoryItems];
    }];
}

- (void)removeObserver:(nonnull id<SearchItemsObserver>)observer {
    [self.searchItemsObservers removeObject:observer];
}

- (void)onLocationUpdate:(CLLocation *)lastLocation {
    NSLog(@"Last location: %@", lastLocation);
    [self.searchItems enumerateObjectsUsingBlock:^(SearchItem * _Nonnull searchItem, NSUInteger idx, BOOL * _Nonnull stop) {
        CLLocation *itemLocation =
        [[CLLocation alloc] initWithCoordinate:
         self.indexModel.flatItems[searchItem.correspondingPlaceItemUUID].coords
                                              altitude:0
                                    horizontalAccuracy:500.0
                                      verticalAccuracy:500.0
                                             timestamp:[[NSDate alloc] init]];
        searchItem.distance = [lastLocation distanceFromLocation:itemLocation] / 1000.0;
    }];
    [self notifyObservers];
}

- (void)onAuthorizationStatusChange:(CLAuthorizationStatus)status {
}

- (void)loadSearchHistoryItems {
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    [weakSelf.coreDataService loadSearchItemsWithCompletion:^(NSArray<SearchItem *> * _Nonnull searchItems) {
      __strong typeof(weakSelf) strongSelf = weakSelf;
      strongSelf.searchHistoryItems = [[NSMutableArray alloc] initWithArray:searchItems];
      [strongSelf notifyObserversOfSearchHistoryUpdate];
    }];
  });
}

- (void)addSearchHistoryItem:(SearchItem *)searchItem {
    NSUInteger foundIndex = [self findIndexOfSearchHistoryItem:searchItem];
    if (foundIndex != NSNotFound) {
        [self.searchHistoryItems removeObjectAtIndex:foundIndex];
    }
    [self.searchHistoryItems addObject:searchItem];
    [self.coreDataService addSearchItem:searchItem];
}

- (void)removeSearchHistoryItem:(SearchItem *)searchItem {
    NSUInteger foundIndex = [self findIndexOfSearchHistoryItem:searchItem];
    if (foundIndex == NSNotFound) {
        return;
    }
    [self.searchHistoryItems removeObjectAtIndex:foundIndex];
    [self.coreDataService removeSearchItem:searchItem];
}

- (NSUInteger)findIndexOfSearchHistoryItem:(SearchItem *)searchItem {
    NSUInteger foundIndex = [self.searchHistoryItems indexOfObjectPassingTest:^BOOL(SearchItem * _Nonnull searchHistoryItem, NSUInteger idx, BOOL * _Nonnull stop) {
        return [searchHistoryItem.correspondingPlaceItemUUID
                isEqualToString:searchItem.correspondingPlaceItemUUID];
    }];
    return foundIndex;
}

- (NSArray<SearchItem *> *)searchItemsWithFilter:(BOOL (^)(SearchItem * _Nonnull))searchItemFilter {
    return [self.searchItems filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(id  _Nullable evaluatedObject, NSDictionary<NSString *,id> * _Nullable bindings) {
        return searchItemFilter(evaluatedObject);
    }]];
}

- (NSArray<SearchItem *> *)searchHistoryItemsWithFilter:(BOOL (^)(SearchItem * _Nonnull))searchItemFilter {
  return [self.searchHistoryItems filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(SearchItem* _Nullable searchItem, NSDictionary<NSString *,id> * _Nullable bindings) {
      PlaceItem *correspondingItem = self.indexModel.flatItems[searchItem.correspondingPlaceItemUUID];
      if (correspondingItem == nil) {
        return NO;
      }
      return searchItemFilter(searchItem);
  }]];
}

@end
