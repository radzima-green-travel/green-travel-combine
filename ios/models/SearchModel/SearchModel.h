//
//  SearchModel.h
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CategoriesObserver.h"
#import "LocationObserver.h"
#import "SearchItemsObservable.h"

NS_ASSUME_NONNULL_BEGIN

@class SearchItem;
@class IndexModel;
@protocol SearchItemsObserver;
@class LocationModel;
@class CoreDataService;

@interface SearchModel : NSObject<CategoriesObserver, SearchItemsObservable, LocationObserver>

- (instancetype)initWithIndexModel:(IndexModel *)model
                     locationModel:(LocationModel *)locationModel
                   coreDataService:(CoreDataService *)coreDataService;
@property (strong, nonatomic) NSMutableArray<SearchItem *> *searchItems;
@property (strong, nonatomic) NSMutableArray<SearchItem *> *searchHistoryItems;
@property (strong, nonatomic) NSMutableArray<id<SearchItemsObserver>> *searchItemsObservers;
- (void)loadSearchHistoryItems;
- (void)addSearchHistoryItem:(SearchItem *)searchItem;
- (void)removeSearchHistoryItem:(SearchItem *)searchItem;

@end

NS_ASSUME_NONNULL_END
