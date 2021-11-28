//
//  DetailsModel.h
//  GreenTravel
//
//  Created by Alex K on 9/5/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DetailsObservable.h"
#import "CategoriesObserver.h"
#import "DetailsBatchObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class PlaceDetails;
@class PlaceItem;
@class IndexModel;
@class ApiService;
@class CoreDataService;
@protocol DetailsObserver;

@interface DetailsModel : NSObject<CategoriesObserver, DetailsObservable, DetailsBatchObserver>

- (instancetype)initWithIndexModel:(IndexModel *)model
                        apiService:(ApiService *)apiService
                   coreDataService:(CoreDataService *)coreDataService;
@property (strong, nonatomic) NSMutableDictionary<NSString*, PlaceDetails*> *itemUUIDToDetails;
@property (strong, nonatomic) NSMutableDictionary<NSString*, NSNumber*> *itemUUIDToStatus;
@property (strong, nonatomic) NSMutableDictionary<NSString*, PlaceItem*> *itemUUIDToItem;
@property (strong, nonatomic) NSMutableArray<id<DetailsObserver>> *detailsObservers;

- (void)setDetailsAllInProgress:(BOOL)inProgress;
- (void)updateDetails:(PlaceDetails * _Nullable)details
                error:(NSError * _Nullable)error
              forUUID:(NSString *)uuid;
- (void)loadDetailsByUUID:(NSString *)uuid;
- (PlaceDetails *)getDetailsByUUID:(NSString *)uuid;
- (DetailsLoadState)getDetailsStatusByUUID:(NSString *)uuid;
- (void)deleteDetailsForUUID:(NSString *)uuid;

@end

NS_ASSUME_NONNULL_END
