//
//  MapModel.h
//  GreenTravel
//
//  Created by Alex K on 8/30/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CategoriesObserver.h"
#import "LocationObserver.h"
#import "MapItemsObservable.h"

NS_ASSUME_NONNULL_BEGIN

@class MapItem;
@class IndexModel;
@class LocationModel;
@protocol MapItemsObserver;
@class CLLocation;

@interface MapModel : NSObject<CategoriesObserver, MapItemsObservable, LocationObserver>

- (instancetype)initWithIndexModel:(IndexModel *)model
                     locationModel:(LocationModel *)locationModel;
@property (strong, nonatomic) NSMutableArray<MapItem *> *mapItemsOriginal;
@property (strong, nonatomic) NSMutableArray<MapItem *> *mapItemsFiltered;
@property (strong, nonatomic) NSMutableArray<MapItem *> *closeMapItems;
@property (strong, nonatomic) CLLocation *lastLocation; 
@property (strong, nonatomic) NSMutableArray<id<MapItemsObserver>> *mapItemsObservers;
- (void)applyCategoryFilters:(NSSet<NSString *> *)categoryUUIDs;

@end

NS_ASSUME_NONNULL_END
