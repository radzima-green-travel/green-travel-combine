//
//  SettingsViewController.m
//  greenTravel
//
//  Created by Alex K on 25.12.22.
//

#import "SettingsViewController.h"
#import "SettingsModel.h"
#import "SettingsController.h"
#import "SettingsScreen.h"
#import "SettingsGroup.h"
#import "SettingsEntry.h"
#import "SettingsEntryToggle.h"
#import "SettingsEntrySelect.h"
#import "SettingsEntryAction.h"
#import "SettingsEntryNavigate.h"
#import "SettingsEntryAuthLoggedOut.h"
#import "SettingsEntryAuthLoggedIn.h"
#import "SettingsActionTableViewCell.h"
#import "SettingsNavigateTableViewCell.h"
#import "SettingsSelectTableViewCell.h"
#import "SettingsToggleTableViewCell.h"
#import "SettingsBaseTableViewCell.h"
#import "AuthLoggedInTableViewCell.h"
#import "AuthLoggedOutTableViewCell.h"
#import "SettingsBaseTableViewCellConfig.h"
#import "Colors.h"
#import "StyleUtils.h"

@interface SettingsViewController ()

@property (strong, nonatomic) SettingsModel *settingsModel;
@property (strong, nonatomic) SettingsController *settingsController;
@property (strong, nonatomic) SettingsScreen *root;

@end

static const CGFloat kSettingsRowHeight = 44.0;
static const CGFloat kAuthRowHeight = 96.0;
static NSString * const kActionCellId = @"actionCellId";
static NSString * const kToggleCellId = @"toggleCellId";
static NSString * const kSelectCellId = @"selectCellId";
static NSString * const kNavigateCellId = @"navigateCellId";
static NSString * const kBaseCellId = @"baseCellId";
static NSString * const kAuthLoggedOutCellId = @"authLoggedOutCellId";
static NSString * const kAuthLoggedInCellId = @"authLoggedInCellId";

@implementation SettingsViewController

- (instancetype)initWithSettingsController:(SettingsController *)settingsController
                             settingsModel:(SettingsModel *)settingsModel
                         settingsScreen:(SettingsScreen *)settingsScreen {
  if (self = [super init]) {
    _settingsModel = settingsModel;
    _settingsController = settingsController;
    _root = settingsScreen;
  }
  return self;
}

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
  configureNavigationBar(self.navigationController.navigationBar);
  self.view.backgroundColor = [Colors get].backgroundProfileScreen;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  
  if (@available(iOS 13.0, *)) {
    self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleInsetGrouped];
  } else {
    self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleGrouped];
  }
  
  self.tableView.delegate = self;
  self.tableView.dataSource = self;
  [self.tableView registerClass:SettingsActionTableViewCell.self forCellReuseIdentifier:kActionCellId];
  [self.tableView registerClass:SettingsToggleTableViewCell.self forCellReuseIdentifier:kToggleCellId];
  [self.tableView registerClass:SettingsSelectTableViewCell.self forCellReuseIdentifier:kSelectCellId];
  [self.tableView registerClass:SettingsNavigateTableViewCell.self forCellReuseIdentifier:kNavigateCellId];
  [self.tableView registerClass:SettingsBaseTableViewCell.self forCellReuseIdentifier:kBaseCellId];
  
  [self.settingsModel addSettingsModelObserver:self];
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return [self.root.groups[section].entries count];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return [self.root.groups count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  SettingsEntry *entry = self.root.groups[indexPath.section].entries[indexPath.row];
  
  if ([entry isKindOfClass:[SettingsEntryToggle class]]) {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kToggleCellId forIndexPath:indexPath];
    SettingsToggleTableViewCell *cellToggle = (SettingsToggleTableViewCell *) cell;
    SettingsEntryToggle *entryToggle = (SettingsEntryToggle *) entry;
    __weak typeof(self) weakSelf = self;
    [cellToggle update:entry.name enabled:entryToggle.enabled onToggle:^(BOOL enabled) {
      [weakSelf.settingsController interactWithSetting:entry onViewController:weakSelf];
    }];
    return cellToggle;
  }
  if ([entry isKindOfClass:[SettingsEntryAuthLoggedOut class]]) {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kAuthLoggedOutCellId forIndexPath:indexPath];
    return cell;
  }
  if ([entry isKindOfClass:[SettingsEntryAuthLoggedIn class]]) {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kAuthLoggedInCellId forIndexPath:indexPath];
    return cell;
  }
  
  SettingsBaseTableViewCell *baseCell = [tableView dequeueReusableCellWithIdentifier:kBaseCellId forIndexPath:indexPath];
  SettingsBaseTableViewCellConfig *config = [[SettingsBaseTableViewCellConfig alloc] initWithTitle:entry.name
                                                                                  subTitle:entry.value
                                                                                  iconName:entry.iconName
                                                                                  chevron:entry.chevron];
  [baseCell update:config];
  return baseCell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  SettingsEntry *entry = self.root.groups[indexPath.section].entries[indexPath.section];
  if ([entry isKindOfClass:[SettingsEntryAuthLoggedOut class]]) {
    return kAuthRowHeight;
  }
  return kSettingsRowHeight;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
  SettingsEntry *entry = self.root.groups[indexPath.section].entries[indexPath.section];
  if ([entry isKindOfClass:[SettingsEntryToggle class]]) {
    return;
  }
  [self.settingsController interactWithSetting:entry onViewController:self];
}

- (BOOL)tableView:(UITableView *)tableView shouldHighlightRowAtIndexPath:(nonnull NSIndexPath *)indexPath {
  SettingsEntry *entry = self.root.groups[indexPath.section].entries[indexPath.section];
  if ([entry isKindOfClass:[SettingsEntryToggle class]]) {
    return NO;
  }
  return YES;
}

/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    } else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath {
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (void)onSettingsModelEntryChange:(nonnull SettingsEntry *)entry {
  [self.tableView reloadData];
}

- (void)onSettingsModelGroupChange:(nonnull SettingsGroup *)group {
  [self.tableView reloadData];
}

- (void)onSettingsModelTreeChange:(nonnull NSMutableArray<SettingsGroup *> *)tree {
  [self.tableView reloadData];
}

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState
                        toCurrentState:(UserModelState)currentState {
  // Find 4th tab controller in application.
  UITabBarController *tabController = (UITabBarController *)[UIApplication sharedApplication].keyWindow.rootViewController;
  SettingsViewController *settingsViewController = (SettingsViewController *)tabController.viewControllers[3];
  BOOL root = settingsViewController == self;
  
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_UTILITY, 0), ^{
    dispatch_async(dispatch_get_main_queue(), ^{
      __weak typeof(self) strongSelf = weakSelf;
      if (prevState == UserModelStateSignedIn &&
          currentState == UserModelStateSignOutInProgress && !root) {
        [strongSelf.navigationController popToRootViewControllerAnimated:YES];
        return;
      }
    });
  });
}

@end
