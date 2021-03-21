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

NS_ASSUME_NONNULL_BEGIN

@class ApiService;
@class IndexModel;
@class SearchModel;
@class LocationModel;
@class MapModel;
@class DetailsModel;
@class CoreDataService;

@interface IndexViewController : UIViewController<CategoriesObserver,
BookmarksObserver, UITableViewDelegate, UITableViewDataSource>

- (instancetype) initWithApiService:(ApiService *)apiService
                              model:(IndexModel *)model
                        searchModel:(SearchModel *)searchModel
                      locationModel:(LocationModel *)locationModel
                           mapModel:(MapModel *)mapModel
                       detailsModel:(DetailsModel *)detailsModel
                    coreDataService:(CoreDataService *)coreDataService;

@end

NS_ASSUME_NONNULL_END
