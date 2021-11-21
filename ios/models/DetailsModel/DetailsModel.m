//
//  DetailsModel.m
//  GreenTravel
//
//  Created by Alex K on 9/5/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "DetailsModel.h"
#import "Category.h"
#import "IndexModel.h"
#import "DetailsObserver.h"
#import "PlaceItem.h"
#import "BookmarkItem.h"
#import "ApiService.h"
#import "CoreDataService.h"
#import "PlaceDetails.h"

@interface DetailsModel()

@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) NSMutableSet<NSString*> *itemUUIDs;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (assign, nonatomic) DetailsLoadState detailsLoadState;

@end

@implementation DetailsModel

- (instancetype)initWithIndexModel:(IndexModel *)model
                        apiService:(nonnull ApiService *)apiService
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
            [self.indexModel addObserver:self];
        }
        return self;
}

#pragma mark - Observers
- (void)onCategoriesUpdate:(nonnull NSArray<Category *> *)categories {
    [self fillPlaceItemsFromCategories:categories];
    [self notifyObservers];
}

- (void)onCategoriesLoading:(BOOL)loading {}

- (void)onCategoriesNewDataAvailable {}

- (void)onBookmarkUpdate:(nonnull PlaceItem *)item bookmark:(BOOL)bookmark {
}

- (void)onDetailsBatchStatusUpdate:(DetailsLoadState)detailsLoadState
                             error:(NSError * _Nullable)error{
  self.detailsLoadState = detailsLoadState;
  if (self.detailsLoadState == DetailsLoadStateSuccess ||
          self.detailsLoadState == DetailsLoadStateFailure) {
    [self.itemUUIDToStatus enumerateKeysAndObjectsUsingBlock:
     ^(NSString * _Nonnull itemUUID, NSNumber * _Nonnull status, BOOL * _Nonnull stop) {
      if ([status intValue] == DetailsLoadStateProgress) {
        if (self.detailsLoadState == DetailsLoadStateSuccess) {
          [self loadDetailsByUUID:itemUUID];
          return;
        }
        if (self.detailsLoadState == DetailsLoadStateFailure) {
          self.itemUUIDToStatus[itemUUID] = @(DetailsLoadStateFailure);
          [self updateDetails:self.itemUUIDToDetails error:error forUUID:itemUUID];
        }
      }
    }];
  }
}

- (void)fillPlaceItemsFromCategories:(NSArray<Category *> *)categories {
    [categories enumerateObjectsUsingBlock:^(Category * _Nonnull category, NSUInteger idx, BOOL * _Nonnull stop) {
        [self fillPlaceItemsFromCategories:category.categories];
        [category.items enumerateObjectsUsingBlock:^(PlaceItem * _Nonnull item, NSUInteger idx, BOOL * _Nonnull stop) {
            if (![self.itemUUIDs containsObject:item.uuid]) {
                [self.itemUUIDToItem setValue:item forKey:item.uuid];
                [self.itemUUIDs addObject:item.uuid];
            }
        }];
    }];
}

- (void)updateDetails:(PlaceDetails *)details
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
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    [self.coreDataService loadDetailsByUUID:itemUUID withCompletion:^(PlaceDetails * _Nonnull details,
                                                                      NSError * _Nullable error) {
      __strong typeof(weakSelf) strongSelf = weakSelf;
      if (details) {
        [strongSelf updateDetails:details error:error forUUID:itemUUID];
        strongSelf.itemUUIDToStatus[itemUUID] = @(DetailsLoadStateSuccess);
        return;
      }
      strongSelf.itemUUIDToStatus[itemUUID] = @(DetailsLoadStateProgress);
    }];
  });
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
    NSLog(@"notifyObservers");
    [self.detailsObservers enumerateObjectsUsingBlock:^(id<DetailsObserver>  _Nonnull observer, NSUInteger idx, BOOL * _Nonnull stop) {
      [observer onDetailsUpdate:self.itemUUIDToDetails
               itemUUIDToStatus:self.itemUUIDToStatus];
    }];
}

- (void)removeObserver:(nonnull id<DetailsObserver>)observer {
    [self.detailsObservers removeObject:observer];
}

@end
