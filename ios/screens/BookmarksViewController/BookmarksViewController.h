//
//  BookmarksViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BookmarksGroupObserver.h"
#import "BaseViewController.h"

NS_ASSUME_NONNULL_BEGIN

@class BookmarksGroupModel;
@class ApiService;
@class DetailsModel;
@class MapModel;
@class IndexModel;
@class LocationModel;
@class SearchModel;
@class DetailsModel;
@class CoreDataService;
@class MapService;

@interface BookmarksViewController : BaseViewController<
UICollectionViewDelegateFlowLayout, BookmarksGroupObserver,
UICollectionViewDataSource>

- (instancetype)initWithModel:(BookmarksGroupModel *)model
                   indexModel:(IndexModel *)indexModel
                   apiService:(ApiService *)apiService
              coreDataService:(CoreDataService *)coreDataService
              mapService:(MapService *)mapService
                     mapModel:(MapModel *)mapModel
                  searchModel:(SearchModel *)searchModel
                  detailsModel:(DetailsModel *)detailsModel
                locationModel:(LocationModel *)locationModel;
- (void)scrollToTop;

@end

NS_ASSUME_NONNULL_END
