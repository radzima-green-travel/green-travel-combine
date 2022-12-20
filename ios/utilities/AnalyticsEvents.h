//
//  AnalyticsEvents.h
//  greenTravel
//
//  Created by Alex K on 7/18/21.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface AnalyticsEvents : NSObject

+ (instancetype)get;
- (void)logEvent:(NSString *)event;
- (void)logEvent:(NSString  * _Nonnull)event withParams:(NSDictionary *)params;

@end

FOUNDATION_EXPORT NSString * const AnalyticsEventsUserPropertyFramework;

FOUNDATION_EXPORT NSString * const AnalyticsEventsNaviMain;
FOUNDATION_EXPORT NSString * const AnalyticsEventsNaviMap;
FOUNDATION_EXPORT NSString * const AnalyticsEventsNaviBookmarks;

FOUNDATION_EXPORT NSString * const AnalyticsEventsScreenHome;
FOUNDATION_EXPORT NSString * const AnalyticsEventsScreenMapItem;
FOUNDATION_EXPORT NSString * const AnalyticsEventsScreenBookmarks;
FOUNDATION_EXPORT NSString * const AnalyticsEventsScreenMapFull;
FOUNDATION_EXPORT NSString * const AnalyticsEventsScreenDetails;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamCardName;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamCardCategory;

FOUNDATION_EXPORT NSString * const AnalyticsEventsPressCard;
FOUNDATION_EXPORT NSString * const AnalyticsEventsSaveCard;
FOUNDATION_EXPORT NSString * const AnalyticsEventsUnsaveCard;
FOUNDATION_EXPORT NSString * const AnalyticsEventsSeeAll;

FOUNDATION_EXPORT NSString * const AnalyticsEventsPressSavedCategory;
FOUNDATION_EXPORT NSString * const AnalyticsEventsPressCardSaved;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamCategoryName;

FOUNDATION_EXPORT NSString * const AnalyticsEventsSearchType;
FOUNDATION_EXPORT NSString * const AnalyticsEventsPressSearchResult;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamSearchQuery;

FOUNDATION_EXPORT NSString * const AnalyticsEventsTimeSpentInActiveState;

FOUNDATION_EXPORT NSString * const AnalyticsEventsDetailsSave;
FOUNDATION_EXPORT NSString * const AnalyticsEventsDetailsUnsave;
FOUNDATION_EXPORT NSString * const AnalyticsEventsDetailsOpenMap;
FOUNDATION_EXPORT NSString * const AnalyticsEventsDetailsScrollToEnd;
FOUNDATION_EXPORT NSString * const AnalyticsEventsPressCoords;
FOUNDATION_EXPORT NSString * const AnalyticsEventsDetailsBack;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamLinkType;

FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterAll;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterTerritories;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterArchitecture;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterReligion;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterNature;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterMuseums;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterWarMemorials;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterOther;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterFoot;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterBike;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapFilterWater;

FOUNDATION_EXPORT NSString * const AnalyticsEventsMapSearch;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapInteraction;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamMapInteractionSave;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamMapInteractionLearnMore;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapSearchType;
FOUNDATION_EXPORT NSString * const AnalyticsEventsMapPressSearchResult;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamMapFilterCheck;

FOUNDATION_EXPORT NSString * const AnalyticsEventsLifeTimeHomeScreen;
FOUNDATION_EXPORT NSString * const AnalyticsEventsLifeTimeDetailsScreen;
FOUNDATION_EXPORT NSString * const AnalyticsEventsLifeTimeFullMapScreen;
FOUNDATION_EXPORT NSString * const AnalyticsEventsParamTimeInterval;

FOUNDATION_EXPORT NSString * const AnalyticsEventsGalleryPictureView;

NS_ASSUME_NONNULL_END
