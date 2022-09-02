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
static NSString *const kProfileCell = @"ProfileCell";

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
  [self.userModel addUserModelObserver:self];
  [self onUserModelStateTransitionFrom:self.userModel.prevState toCurrentState:self.userModel.state];

  if (self.userModel.signedIn) {
    [self configureSignedInTableViewCells];
  } else {
    [self configureBaseTableViewCells];
  }

  [self prepareView];
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
  [self.tableView registerClass:ProfileTableViewCell.self forCellReuseIdentifier:kProfileCell];
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;

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
  ProfileTableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:kProfileCell forIndexPath:indexPath];

  if (indexPath.section == 0) {
    [cell prepareAuthCellWithImage:model.image mainTextLabelText:model.title subTextLabelText:model.subTitle];
    [cell onUserModelStateTransitionFrom:self.userModel.prevState toCurrentState:self.userModel.state];
  } else {
    [cell prepareSettingsCellWithImage:model.image mainTextLabelText:model.title subTextLabelText:model.subTitle];
  }

  return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
  SettingsTableViewCellModel *model = self.models[indexPath.section].cellmodels[indexPath.row];
  model.handler();
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  if (indexPath.section == 0) {
    return kAuthRowHeight;
  }
    return kSettingsRowHeight;
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState toCurrentState:(UserModelState)currentState {
  if (currentState == UserModelStateFetched) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.tableView reloadData];
    });
  }
}

#pragma mark - Configure cells
- (void)configureBaseTableViewCells {
  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
                                          initWithTitle:NSLocalizedString(@"ProfileTableViewCellAuthMainTitle", @"")
                                          subTitle:NSLocalizedString(@"ProfileTableViewCellAuthSubTitle", @"")
                                          image:[UIImage imageNamed:@"accountPhoto"]
                                          handler:^{
    LoginViewController *loginViewController = [[LoginViewController alloc] initWithController:self.userController model:self.userModel];
    [self.navigationController pushViewController:loginViewController animated:YES];
  }];

  SettingsTableViewCellModel *dataAndStorageCell = [[SettingsTableViewCellModel alloc]
                                                    initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelDataAndStorage", @"")
                                                    subTitle:@""
                                                    image:[UIImage imageNamed:@"dataAndStorage"]
                                                    handler:^{
    NSLog(@"DataAndStorageCell Tapped");
  }];

  SettingsTableViewCellModel *languageCell = [[SettingsTableViewCellModel alloc]
                                              initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelLanguage", @"")
                                              subTitle:NSLocale.currentLocale.languageCode
                                              image:[UIImage imageNamed:@"language"]
                                              handler:^{
    NSLog(@"LanguageCell Tapped");
  }];

  SettingsTableViewCellModel *themeCell = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelTheme", @"")
                                           subTitle:@"Light"
                                           image:[UIImage imageNamed:@"theme"]
                                           handler:^{
    NSLog(@"ThemeCell Tapped");
  }];

  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:dataAndStorageCell, languageCell, themeCell, nil];
  ProfileSection *authSection = [[ProfileSection alloc]
                                 initWithTitle:@""
                                 cellModels:[[NSMutableArray alloc]initWithObjects:authCell, nil]];

  ProfileSection *settingsSection = [[ProfileSection alloc]
                                     initWithTitle:NSLocalizedString(@"ProfileTableViewSettingsSection", @"")
                                     cellModels:settingCellModels];

  self.models = [[NSMutableArray alloc] initWithArray:@[authSection, settingsSection]];
}

- (void)configureSignedInTableViewCells {

  NSString *userName = @"NAME";

  SettingsTableViewCellModel *authCell = [[SettingsTableViewCellModel alloc]
                                          initWithTitle:userName
                                          subTitle:@""
                                          image:[UIImage imageNamed:@"accountPhoto"]
                                          handler:^{
    NSLog(@"User Settings Tapped");
  }];

  SettingsTableViewCellModel *dataAndStorageCell = [[SettingsTableViewCellModel alloc]
                                                    initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelDataAndStorage", @"")
                                                    subTitle:@""
                                                    image:[UIImage imageNamed:@"dataAndStorage"]
                                                    handler:^{
    NSLog(@"DataAndStorageCell Tapped");
  }];

  SettingsTableViewCellModel *languageCell = [[SettingsTableViewCellModel alloc]
                                              initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelLanguage", @"")
                                              subTitle:NSLocale.currentLocale.languageCode
                                              image:[UIImage imageNamed:@"language"]
                                              handler:^{
    NSLog(@"LanguageCell Tapped");
  }];

  SettingsTableViewCellModel *themeCell = [[SettingsTableViewCellModel alloc]
                                           initWithTitle:NSLocalizedString(@"ProfileTableViewCellLabelTheme", @"")
                                           subTitle:@"Light"
                                           image:[UIImage imageNamed:@"theme"]
                                           handler:^{
    NSLog(@"ThemeCell Tapped");
  }];

  NSMutableArray *settingCellModels = [[NSMutableArray alloc] initWithObjects:dataAndStorageCell, languageCell, themeCell, nil];
  ProfileSection *authSection = [[ProfileSection alloc]
                                 initWithTitle:@""
                                 cellModels:[[NSMutableArray alloc]initWithObjects:authCell, nil]];

  ProfileSection *settingsSection = [[ProfileSection alloc]
                                     initWithTitle:NSLocalizedString(@"ProfileTableViewSettingsSection", @"")
                                     cellModels:settingCellModels];

  self.models = [[NSMutableArray alloc] initWithArray:@[authSection, settingsSection]];
}

@end
