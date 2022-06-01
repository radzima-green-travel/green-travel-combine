//
//  DetailsViewController.m
//  GreenTravel
//
//  Created by Alex K on 8/19/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "DetailsViewController.h"
#import "DetailsScreenController.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "StyleUtils.h"
#import "PlaceItem.h"
#import "PlaceCategory.h"
#import "PlaceDetails.h"
#import "ApiService.h"
#import "DetailsModel.h"
#import "LocationModel.h"
#import "MapModel.h"
#import "IndexModel.h"
#import "MapItem.h"
#import "ImageUtils.h"
#import "TextUtils.h"
#import "ItemDetailsMapViewController.h"
#import "LinkedCategoriesView.h"
#import "BannerView.h"
#import "GalleryView.h"
#import "CategoryUtils.h"
#import "TypographyLegacy.h"
#import "Typography.h"
#import "CommonButton.h"
#import "DescriptionView.h"
#import "PlacesViewController.h"
#import "AnalyticsEvents.h"
#import "ScrollViewUtils.h"
#import "AnalyticsUIScrollViewDelegate.h"
#import "AnalyticsTimeTracer.h"
#import "BookmarkButton.h"
#import <SafariServices/SafariServices.h>
#import "NoDataView.h"
#import "LabelledButtonGroup.h"
#import "URLUtils.h"
#import "InformationReference.h"
#import "ReferenceContentTableViewCell.h"
#import "GalleryPageControl.h"

@interface DetailsViewController ()

@property (strong, nonatomic) BannerView *copiedBannerView;
@property (strong, nonatomic) NSLayoutConstraint *copiedBannerViewTopConstraint;
@property (strong, nonatomic) UIView *contentView;
@property (strong, nonatomic) UILabel *titleLabel;
@property (strong, nonatomic) UILabel *addressLabel;
@property (strong, nonatomic) UIButton *bookmarkButton;
@property (strong, nonatomic) UIButton *locationButton;
@property (strong, nonatomic) GalleryView *imageGalleryView;
@property (strong, nonatomic) UIButton *mapButtonTop;
@property (strong, nonatomic) UIButton *mapButtonBottom;
@property (strong, nonatomic) UIButton *linkOfficialSite;

@property (strong, nonatomic) DescriptionView *descriptionTextView;
@property (strong, nonatomic) UIStackView *descriptionPlaceholderView;
@property (strong, nonatomic) UILabel *interestingLabel;
@property (strong, nonatomic) NSMutableDictionary<NSNumber *, LinkedCategoriesView *> *linkedCategoriesTypeToView;
@property (strong, nonatomic) NSLayoutConstraint *linkedCategoriesViewHeightConstraint;
@property (strong, nonatomic) ApiService *apiService;
@property (strong, nonatomic) CoreDataService *coreDataService;
@property (strong, nonatomic) DetailsModel *detailsModel;
@property (strong, nonatomic) MapService *mapService;
@property (strong, nonatomic) NSTimer *bannerHideTimer;
@property (strong, nonatomic) UIViewPropertyAnimator *bannerShowAnimator;
@property (strong, nonatomic) UIViewPropertyAnimator *bannerHideAnimator;

@property (strong, nonatomic) NSLayoutConstraint *descriptionTextTopAnchor;

@property (assign, nonatomic) BOOL ready;
@property (strong, nonatomic) PlaceDetails *itemDetails;
@property (strong, nonatomic) LocationModel *locationModel;
@property (strong, nonatomic) MapModel *mapModel;
@property (strong, nonatomic) IndexModel *indexModel;
@property (strong, nonatomic) SearchModel *searchModel;
@property (assign, nonatomic) BOOL resized;
@property (assign, nonatomic) CGSize screenSize;
@property (strong, nonatomic) AnalyticsUIScrollViewDelegate *analyticsScrollDelegate;
@property (strong, nonatomic) AnalyticsTimeTracer *timeTracer;

@property (assign, nonatomic) CGFloat initialImageHeight;
@property (assign, nonatomic) CGFloat prevContentOffsetY;
@property (strong, nonatomic) UIImageView *currentImageView;

@end

static const CGFloat kDistanceDescriptionToBottom = 26.0;
static const CGFloat kDistanceScreenEdgeToTextContent = 16.0;

@implementation DetailsViewController

- (instancetype)initWithApiService:(ApiService *)apiService
                   coreDataService:(nonnull CoreDataService *)coreDataService
                   mapService:(nonnull MapService *)mapService
                      indexModel:(IndexModel *)indexModel
                          mapModel:(MapModel *)mapModel
                     locationModel:(LocationModel *)locationModel
                     searchModel:(SearchModel *)searchModel
                      detailsModel:(DetailsModel *)detailsModel;
{
    self = [super init];
    if (self) {
        _apiService = apiService;
        _coreDataService = coreDataService;
        _indexModel = indexModel;
        _locationModel = locationModel;
        _searchModel = searchModel;
        _mapModel = mapModel;
        _mapService = mapService;
        _detailsModel = detailsModel;
        _linkedCategoriesTypeToView = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (void)viewWillLayoutSubviews {
  [super viewWillLayoutSubviews];
  [self.descriptionTextView.descriptionTextView setTextColor:[Colors get].mainText];
  [self.titleLabel setTextColor:[Colors get].mainText];
  [self.addressLabel setTextColor:[Colors get].mainText];
  self.descriptionTextView.backgroundColor = [Colors get].background;
  self.view.backgroundColor = [Colors get].background;
  self.dataView.backgroundColor = [Colors get].background;
  self.contentView.backgroundColor = [Colors get].background;
  self.bookmarkButton.tintColor = [Colors get].mainText;
  configureNavigationBar(self.navigationController.navigationBar);
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [ColorsLegacy get].white;
    self.title = self.item.title;

    #pragma mark - Scroll view
    self.dataView = [[UIScrollView alloc] init];
    self.dataView.translatesAutoresizingMaskIntoConstraints = NO;
    self.dataView.alwaysBounceVertical = YES;
    self.dataView.delegate = self;
    [self.view addSubview:self.dataView];

    [NSLayoutConstraint activateConstraints:@[
        [self.dataView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
        [self.dataView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.dataView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        [self.dataView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor]
    ]];

    self.contentView = [[UIView alloc] init];
    self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.dataView addSubview:self.contentView];

    [NSLayoutConstraint activateConstraints:@[
        [self.contentView.topAnchor constraintEqualToAnchor:self.dataView.topAnchor],
        [self.contentView.leadingAnchor constraintEqualToAnchor:self.dataView.leadingAnchor],
        [self.contentView.trailingAnchor constraintEqualToAnchor:self.dataView.trailingAnchor],
        [self.contentView.bottomAnchor constraintEqualToAnchor:self.dataView.bottomAnchor],
        [self.contentView.widthAnchor constraintEqualToAnchor:self.dataView.widthAnchor]
    ]];
    __weak typeof(self) weakSelf = self;
    self.analyticsScrollDelegate = [[AnalyticsUIScrollViewDelegate alloc] initWithOnScrollEnd:^{
      [[AnalyticsEvents get] logEvent:AnalyticsEventsDetailsScrollToEnd withParams:@{
        AnalyticsEventsParamCardName: weakSelf.item.title,
        AnalyticsEventsParamCardCategory: weakSelf.item.category.title,
      }];
    }];

    #pragma mark - Gallery
    self.imageGalleryView = [[GalleryView alloc] initWithFrame:CGRectZero
                                                     imageURLs:@[]
                                                  onPageChange:^{
      [[AnalyticsEvents get] logEvent:AnalyticsEventsGalleryPictureView withParams:@{
        AnalyticsEventsParamCardName: weakSelf.item.title,
        AnalyticsEventsParamCardCategory: weakSelf.item.category.title
      }];
    }];
    self.imageGalleryView.translatesAutoresizingMaskIntoConstraints = NO;
    self.imageGalleryView.layer.masksToBounds = YES;

    [self.contentView addSubview:self.imageGalleryView];

    [NSLayoutConstraint activateConstraints:@[
        [self.imageGalleryView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
        [self.imageGalleryView.topAnchor constraintEqualToAnchor:self.contentView.topAnchor constant:0.0],
        [self.imageGalleryView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
    ]];

    #pragma mark - Bookmark button
    self.bookmarkButton = [[BookmarkButton alloc] initWithFlavor:BookmarkButtonFlavorDetailsScreen onBookmarkPress:^(BOOL selected) {
      [weakSelf onBookmarkButtonPress];
    }];

    self.bookmarkButton.contentMode = UIViewContentModeScaleAspectFill;
    
    [self.bookmarkButton setSelected:self.item.bookmarked];

    self.bookmarkButton.translatesAutoresizingMaskIntoConstraints = NO;

    [self.contentView addSubview:self.bookmarkButton];

    [NSLayoutConstraint activateConstraints:@[
      [self.bookmarkButton.centerYAnchor constraintEqualToAnchor:self.imageGalleryView.pageControl.centerYAnchor],
      [self.bookmarkButton.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-6.0],
      [self.bookmarkButton.widthAnchor constraintEqualToConstant:44.0],
      [self.bookmarkButton.heightAnchor constraintEqualToConstant:44.0],
    ]];

    #pragma mark - Title label
    self.titleLabel = [[UILabel alloc] init];
    self.titleLabel.numberOfLines = 4;
    [self.titleLabel setFont:[UIFont fontWithName:@"Montserrat-Semibold" size:20.0]];
    self.titleLabel.translatesAutoresizingMaskIntoConstraints = NO;

    [self.contentView addSubview:self.titleLabel];

    [NSLayoutConstraint activateConstraints:@[
        [self.titleLabel.topAnchor constraintEqualToAnchor:self.imageGalleryView.bottomAnchor],
        [self.titleLabel.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:16.0],
        [self.titleLabel.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],

    ]];
    #pragma mark - Description text
    self.descriptionTextView = [[DescriptionView alloc] init];
    self.prevLastView = self.descriptionTextView;

    self.descriptionTextView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.contentView addSubview:self.descriptionTextView];

    self.descriptionTextTopAnchor = [self.descriptionTextView.topAnchor constraintEqualToAnchor:self.titleLabel.bottomAnchor constant:20.0];
    NSLayoutConstraint *descriptionTextBottomAnchor = [self.descriptionTextView.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor constant:-19.5];
    [NSLayoutConstraint activateConstraints:@[
        self.descriptionTextTopAnchor,
        [self.descriptionTextView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.descriptionTextView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        descriptionTextBottomAnchor,
    ]];
    self.prevLastViewBottomAnchor = descriptionTextBottomAnchor;
#pragma mark - "Copied" banner
    self.copiedBannerView = [[BannerView alloc] init];
    self.copiedBannerView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.view addSubview:self.copiedBannerView];

    self.copiedBannerViewTopConstraint = [self.copiedBannerView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor constant:-56.0];
    [NSLayoutConstraint activateConstraints:@[
        self.copiedBannerViewTopConstraint,
        [self.copiedBannerView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
        [self.copiedBannerView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
        [self.copiedBannerView.heightAnchor constraintEqualToConstant:56.0]
    ]];

#pragma mark - Add observers
    [self.indexModel addObserver:self];
    [self.indexModel addObserverBookmarks:self];
    [self.detailsModel addObserver:self];

#pragma mark - Load data
    [self.detailsModel loadDetailsByUUID:self.item.uuid];
    self.timeTracer = [[AnalyticsTimeTracer alloc] initWithEventName:
                       AnalyticsEventsLifeTimeDetailsScreen withParams:@{
                         AnalyticsEventsParamCardName: self.item.title,
                         AnalyticsEventsParamCardCategory: self.item.category.title,
    }];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [self.timeTracer traceStart];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  [[AnalyticsEvents get] logEvent:AnalyticsEventsScreenDetails withParams:@{
    AnalyticsEventsParamCardName: self.item.title,
    AnalyticsEventsParamCardCategory: self.item.category.title,
  }];
}

- (void)viewDidDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  [[AnalyticsEvents get] logEvent:AnalyticsEventsDetailsBack withParams:@{
    AnalyticsEventsParamCardName: self.item.title,
    AnalyticsEventsParamCardCategory: self.item.category.title
  }];
#pragma mark - Remove observers
  [self.indexModel removeObserver:self];
  [self.indexModel removeObserverBookmarks:self];
  [self.detailsModel removeObserver:self];
  [self.timeTracer traceEnd];
}

#pragma mark - Address label
- (void)addAddressLabel {
  if (self.addressLabel != nil) {
    return;
  }
  self.addressLabel = [[UILabel alloc] init];
  self.addressLabel.numberOfLines = 4;
  [self.addressLabel setFont:[UIFont fontWithName:@"OpenSans-Regular" size:14.0]];
  self.addressLabel.translatesAutoresizingMaskIntoConstraints = NO;

  [self.contentView addSubview:self.addressLabel];

  [NSLayoutConstraint deactivateConstraints:@[self.descriptionTextTopAnchor]];
  self.descriptionTextTopAnchor = [self.descriptionTextView.topAnchor constraintEqualToAnchor:self.addressLabel.bottomAnchor constant:26.0];

  [NSLayoutConstraint activateConstraints:@[
    self.descriptionTextTopAnchor,
    [self.addressLabel.topAnchor constraintEqualToAnchor:self.titleLabel.bottomAnchor constant:8.0],
    [self.addressLabel.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:16.0],
    [self.addressLabel.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:-16.0],
  ]];
}

#pragma mark - Location button
- (void)addLocationButton {
  if (self.locationButton != nil) {
    return;
  }

  self.locationButton = [[UIButton alloc] init];
  [self.locationButton.titleLabel setFont:[UIFont fontWithName:@"OpenSans-Regular" size:14.0]];

  [self.locationButton addTarget:self action:@selector(onLocationButtonPress:) forControlEvents:UIControlEventTouchUpInside];

  self.locationButton.translatesAutoresizingMaskIntoConstraints = NO;

  [self.contentView addSubview:self.locationButton];

  [NSLayoutConstraint deactivateConstraints:@[self.descriptionTextTopAnchor]];
  self.descriptionTextTopAnchor = [self.descriptionTextView.topAnchor constraintEqualToAnchor:self.locationButton.bottomAnchor constant:26.0];

  [NSLayoutConstraint activateConstraints:@[
    self.descriptionTextTopAnchor,
    [self.locationButton.topAnchor constraintEqualToAnchor:self.addressLabel.bottomAnchor constant:3.0],
    [self.locationButton.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:16.0],
  ]];
}

#pragma mark - Map button top
- (void)addButtonCTA {
  if (self.mapButtonTop != nil) {
    return;
  }
  self.mapButtonTop =
  [[CommonButton alloc] initWithTarget:self
                                action:@selector(onMapButtonPress:)
                                 label:NSLocalizedString(@"DetailsScreenSeeOnMap", "")];
  [self.contentView addSubview:self.mapButtonTop];

  NSLayoutConstraint *mapButtonTopLeading = [self.mapButtonTop.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor constant:16.0];
  NSLayoutConstraint *mapButtonTopTrailing = [self.mapButtonTop.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor constant:-16.0];
  mapButtonTopLeading.priority = UILayoutPriorityDefaultHigh - 1;
  mapButtonTopTrailing.priority = UILayoutPriorityDefaultHigh - 1;

  [NSLayoutConstraint deactivateConstraints:@[self.descriptionTextTopAnchor]];
  self.descriptionTextTopAnchor = [self.descriptionTextView.topAnchor constraintEqualToAnchor:self.mapButtonTop.bottomAnchor constant:26.0];
  [NSLayoutConstraint activateConstraints:@[
    self.descriptionTextTopAnchor,
    [self.mapButtonTop.topAnchor constraintEqualToAnchor:self.locationButton.bottomAnchor constant:20.0],
    [self.mapButtonTop.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
    mapButtonTopLeading,
    mapButtonTopTrailing,
  ]];
}

#pragma mark - Link to official site
- (void)addButtonOfficialSite {
  if (self.linkOfficialSite != nil) {
    return;
  }
  self.linkOfficialSite = [[UIButtonHighlightable alloc] initWithFrame:CGRectZero];

  SEL action = @selector(onWebsiteUnsafeButtonPress:);
  BOOL urlIsSafe = [self.itemDetails.url hasPrefix:@"https://"];

  if (urlIsSafe) {
    action = @selector(onWebsiteButtonPress:);
  }
  [self.linkOfficialSite addTarget:self
                            action:action
                  forControlEvents:UIControlEventTouchUpInside];
  NSAttributedString *label = [[Typography get] mainTextLink:
                                 NSLocalizedString(@"DetailsScreenOfficialSite", @"")];
  [self.linkOfficialSite setAttributedTitle:label
                                   forState:UIControlStateNormal];

  [self.contentView addSubview:self.linkOfficialSite];

  [NSLayoutConstraint deactivateConstraints:@[self.prevLastViewBottomAnchor]];
  self.linkOfficialSite.translatesAutoresizingMaskIntoConstraints = NO;
  NSLayoutConstraint *buttonLeading =
  [self.linkOfficialSite.leadingAnchor constraintEqualToAnchor:self.descriptionTextView.leadingAnchor
                                                      constant:kDistanceScreenEdgeToTextContent];
  NSLayoutConstraint *bottomAnchor =
  [self.linkOfficialSite.bottomAnchor constraintEqualToAnchor:self.contentView.bottomAnchor
                                                     constant:-19.5];
  [NSLayoutConstraint activateConstraints:@[
    [self.prevLastView.bottomAnchor constraintEqualToAnchor:self.linkOfficialSite.topAnchor constant:0.0],
    buttonLeading,
    [self.linkOfficialSite.trailingAnchor
     constraintLessThanOrEqualToAnchor:self.descriptionTextView.trailingAnchor
     constant:-kDistanceScreenEdgeToTextContent],
    bottomAnchor,
  ]];
  if (!urlIsSafe) {
    UIImage *lockSlash;
    if (@available(iOS 13.0, *)) {
      lockSlash = [UIImage systemImageNamed:@"lock.slash"];
    } else {
      lockSlash = [UIImage imageNamed:@"lock.slash"];
    }
    UIImageView *lockSlashView = [[UIImageView alloc] initWithImage:lockSlash];
    [self.contentView addSubview:lockSlashView];
    [NSLayoutConstraint deactivateConstraints:@[buttonLeading]];
    lockSlashView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
      [lockSlashView.leadingAnchor constraintEqualToAnchor:self.descriptionTextView.leadingAnchor
                                                          constant:kDistanceScreenEdgeToTextContent],
      [self.linkOfficialSite.leadingAnchor constraintEqualToAnchor:lockSlashView.trailingAnchor
                                                          constant:5.0],
      [lockSlashView.centerYAnchor constraintEqualToAnchor:self.linkOfficialSite.centerYAnchor],
      [lockSlashView.heightAnchor constraintEqualToConstant:20.0],
      [lockSlashView.widthAnchor constraintEqualToConstant:20.0],
    ]];
  }
  self.prevLastViewBottomAnchor = bottomAnchor;
  self.prevLastView = self.linkOfficialSite;
}

#pragma mark - References
- (void)addReferencesView {
  if (self.referencesView != nil) {
    return;
  }
  __weak typeof(self) weakSelf = self;
  self.referencesView =
  [[LabelledButtonGroup alloc] initWithConfigItems:self.item.details.references
                                             label:NSLocalizedString(@"DetailsScreenReferences", @"")
                                         cellClass:ReferenceContentTableViewCell.class
                                           onPress:^(NSObject * _Nonnull obj) {
    InformationReference *reference = (InformationReference *) obj;
    openURL(weakSelf, reference.url);
  }];

  [self.contentView addSubview:self.referencesView];

  self.referencesView.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint deactivateConstraints:@[self.prevLastViewBottomAnchor]];

  self.prevLastViewBottomAnchor =
  [self.referencesView.bottomAnchor
   constraintEqualToAnchor:self.contentView.bottomAnchor constant:-19.5];
  [NSLayoutConstraint activateConstraints:@[
      [self.prevLastView.bottomAnchor constraintEqualToAnchor:self.referencesView.topAnchor constant:-32.0],
      [self.referencesView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:0],
      [self.referencesView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:0],
      self.prevLastViewBottomAnchor,
  ]];
  self.prevLastView = self.referencesView;
}

#pragma mark - Linked categories view
- (void)addLinkedCategoriesView:(LinkedCategoriesViewType)type {
  if (self.linkedCategoriesTypeToView[@(type)] != nil) {
    return;
  }

  LinkedCategoriesView *linkedCategoriesView =
  [[LinkedCategoriesView alloc] initWithIndexModel:self.indexModel
                                             title:[self linkedCategoriesLabelByType:type]
                              onCategoryLinkSelect:^(PlaceCategory * _Nonnull category, NSOrderedSet<NSString *> * _Nonnull linkedItems) {
    PlacesViewController *placesViewController =
    [[PlacesViewController alloc] initWithIndexModel:self.indexModel
                                          apiService:self.apiService
                                     coreDataService:self.coreDataService
                                          mapService:self.mapService
                                            mapModel:self.mapModel
                                       locationModel:self.locationModel
                                         searchModel:self.searchModel
                                        detailsModel:self.detailsModel
                                          bookmarked:NO
                                    allowedItemUUIDs:linkedItems];
    placesViewController.category = category;
    [self.navigationController pushViewController:placesViewController animated:YES];
  }];

  [self.contentView addSubview:linkedCategoriesView];

  linkedCategoriesView.translatesAutoresizingMaskIntoConstraints = NO;

  [NSLayoutConstraint deactivateConstraints:@[self.prevLastViewBottomAnchor]];

  self.prevLastViewBottomAnchor =
  [linkedCategoriesView.bottomAnchor
   constraintEqualToAnchor:self.contentView.bottomAnchor constant:-19.5];
  [NSLayoutConstraint activateConstraints:@[
      [self.prevLastView.bottomAnchor constraintEqualToAnchor:linkedCategoriesView.topAnchor constant:-32.0],
      [linkedCategoriesView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor constant:0],
      [linkedCategoriesView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor constant:0],
      self.prevLastViewBottomAnchor,
  ]];
  self.prevLastView = linkedCategoriesView;
  self.linkedCategoriesTypeToView[@(type)] = linkedCategoriesView;
}

- (NSString *)linkedCategoriesLabelByType:(LinkedCategoriesViewType)linkedCategoriesViewType {
  switch (linkedCategoriesViewType) {
    case LinkedCategoriesViewTypeCategories:
      return NSLocalizedString(@"DetailsScreenActivities", @"");
    case LinkedCategoriesViewTypeBelongsTo:
      return NSLocalizedString(@"DetailsScreenBelongsTo", @"");
  }
}

#pragma mark - Update content
- (void)updateMainContent:(PlaceDetails *)details {
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_DEFAULT, 0), ^{
    NSAttributedString *html =
    loadDetailsTemplate(details.descriptionHTML);
    dispatch_async(dispatch_get_main_queue(), ^{
      weakSelf.titleLabel.attributedText = [[TypographyLegacy get] makeTitle1Semibold:weakSelf.item.title];
      if (details.address && [details.address length]) {
        [weakSelf addAddressLabel];
        weakSelf.addressLabel.attributedText = [[TypographyLegacy get] makeSubtitle3Regular:details.address];
          NSString * kilometers = NSLocalizedString(@"Kilometers", "");
    if (details.length.description) {
      weakSelf.addressLabel.attributedText = [[TypographyLegacy get] makeSubtitle3Regular:[NSString stringWithFormat:@"%.2f %@, %@", details.length.doubleValue, kilometers, details.address]];
        }
      }
      if (CLLocationCoordinate2DIsValid(weakSelf.item.coords)) {
        [weakSelf addLocationButton];
        [weakSelf.locationButton setAttributedTitle:
         [[TypographyLegacy get] makeSubtitle3Regular:[NSString stringWithFormat:@"%f° N, %f° E", weakSelf.item.coords.latitude, weakSelf.item.coords.longitude] color:[ColorsLegacy get].royalBlue]
                                           forState:UIControlStateNormal];
        [weakSelf addButtonCTA];
      }
      [weakSelf.descriptionTextView update:html showPlaceholder:[details.descriptionHTML length] == 0];
      if (details.url && [details.url length]) {
         [weakSelf addButtonOfficialSite];
      }
      if ([details.references count]) {
        [weakSelf addReferencesView];
        [weakSelf.referencesView update:details.references];
      }
      if ([details.categoryIdToItems count]) {
        [weakSelf addLinkedCategoriesView:LinkedCategoriesViewTypeCategories];
        [weakSelf.linkedCategoriesTypeToView[@(LinkedCategoriesViewTypeCategories)]
         update:details.categoryIdToItems];
      }
      if ([details.categoryIdToItemsBelongsTo count]) {
        [weakSelf addLinkedCategoriesView:LinkedCategoriesViewTypeBelongsTo];
        [weakSelf.linkedCategoriesTypeToView[@(LinkedCategoriesViewTypeBelongsTo)]
         update:details.categoryIdToItemsBelongsTo];
      }
      [self setUpWithDataView];
    });
  });
}

- (void)updateDetails:(PlaceDetails *)details {
  __weak typeof(self) weakSelf = self;
  self.itemDetails = details;
  [self updateMainContent:details];
  dispatch_async(dispatch_get_main_queue(), ^{
    [weakSelf.imageGalleryView setUpWithPictureURLs:details.images];
  });
}

#pragma mark - Observers
- (void)onBookmarkUpdate:(PlaceItem *)item bookmark:(BOOL)bookmark {
    if ([self.item.uuid isEqualToString:item.uuid]) {
        [self.bookmarkButton setSelected:bookmark];
    }
}

- (void)onCategoriesUpdate:(nonnull NSArray<PlaceCategory *> *)categories {
    NSString *itemUUID = self.item.uuid;
    __weak typeof(self) weakSelf = self;
    traverseCategories(categories, ^(PlaceCategory *newCategory, PlaceItem *newItem) {
        if ([newItem.uuid isEqualToString:itemUUID]) {
            weakSelf.item = newItem;
        }
    });
}

- (void)onCategoriesLoading:(BOOL)loading {}

- (void)onCategoriesNewDataAvailable {}

- (void)onDetailsUpdate:(NSMutableDictionary<NSString *,PlaceDetails *> *)itemUUIDToDetails
       itemUUIDToStatus:(NSMutableDictionary<NSString *,NSNumber *> *)itemUUIDToStatus {
  PlaceDetails *details = itemUUIDToDetails[self.item.uuid];
  DetailsLoadState status = [itemUUIDToStatus[self.item.uuid] intValue];
  dispatch_async(dispatch_get_main_queue(), ^{
    switch (status) {
      case DetailsLoadStateFailure:
        [self setUpWithNoDataPlaceholder];
        return;
      case DetailsLoadStateInitial:
      case DetailsLoadStateProgress:
        [self setUpWithActivityIndicator];
        return;
      case DetailsLoadStateSuccess:
        [self updateDetails:details];
        return;
    }
  });
}

- (void)onRetry {
  [self.indexModel retryCategories];
  [self.detailsModel loadDetailsByUUID:self.item.uuid];
}

#pragma mark - onMapButtonPress
- (void)onMapButtonPress:(id)sender {
    MapItem *mapItem = [[MapItem alloc] init];
    mapItem.title = self.item.title;
    mapItem.uuid = self.item.uuid;
    mapItem.correspondingPlaceItem = self.item;
    mapItem.coords = self.item.coords;
    ItemDetailsMapViewController *mapViewController =
    [[ItemDetailsMapViewController alloc] initWithMapModel:self.mapModel
                                             locationModel:self.locationModel
                                                indexModel:self.indexModel
                                               searchModel:self.searchModel
                                               detailsModel:self.detailsModel
                                                apiService:self.apiService
                                           coreDataService:self.coreDataService
                                                mapService:self.mapService
                                                   mapItem:mapItem
                                               itemDetails:self.itemDetails];
    [self.navigationController pushViewController:mapViewController animated:YES];
    [[AnalyticsEvents get] logEvent:AnalyticsEventsDetailsOpenMap withParams:@{
      AnalyticsEventsParamCardName: self.item.title,
      AnalyticsEventsParamCardCategory: self.item.category.title
    }];
}

#pragma mark - Website press actions
- (void)onWebsiteButtonPress:(id)sender {
  NSURL *url = [NSURL URLWithString:self.itemDetails.url];
  SFSafariViewController *safariViewController = [[SFSafariViewController alloc] initWithURL:url];
  [self presentViewController:safariViewController animated:YES completion:^{}];
}

- (void)onWebsiteUnsafeButtonPress:(id)sender {
  NSURL *url = [NSURL URLWithString:self.itemDetails.url];
  [UIApplication.sharedApplication openURL:url options:@{}
                         completionHandler:^(BOOL success) {}];
}

- (void)onLocationButtonPress:(id)sender {
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    NSString *coordsText = [NSString stringWithFormat:@"%f,%f", self.item.coords.latitude, self.item.coords.longitude];
    pasteboard.string = coordsText;

    [self cancelBanner];

    __weak typeof(self) weakSelf = self;
    self.bannerShowAnimator = [[UIViewPropertyAnimator alloc] initWithDuration:0.4 curve:UIViewAnimationCurveEaseIn animations:^{
        weakSelf.copiedBannerViewTopConstraint.constant = 0;
        [weakSelf.view layoutIfNeeded];
    }];
    [self.bannerShowAnimator startAnimation];
    self.bannerHideTimer =
    [NSTimer scheduledTimerWithTimeInterval:5.4
                                     target:self
                                   selector:@selector(onBannerTimerFire:)
                                   userInfo:nil
                                    repeats:NO];
}

- (void)cancelBanner {
    [self.bannerShowAnimator stopAnimation:YES];
    self.bannerShowAnimator = nil;
    //[self.bannerHideAnimator stopAnimation:YES];
    //self.bannerHideAnimator = nil;
    [self.bannerHideTimer invalidate];
    self.bannerHideTimer = nil;
    self.copiedBannerViewTopConstraint.constant = -44.0;
    [self.view layoutIfNeeded];
}

- (void)onBannerTimerFire:(id)sender {
    NSLog(@"Timer fired.");
    [self.bannerHideTimer invalidate];
    self.bannerHideTimer = nil;
    [self.view layoutIfNeeded];

    __weak typeof(self) weakSelf = self;
    self.bannerHideAnimator = [[UIViewPropertyAnimator alloc] initWithDuration:0.4 curve:UIViewAnimationCurveEaseIn animations:^{
        weakSelf.copiedBannerViewTopConstraint.constant = -56.0;
        [weakSelf.view layoutIfNeeded];
    }];
    [self.bannerHideAnimator startAnimation];
}

#pragma mark onBookmarkButtonPress
- (void)onBookmarkButtonPress {
  BOOL bookmark = !self.item.bookmarked;
  [self.indexModel bookmarkItem:self.item bookmark:bookmark];
  [[AnalyticsEvents get] logEvent:bookmark ? AnalyticsEventsDetailsSave : AnalyticsEventsDetailsUnsave
                       withParams:@{
                         AnalyticsEventsParamCardName: self.item.title,
                         AnalyticsEventsParamCardCategory: self.item.category.title
                       }];
}

#pragma mark - Resize
- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
    [self.imageGalleryView setNeedsLayout];
    [self.imageGalleryView layoutIfNeeded];
    [self.imageGalleryView.collectionView reloadData];
    CGPoint pointToScrollTo = CGPointMake(self.imageGalleryView.indexOfScrolledItem * size.width, 0);
    [self.imageGalleryView.collectionView setContentOffset:pointToScrollTo animated:YES];
    [self.imageGalleryView toggleSkipAnimation];
}

#pragma mark - UIScrollViewDelegate
- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
  CGFloat prevContentOffsetY = self.prevContentOffsetY;
  CGFloat contentOffsetY = self.dataView.contentOffset.y;
  self.prevContentOffsetY = contentOffsetY;
  
  [self.analyticsScrollDelegate scrollViewDidScroll:scrollView];
  if (contentOffsetY < 0) {
    [self addElasticImage];
    CGFloat scale = (self.initialImageHeight + fabs(contentOffsetY)) / self.initialImageHeight;
    CGAffineTransform scaleTransform = CGAffineTransformScale(CGAffineTransformIdentity, scale, scale);
    CGAffineTransform translateTransform = CGAffineTransformTranslate(CGAffineTransformIdentity, 0, contentOffsetY);
    CGAffineTransform concatedTransform = CGAffineTransformConcat(scaleTransform, translateTransform);
    [self.currentImageView setTransform:concatedTransform];
    return;
  }
  
  [self removeElasticImage];
}

- (void)addElasticImage {
  if (self.currentImageView != nil) {
    return;
  }
  
  UIImageView *currentImageView = [self.imageGalleryView getCurrentImageView];
  self.currentImageView = [[UIImageView alloc] initWithImage:currentImageView.image];
  self.currentImageView.contentMode = UIViewContentModeScaleAspectFill;
  self.initialImageHeight = currentImageView.frame.size.height;
  
  [self.currentImageView setFrame:CGRectMake(0, -currentImageView.frame.size.height / 2, currentImageView.frame.size.width, currentImageView.frame.size.height)];
  
  [self.dataView addSubview:self.currentImageView];
  
  self.currentImageView.layer.masksToBounds = YES;
  self.currentImageView.layer.anchorPoint = CGPointMake(0.5, 0.0);
}

- (void)removeElasticImage {
  [self.currentImageView removeFromSuperview];
  self.currentImageView = nil;
}

@end
