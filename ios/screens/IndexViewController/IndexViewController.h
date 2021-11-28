//
//  IndexViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CategoriesObserver.h"
#import "BookmarksObserver.h"
#import "LoadableDataViewController.h"

NS_ASSUME_NONNULL_BEGIN

@class ApiService;
@class IndexModel;
@class SearchModel;
@class LocationModel;
@class MapModel;
@class DetailsModel;
@class CoreDataService;
@class MapService;

@interface IndexViewController : LoadableDataViewController<CategoriesObserver,
BookmarksObserver, UITableViewDelegate, UITableViewDataSource>

- (instancetype) initWithApiService:(ApiService *)apiService
                              model:(IndexModel *)model
                        searchModel:(SearchModel *)searchModel
                      locationModel:(LocationModel *)locationModel
                           mapModel:(MapModel *)mapModel
                       detailsModel:(DetailsModel *)detailsModel
                    coreDataService:(CoreDataService *)coreDataService
                         mapService:(MapService *)mapService;
- (void)scrollToTop;

@end

NS_ASSUME_NONNULL_END
