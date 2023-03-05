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
#import "StyleUtils.h"
#import "CommonButton.h"
#import "UserController.h"
#import "ProfileTableViewControllerUtils.h"
#import "UserFetchErrorViewController.h"

@interface ProfileTableViewController ()

@property (strong, nonatomic) UITableView *tableView;
@property (strong, nonatomic) NSMutableArray<ProfileSection *> *cellModels;

@end

static const CGFloat kSettingsRowHeight = 44.0;
static const CGFloat kAuthRowHeight = 96.0;
static NSString *const kProfileCell = @"ProfileCell";
static NSString *const kAuthCell = @"AuthCell";

@implementation ProfileTableViewController

- (instancetype)initWithController:(UserController *)controller model:(UserModel *)model {
  self = [super init];
  if (self) {
    _userController = controller;
    _userModel = model;
  }
  return self;
}

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
  configureNavigationBar(self.navigationController.navigationBar);
}


- (void)viewDidLoad {
  [super viewDidLoad];
  [self.userModel addUserModelObserver:self];
  [self onUserModelStateTransitionFrom:self.userModel.prevState toCurrentState:self.userModel.state];
  [self prepareView];
  if (self.userModel.signedInNoAttributes) {
    self.cellModels = configureSignedInTableViewCells(self, NO);
  } else {
    self.cellModels = configureBaseTableViewCells(self);
  }
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
  [self.tableView registerClass:ProfileTableViewCell.self forCellReuseIdentifier:kAuthCell];
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
  ProfileTableViewCell *settingsCell = [self.tableView dequeueReusableCellWithIdentifier:kProfileCell];
  ProfileTableViewCell *authCell = [self.tableView dequeueReusableCellWithIdentifier:kAuthCell];
  
  if (indexPath.section == 0) {
    [authCell prepareAuthCellWithImage:model.image mainTextLabelText:model.title subTextLabelText:model.subTitle fetchingInProgress:model.fetchingInProgress signedIn:model.signedIn];
    return authCell;
  } else {
    [settingsCell prepareSettingsCellWithImage:model.image mainTextLabelText:model.title subTextLabelText:model.subTitle];
    return settingsCell;
  }
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
  SettingsTableViewCellModel *model = self.cellModels[indexPath.section].cellModels[indexPath.row];
  model.handler();
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  if (indexPath.section == 0) {
    return kAuthRowHeight;
  }
  return kSettingsRowHeight;
}

#pragma mark - Observe User state

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      __weak typeof(self) strongSelf = weakSelf;
      BOOL fetched = prevState == UserModelStateFetchingInProgress &&
      currentState == UserModelStateFetched;
      if (fetched && strongSelf.userModel.error != nil) {
        UserFetchErrorViewController *errorViewController = [[UserFetchErrorViewController alloc] initWithController:self.userController model:self.userModel];
        [self.navigationController pushViewController:errorViewController animated:YES];
        return;
      }
      BOOL signedIn = strongSelf.userModel.signedInNoAttributes;
      if (fetched && signedIn) {
        strongSelf.cellModels = configureSignedInTableViewCells(self, NO);
        [strongSelf.tableView reloadData];
        return;
      }
      if (prevState == UserModelStateConfirmCodeInProgress &&
          currentState == UserModelStateSignUpSuccess) {
        strongSelf.cellModels = configureSignedInTableViewCells(self, NO);
        [strongSelf.tableView reloadData];
        [self.navigationController popToRootViewControllerAnimated:YES];
        return;
      }
      if (prevState == UserModelStateSignInInProgress &&
          currentState == UserModelStateSignedIn) {
        strongSelf.cellModels = configureSignedInTableViewCells(self, NO);
        [strongSelf.tableView reloadData];
        return;
      }
      if (prevState == UserModelStatePasswordResetConfirmCodeInProgress &&
          currentState == UserModelStatePasswordResetSuccess) {
        strongSelf.cellModels = configureSignedInTableViewCells(self, NO);
        [strongSelf.tableView reloadData];
        return;
      }
      if (prevState == UserModelStateSignOutInProgress &&
          currentState == UserModelStateFetched) {
        strongSelf.cellModels = configureBaseTableViewCells(self);
        [strongSelf.tableView reloadData];
        return;
      }
      if (prevState == UserModelStateNotFetched && currentState == UserModelStateFetchingInProgress) {
        strongSelf.cellModels = configureTryToSignInTableViewCells(self);
        [strongSelf.tableView reloadData];
        return;
      }
      if (prevState == UserModelStateFetchingInProgress && currentState == UserModelStateFetched) {
        strongSelf.cellModels = configureBaseTableViewCells(self);
        [strongSelf.tableView reloadData];
        return;
      }
      if (prevState == UserModelStateFetchingInProgress && currentState == UserModelStateNotFetched) {
        strongSelf.cellModels = configureBaseTableViewCells(self);
        [strongSelf.tableView reloadData];
        return;
      }
      if (prevState == UserModelStateSignedIn &&
          currentState == UserModelStateSignOutInProgress) {
        strongSelf.cellModels = configureSignedInTableViewCells(self, YES);
        [strongSelf.tableView reloadData];
        [strongSelf.navigationController popToRootViewControllerAnimated:YES];
        return;
      }
    });
  });
}

@end
