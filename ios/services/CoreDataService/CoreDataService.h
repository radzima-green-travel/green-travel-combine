//
//  CoreDataService.h
//  GreenTravel
//
//  Created by Alex K on 9/6/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;
@class PlaceDetails;
@class PlaceCategory;
@class BookmarksModel;
@class SearchItem;

@interface CoreDataService : NSObject

@property (readonly, strong) NSPersistentContainer *persistentContainer;
- (void)updatePlaceItem:(PlaceItem *)placeItem bookmark:(BOOL)bookmark;
- (void)loadCategoriesWithCompletion:(void(^)(NSArray<PlaceCategory *>*))completion;
- (void)saveCategories:(NSArray<PlaceCategory *> *)categories;
- (void)saveDetailsFromCategories:(NSArray<PlaceCategory *> *)categories
                   withCompletion:(void(^)(void))completion;
- (void)loadSearchItemsWithCompletion:(void(^)(NSArray<SearchItem *>*))completion;
- (void)addSearchItem:(SearchItem *)searchItem;
- (void)removeSearchItem:(SearchItem *)searchItem;
- (void)loadDetailsByUUID:(NSString *)uuid
           withCompletion:(void (^)(PlaceDetails *, NSError * _Nullable))completion;
- (void)savePlaceDetails:(PlaceDetails *)details forUUID:(NSString *)uuid;

@end

NS_ASSUME_NONNULL_END
