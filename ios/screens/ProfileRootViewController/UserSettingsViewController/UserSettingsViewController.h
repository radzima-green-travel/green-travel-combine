//
//  UserSettingsViewController.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 11.09.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"
#import "UserController.h"
#import "UserModel.h"
#import "BookmarksGroupModel.h"
#import "IndexModel.h"
#import "MapService.h"
#import "MapModel.h"
#import "SearchModel.h"
#import "DetailsModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface UserSettingsViewController : UIViewController<UITableViewDelegate, UITableViewDataSource>

@property (strong, nonatomic) UserController *userController;
@property (strong, nonatomic) UserModel *userModel;
@property (strong, nonatomic) BookmarksGroupModel *bookmarksGroupModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) id<IndexLoader> apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (strong, nonatomic) DetailsModel *detailsModel;
@property (strong, nonatomic) LocationModel *locationModel;

- (instancetype)initWithController:(UserController *)controller model:(UserModel *)model;

@end

NS_ASSUME_NONNULL_END
