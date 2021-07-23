//
//  AnalyticsEvents.h
//  greenTravel
//
//  Created by Alex K on 7/18/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface AnalyticsEvents : NSObject

+ (instancetype)get;
- (void)logEvent:(NSString *)event;
- (void)logEvent:(NSString  * _Nonnull)event withParams:(NSDictionary *)params;

@end

FOUNDATION_EXPORT const NSString* AnalyticsEventsNaviMain;
FOUNDATION_EXPORT const NSString* AnalyticsEventsNaviMap;
FOUNDATION_EXPORT const NSString* AnalyticsEventsNaviBookmarks;

FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenHome;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenMapItem;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenBookmarks;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenMapFull;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenDetails;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamCardName;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamCardCategory;

FOUNDATION_EXPORT const NSString* AnalyticsEventsPressCard;
FOUNDATION_EXPORT const NSString* AnalyticsEventsSaveCard;
FOUNDATION_EXPORT const NSString* AnalyticsEventsUnsaveCard;
FOUNDATION_EXPORT const NSString* AnalyticsEventsSeeAll;

FOUNDATION_EXPORT const NSString* AnalyticsEventsPressBookmarkedCard;

FOUNDATION_EXPORT const NSString* AnalyticsEventsSearchType;
FOUNDATION_EXPORT const NSString* AnalyticsEventsPressSearchResult;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamSearchQuery;

FOUNDATION_EXPORT const NSString* AnalyticsEventsTimeSpentInActiveState;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamFramework;

FOUNDATION_EXPORT const NSString* AnalyticsEventsDetailsSave;
FOUNDATION_EXPORT const NSString* AnalyticsEventsDetailsUnsave;
FOUNDATION_EXPORT const NSString* AnalyticsEventsDetailsOpenMap;
FOUNDATION_EXPORT const NSString* AnalyticsEventsPressCoords;
FOUNDATION_EXPORT const NSString* AnalyticsEventsDetailsBack;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamLinkType;

FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterAll;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterTerritories;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterArchitecture;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterReligion;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterNature;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterMuseums;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterWarMemorials;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterOther;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterFoot;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterBike;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapFilterWater;

FOUNDATION_EXPORT const NSString* AnalyticsEventsMapSearch;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapInteraction;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamMapInteractionSave;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamMapInteractionLearnMore;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapSearchType;
FOUNDATION_EXPORT const NSString* AnalyticsEventsMapPressSearchResult;
FOUNDATION_EXPORT const NSString* AnalyticsEventsParamMapFilterCheck;


NS_ASSUME_NONNULL_END
