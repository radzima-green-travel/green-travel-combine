//
//  UserFetchErrorViewController.m
//  greenTravel
//
//  Created by Alex K on 9.06.22.
//

#import "UserFetchErrorViewController.h"
#import "NoDataView.h"
#import "UserController.h"

@interface UserFetchErrorViewController ()

@property(strong, nonatomic) NoDataView *noDataView;

@end

@implementation UserFetchErrorViewController

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
}

- (void)viewDidLoad {
  [super viewDidLoad];
  __weak typeof(self) weakSelf = self;
  self.noDataView = [[NoDataView alloc] initWithAction:^{
    [weakSelf.userController fetchCurrentAuthSession];
  }];
  self.noDataView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.contentView addSubview:self.noDataView];
  
  [NSLayoutConstraint activateConstraints:@[
    [self.noDataView.centerXAnchor constraintEqualToAnchor:self.contentView.centerXAnchor],
    [self.noDataView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor],
    [self.noDataView.bottomAnchor constraintLessThanOrEqualToAnchor:self.contentView.bottomAnchor]
  ]];
}

@end
