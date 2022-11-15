//
//  DeveloperSettingsTableViewController.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 15.11.22.
//

#import "DeveloperSettingsTableViewController+Utils.h"
#import "SettingsSection.h"
#import "ProfileTableViewCell.h"
#import "Colors.h"

@interface DeveloperSettingsTableViewController ()

@property (strong, nonatomic) UITableView *tableView;
@property (strong, nonatomic) NSMutableArray<SettingsSection *> *cellModels;

@end

static NSString *const kDevSettingsCell = @"DevSettingsCell";
static const CGFloat kSettingsRowHeight = 44.0;

@implementation DeveloperSettingsTableViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  [self prepareView];
  self.cellModels = configureDevSettingsTableViewCells(self);
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
  [self.tableView registerClass:ProfileTableViewCell.self forCellReuseIdentifier:kDevSettingsCell];
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

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  NSMutableArray<SettingsTableViewCellModel *> *models = self.cellModels[indexPath.section].cellModels;
  SettingsTableViewCellModel *model = models[indexPath.row];
  ProfileTableViewCell *settingsCell = [self.tableView dequeueReusableCellWithIdentifier:kDevSettingsCell];
  [settingsCell prepareSettingsCellWithImage:model.image mainTextLabelText:model.title subTextLabelText:model.subTitle];
  return settingsCell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
  SettingsTableViewCellModel *model = self.cellModels[indexPath.section].cellModels[indexPath.row];
  model.handler();
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  return kSettingsRowHeight;
}


@end
