//
//  UserSettingsViewController.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 11.09.22.
//

#import "UserSettingsViewController.h"
#import "UserSettingsTableViewCell.h"
#import "ProfileTableViewCell.h"
#import "Colors.h"
#import "SettingsTableViewCellModel.h"
#import "ProfileSection.h"
#import "UserSettingsViewControllerUtils.h"


@interface UserSettingsViewController ()

@property (strong, nonatomic) UITableView *tableView;
@property (strong, nonatomic) NSMutableArray<ProfileSection *> *cellModels;

@end

static NSString *const kProfileCell = @"UserSettingCell";
static const CGFloat kSettingsRowHeight = 44.0;

@implementation UserSettingsViewController

- (instancetype)initWithController:(UserController *)controller model:(UserModel *)model {
  self = [super init];
  if (self) {
    _userController = controller;
    _userModel = model;
  }
  return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  [self prepareView];
  self.cellModels = configureSettingsTableViewCells(self);
}

- (void)prepareView {
  self.view.backgroundColor = [Colors get].backgroundProfileScreen;
  if (@available(iOS 13.0, *)) {
    self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleInsetGrouped];
  } else {
    self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleGrouped];
  }
  self.tableView.delegate = self;
  self.tableView.dataSource = self;
  [self.tableView registerClass:UserSettingsTableViewCell.self forCellReuseIdentifier:kProfileCell];
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
  
  self.tableView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.view addSubview:self.tableView];
  self.tableView.frame = self.view.bounds;
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return self.cellModels[section].cellModels.count;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return self.cellModels.count;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
  return self.cellModels[section].title;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  return kSettingsRowHeight;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  NSMutableArray<SettingsTableViewCellModel *> *models = self.cellModels[indexPath.section].cellModels;
  SettingsTableViewCellModel *model = models[indexPath.row];
  UserSettingsTableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:kProfileCell forIndexPath:indexPath];
  
  [cell prepareSettingsCellWithMainTextLabelText:model.title subTextLabelText:model.subTitle withChevron:NO];
  
  return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
  SettingsTableViewCellModel *model = self.cellModels[indexPath.section].cellModels[indexPath.row];
  model.handler();
}

@end
