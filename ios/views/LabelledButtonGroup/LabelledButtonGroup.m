//
//  LabelledButtonGroup.m
//  greenTravel
//
//  Created by Alex K on 9.02.22.
//

#import "LabelledButtonGroup.h"
#import "LinkedCategoriesView.h"
#import "IndexModel.h"
#import "DetailsModel.h"
#import "MapModel.h"
#import "LocationModel.h"
#import "CategoryUtils.h"
#import "PlaceItem.h"
#import "PlaceCategory.h"
#import "LabelledButtonGroupTableViewCell.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "TypographyLegacy.h"

@interface LabelledButtonGroup()

@property (strong, nonatomic) NSMutableArray *items;
@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) UILabel *labelView;
@property (strong, nonatomic) Class cellClass;
@property (strong, nonatomic) UITableView *tableView;
@property (copy, nonatomic) UIView*(^viewMaker)(NSObject * _Nonnull);
@property (copy, nonatomic) void(^onPress)(NSObject * _Nonnull);
@property (strong, nonatomic) NSLayoutConstraint *tableViewHeightConstraint;

@end

static NSString * const kButtonCellId = @"buttonCellId";
static NSUInteger kRowHeight = 46.0;

@implementation LabelledButtonGroup


- (instancetype)initWithConfigItems:(NSArray *)items
                              label:(NSString *)label
                          cellClass:(Class)cellClass
                            onPress:(void (^)(NSObject * _Nonnull))onPress {
    self = [super init];
    if (self) {
      self.items = [[NSMutableArray alloc] initWithArray:items];
      self.title = label;
      self.onPress = onPress;
      self.cellClass = cellClass;
      [self setUp];
    }
    return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.backgroundColor = [Colors get].background;
  [self.labelView setTextColor:[Colors get].headlineText];
}

- (void)setUp {
  self.labelView = [[UILabel alloc] init];

  self.labelView.numberOfLines = 2;
  self.labelView.translatesAutoresizingMaskIntoConstraints = NO;
  self.labelView.attributedText = [[TypographyLegacy get] makeTitle1Bold:self.title];

  [self addSubview:self.labelView];

  [NSLayoutConstraint activateConstraints:@[
    [self.labelView.topAnchor constraintEqualToAnchor:self.topAnchor constant:0],
    [self.labelView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:16.0],
    [self.labelView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-25.0],
  ]];

  self.tableView = [[UITableView alloc] init];
  [self.tableView registerClass:self.cellClass
         forCellReuseIdentifier:kButtonCellId];
  self.tableView.delegate = self;
  self.tableView.dataSource = self;
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
  self.tableView.scrollEnabled = NO;
  self.tableView.alwaysBounceVertical = NO;

  self.tableView.translatesAutoresizingMaskIntoConstraints = NO;
  [self addSubview:self.tableView];

  [NSLayoutConstraint activateConstraints:@[
    [self.tableView.topAnchor constraintEqualToAnchor:self.labelView.bottomAnchor constant:18],
    [self.tableView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:0.0],
    [self.tableView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:0.0],
    [self.tableView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor constant:0],
  ]];
}

- (void)update:(NSArray *)items {
  self.items = [[NSMutableArray alloc] initWithArray:items];

  [self.tableView reloadData];

  if ([self.items count] == 0) {
      [self setHidden:YES];
  }

  if (self.tableViewHeightConstraint) {
      [NSLayoutConstraint deactivateConstraints:@[self.tableViewHeightConstraint]];
  }
  self.tableViewHeightConstraint = [self.tableView.heightAnchor constraintEqualToConstant:[self.items count] * kRowHeight];
  [NSLayoutConstraint activateConstraints:@[
      self.tableViewHeightConstraint
  ]];
  [self setNeedsLayout];
  [self layoutIfNeeded];
}

- (void)setHidden:(BOOL)hidden {
    [super setHidden:hidden];
    if (hidden) {
        [NSLayoutConstraint activateConstraints:@[
            [self.heightAnchor constraintEqualToConstant:0.0]
        ]];
    }
}

- (nonnull UITableViewCell *)tableView:(nonnull UITableView *)tableView cellForRowAtIndexPath:(nonnull NSIndexPath *)indexPath {
  NSObject *dataItem = self.items[indexPath.row];
  NSObject *cell = [self.tableView dequeueReusableCellWithIdentifier:kButtonCellId];
  if ([cell respondsToSelector:@selector(update:)]) {
    [cell performSelector:@selector(update:) withObject:dataItem];
  } else {
    NSLog(@"Cell does not support update: from LabelledButtonGroup.");
  }
  return (UITableViewCell *)cell;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return [self.items count];
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  NSObject *dataItem = self.items[indexPath.row];
  self.onPress(dataItem);
  [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
}

- (NSInteger)numberOfSections {
    return 1;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  return kRowHeight;
}

@end
