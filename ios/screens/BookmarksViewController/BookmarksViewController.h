//
//  BookmarksViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BookmarksGroupObserver.h"

NS_ASSUME_NONNULL_BEGIN

@class BookmarksGroupModel;
@class DetailsModel;
@class MapModel;
@class IndexModel;
@class LocationModel;
@class SearchModel;
@class DetailsModel;
@class CoreDataService;
@class MapService;
@protocol IndexLoader;

@interface BookmarksViewController : UIViewController<
UICollectionViewDelegateFlowLayout, BookmarksGroupObserver,
UICollectionViewDataSource>

- (instancetype)initWithModel:(BookmarksGroupModel *)model
                   indexModel:(IndexModel *)indexModel
                   apiService:(id<IndexLoader>)apiService
              coreDataService:(CoreDataService *)coreDataService
              mapService:(MapService *)mapService
                     mapModel:(MapModel *)mapModel
                  searchModel:(SearchModel *)searchModel
                  detailsModel:(DetailsModel *)detailsModel
                locationModel:(LocationModel *)locationModel;
- (void)scrollToTop;

@end

NS_ASSUME_NONNULL_END
