//
//  ProfileTableViewController.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 23.07.22.
//

#import "ProfileTableViewController.h"
#import "ProfileTableViewCell.h"
#import "Colors.h"
#import "SettingsTableViewCellModel.h"
#import "ProfileSection.h"
#import "LoginViewController.h"
#import "UserModel.h"



@interface ProfileTableViewController ()

@property (strong, nonatomic) UITableView *tableView;
@property (assign, nonatomic) CGFloat tableViewHeight;
@property (strong, nonatomic) NSMutableArray<ProfileSection *> *models;

@end

static const CGFloat kSettingsRowHeight = 44.0;
static const CGFloat kAuthRowHeight = 96.0;

@implementation ProfileTableViewController

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
  [self configureTableViewCells];
  [self prepareView];
}

- (void)configureTableViewCells {
  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"You are not authorized"
                                                                                  subTitle:@"Authorized or Sign up"
                                                                                     image:[UIImage imageNamed:@"accountPhoto"]
                                                                                   handler:^{
    LoginViewController *loginViewController = [[LoginViewController alloc] initWithController:self.userController model:self.userModel];
    [self.navigationController pushViewController:loginViewController animated:YES];
  }];
  
  SettingsTableViewCellModel *dataAndStorageCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Data and Storage"
                                                                                            subTitle:@""
                                                                                               image:[UIImage imageNamed:@"dataAndStorage"]
                                                                                             handler:^{
    NSLog(@"DataAndStorageCell Tapped");
  }];
  
  SettingsTableViewCellModel *languageCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Language"
                                                                                      subTitle:@"English"
                                                                                         image:[UIImage imageNamed:@"language"]
                                                                                       handler:^{
    NSLog(@"LanguageCell Tapped");
  }];
  
  SettingsTableViewCellModel *themeCell = [[SettingsTableViewCellModel alloc] initWithTitle:@"Theme"
                                                                                   subTitle:@"Light"
                                                                                      image:[UIImage imageNamed:@"theme"]
                                                                                    handler:^{
    NSLog(@"ThemeCell Tapped");
  }];
  
  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:dataAndStorageCell, languageCell, themeCell, nil];
  ProfileSection *authSection = [[ProfileSection alloc] initWithTitle:@"" cellModels:[[NSMutableArray alloc]initWithObjects:authCell, nil]];
  ProfileSection *settingsSection = [[ProfileSection alloc] initWithTitle:@"Settings" cellModels:settingCellModels];
  
  self.models = [[NSMutableArray alloc] initWithArray:@[authSection, settingsSection]];
  }

- (void)prepareView {
  self.view.backgroundColor = [Colors get].backgroundProfileScreen;
  self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleGrouped];
  self.tableView.delegate = self;
  self.tableView.dataSource = self;
  [self.tableView registerClass:ProfileTableViewCell.self forCellReuseIdentifier:@"ProfileCell"];
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
  
  self.tableView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.view addSubview:self.tableView];
  self.tableView.frame = self.view.bounds;
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return self.models[section].cellmodels.count;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return self.models.count;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
  return self.models[section].title;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  NSMutableArray<SettingsTableViewCellModel *> *models = self.models[indexPath.section].cellmodels;
  SettingsTableViewCellModel *model = models[indexPath.row];
  ProfileTableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:@"ProfileCell" forIndexPath:indexPath];
  
  if (indexPath.section == 0) {
    [cell prepareAuthCellWithImage:model.image mainTextLabelText:model.title subTextLabelText:model.subTitle];
  } else {
    [cell prepareSettingsCellWithImage:model.image mainTextLabelText:model.title subTextLabelText:model.subTitle];
    if (indexPath.section == 1 && indexPath.row == 0) {
      cell.backgroundView.layer.cornerRadius = 14;
      cell.backgroundView.layer.maskedCorners = kCALayerMinXMinYCorner | kCALayerMaxXMinYCorner;
    } else if (indexPath.section == 1 && indexPath.row == models.count - 1){
      cell.backgroundView.layer.cornerRadius = 14;
      cell.backgroundView.layer.maskedCorners = kCALayerMinXMaxYCorner | kCALayerMaxXMaxYCorner;
      cell.separatorView.alpha = 0;
    }
  }
  
  return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  SettingsTableViewCellModel *model = self.models[indexPath.section].cellmodels[indexPath.row];
  model.handler();
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  if (indexPath.section == 0) {
    return kAuthRowHeight;
  } else {
    return kSettingsRowHeight;
  }
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState toCurrentState:(UserModelState)currentState {
  [self.tableView reloadData];
}


@end
