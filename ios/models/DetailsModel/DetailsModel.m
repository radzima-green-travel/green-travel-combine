//
//  DetailsModel.m
//  GreenTravel
//
//  Created by Alex K on 9/5/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "DetailsModel.h"
#import "PlaceCategory.h"
#import "IndexModel.h"
#import "DetailsObserver.h"
#import "PlaceItem.h"
#import "BookmarkItem.h"

#import "CoreDataService.h"
#import "PlaceDetails.h"

@interface DetailsModel()

@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSMutableSet<NSString*> *itemUUIDs;
@property (strong, nonatomic) id<IndexLoader> apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (assign, nonatomic) DetailsLoadState globalDetailsLoadState;

@end

@implementation DetailsModel

- (instancetype)initWithIndexModel:(IndexModel *)model
                        apiService:(nonnull id<IndexLoader>)apiService
                   coreDataService:(nonnull CoreDataService *)coreDataService {
        self = [super init];
        if (self) {
            _indexModel = model;
            _itemUUIDs = [[NSMutableSet alloc] init];
            _detailsObservers = [[NSMutableArray alloc] init];
            _itemUUIDToItem = [[NSMutableDictionary alloc] init];
            _itemUUIDToDetails = [[NSMutableDictionary alloc] init];
            _itemUUIDToStatus = [[NSMutableDictionary alloc] init];
            _apiService = apiService;
            _coreDataService = coreDataService;
            [_indexModel addObserver:self];
            [_indexModel addObserverDetailsBatch:self];
        }
        return self;
}

#pragma mark - Observers
- (void)onCategoriesUpdate:(nonnull NSArray<PlaceCategory *> *)categories {
    [self fillPlaceItemsFromCategories:categories];
    [self notifyObservers];
}

- (void)onCategoriesLoading:(BOOL)loading {
  if (loading) {
    self.globalDetailsLoadState = DetailsLoadStateProgress;
  }
}

- (void)onCategoriesNewDataAvailable {}

- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {
}

- (void)onDetailsBatchStatusUpdate:(DetailsLoadState)detailsLoadState
                             error:(NSError * _Nullable)error{
  self.globalDetailsLoadState = detailsLoadState;
  if (self.globalDetailsLoadState == DetailsLoadStateSuccess ||
          self.globalDetailsLoadState == DetailsLoadStateFailure) {
    [self.itemUUIDToStatus enumerateKeysAndObjectsUsingBlock:
     ^(NSString * _Nonnull itemUUID, NSNumber * _Nonnull status, BOOL * _Nonnull stop) {
      if ([status intValue] == DetailsLoadStateProgress) {
        if (self.globalDetailsLoadState == DetailsLoadStateSuccess) {
          [self loadDetailsByUUID:itemUUID];
          return;
        }
        if (self.globalDetailsLoadState == DetailsLoadStateFailure) {
          self.itemUUIDToStatus[itemUUID] = @(DetailsLoadStateFailure);
          [self updateDetails:self.itemUUIDToDetails[itemUUID]
                        error:error forUUID:itemUUID];
        }
      }
    }];
  }
}

- (void)fillPlaceItemsFromCategories:(NSArray<PlaceCategory *> *)categories {
    [categories enumerateObjectsUsingBlock:^(PlaceCategory * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
        [self fillPlaceItemsFromCategories:category.categories];
        [category.items enumerateObjectsUsingBlock:^(PlaceItem * _Nonnull item, NSUInteger idx, BOOL * _Nonnull stop) {
            if (![self.itemUUIDs containsObject:item.uuid]) {
                [self.itemUUIDToItem setValue:item forKey:item.uuid];
                [self.itemUUIDs addObject:item.uuid];
            }
        }];
    }];
}

- (void)updateDetails:(PlaceDetails * _Nullable)details
                error:(NSError * _Nullable)error
              forUUID:(NSString *)uuid {
  if (error == nil) {
    self.itemUUIDToStatus[uuid] = @(DetailsLoadStateSuccess);
    self.itemUUIDToDetails[uuid] = details;
  } else {
    self.itemUUIDToStatus[uuid] = @(DetailsLoadStateFailure);
  }
  [self notifyObservers];
}

- (void)loadDetailsByUUID:(NSString *)itemUUID {
  __weak typeof(self) weakSelf = self;
  self.itemUUIDToStatus[itemUUID] = @(DetailsLoadStateProgress);
  [self notifyObservers];
  if (self.globalDetailsLoadState == DetailsLoadStateProgress) {
    return;
  }
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    [self.coreDataService loadDetailsByUUID:itemUUID withCompletion:^(PlaceDetails * _Nonnull details,
                                                                      NSError * _Nullable error) {
      __strong typeof(weakSelf) strongSelf = weakSelf;
      if (error != nil) {
        [strongSelf updateDetails:nil error:error forUUID:itemUUID];
        return;
      }
      if (details) {
        [strongSelf updateDetails:details error:nil forUUID:itemUUID];
        return;
      }
      strongSelf.itemUUIDToStatus[itemUUID] = @(DetailsLoadStateFailure);
      [strongSelf notifyObservers];
    }];
  });
}

- (PlaceDetails *)getDetailsByUUID:(NSString *)uuid {
  return self.itemUUIDToDetails[uuid];
}

- (DetailsLoadState)getDetailsStatusByUUID:(NSString *)uuid {
  return [self.itemUUIDToStatus[uuid] intValue];
}


- (void)deleteDetailsForUUID:(NSString *)uuid {
  self.itemUUIDToStatus[uuid] = nil;
  self.itemUUIDToItem[uuid] = nil;
  self.itemUUIDToDetails[uuid] = nil;
}

- (void)addObserver:(nonnull id<DetailsObserver>)observer {
    if ([self.detailsObservers containsObject:observer]) {
        return;
    }
    [self.detailsObservers addObject:observer];
}

- (void)notifyObservers {
    [self.detailsObservers enumerateObjectsUsingBlock:^(id<DetailsObserver>  _Nonnull observer, NSUInteger idx, BOOL * _Nonnull stop) {
      [observer onDetailsUpdate:self.itemUUIDToDetails
               itemUUIDToStatus:self.itemUUIDToStatus];
    }];
}

- (void)removeObserver:(nonnull id<DetailsObserver>)observer {
    [self.detailsObservers removeObject:observer];
}

@end
