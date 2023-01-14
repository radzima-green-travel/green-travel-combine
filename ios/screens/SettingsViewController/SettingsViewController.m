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
#import "SettingsActionTableViewCell.h"
#import "SettingsNavigateTableViewCell.h"
#import "SettingsSelectTableViewCell.h"
#import "SettingsToggleTableViewCell.h"

@interface SettingsViewController ()

@property (strong, nonatomic) SettingsModel *settingsModel;
@property (strong, nonatomic) SettingsController *settingsController;
@property (strong, nonatomic) SettingsScreen *root;

@end

static const NSString * kActionCellId = @"actionCellId";
static const NSString * kToggleCellId = @"toggleCellId";
static const NSString * kSelectCellId = @"selectCellId";
static const NSString * kNavigateCellId = @"navigateCellId";

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

- (void)viewDidLoad {
  [super viewDidLoad];
  
  [self.tableView registerClass:SettingsActionTableViewCell.self forCellReuseIdentifier:kActionCellId];
  [self.tableView registerClass:SettingsToggleTableViewCell.self forCellReuseIdentifier:kToggleCellId];
  [self.tableView registerClass:SettingsSelectTableViewCell.self forCellReuseIdentifier:kSelectCellId];
  [self.tableView registerClass:SettingsNavigateTableViewCell.self forCellReuseIdentifier:kNavigateCellId];
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
    return (SettingsToggleTableViewCell *) cell;
  }
  if ([entry isKindOfClass:[SettingsEntryAction class]]) {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kActionCellId forIndexPath:indexPath];
    return (SettingsActionTableViewCell *) cell;
  }
  if ([entry isKindOfClass:[SettingsEntryNavigate class]]) {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kNavigateCellId forIndexPath:indexPath];
    return (SettingsNavigateTableViewCell *) cell;
  }
  
  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kSelectCellId forIndexPath:indexPath];
  return (SettingsSelectTableViewCell *) cell;
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

@end
