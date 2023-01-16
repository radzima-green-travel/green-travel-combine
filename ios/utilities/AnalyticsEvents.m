//
//  AnalyticsEvents.m
//  GreenTravel
//
//  Created by Alex K on 2/2/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "AnalyticsEvents.h"
@import Amplitude;


@interface AnalyticsEvents()

@property(strong, nonatomic) NSMutableDictionary *events;

@end

@implementation AnalyticsEvents

static AnalyticsEvents *instance;

- (instancetype)init
{
  self = [super init];
  if (self) {
    
  }
  return self;
}

- (void)logEvent:(NSString  * _Nonnull)event {
  [[Amplitude instance] logEvent:event];
}

- (void)logEvent:(NSString  * _Nonnull)event withParams:(NSDictionary *)params {
  [[Amplitude instance] logEvent:event withEventProperties:params];
}

+ (instancetype)get {
  if (instance) {
    return instance;
  }
  instance = [[AnalyticsEvents alloc] init];
  return instance;
}

@end

NSString * const AnalyticsEventsUserPropertyFramework = @"user_property_framework";

NSString * const AnalyticsEventsNaviMain = @"navi_home_event";
NSString * const AnalyticsEventsNaviMap = @"navi_map_event";
NSString * const AnalyticsEventsNaviBookmarks = @"navi_bookmarks_event";
NSString * const AnalyticsEventsNaviProfile = @"navi_profile_event";

NSString * const AnalyticsEventsScreenHome = @"view_home_event";
NSString * const AnalyticsEventsScreenBookmarks = @"view_bookmarks_event";
NSString * const AnalyticsEventsScreenMapFull = @"view_map_event";
NSString * const AnalyticsEventsScreenDetails = @"view_details_event";
NSString * const AnalyticsEventsScreenMapItem = @"screen_map_feed_event";
NSString * const AnalyticsEventsParamCardName = @"param_card_name";
NSString * const AnalyticsEventsParamCardCategory = @"param_card_category";

NSString * const AnalyticsEventsPressCard = @"home_card_event";
NSString * const AnalyticsEventsSaveCard = @"home_save_card_event";
NSString * const AnalyticsEventsUnsaveCard = @"home_unsave_card_event";
NSString * const AnalyticsEventsSeeAll = @"home_see_all_event";

NSString * const AnalyticsEventsPressSavedCategory = @"saved_category_event";
NSString * const AnalyticsEventsPressCardSaved = @"saved_card_event";
NSString * const AnalyticsEventsParamCategoryName = @"param_category_name";

NSString * const AnalyticsEventsSearchType = @"home_search_result_event";
NSString * const AnalyticsEventsPressSearchResult = @"home_search_select_event";
NSString * const AnalyticsEventsParamSearchQuery=@"param_search_query";

NSString * const AnalyticsEventsTimeSpentInActiveState = @"time_active_event";

NSString * const AnalyticsEventsDetailsSave = @"card_details_save_event";
NSString * const AnalyticsEventsDetailsUnsave = @"card_details_unsave_event";
NSString * const AnalyticsEventsDetailsOpenMap = @"card_details_map_event";
NSString * const AnalyticsEventsDetailsScrollToEnd = @"card_details_scroll";
NSString * const AnalyticsEventsPressCoords = @"card_details_coordinates_event";
NSString * const AnalyticsEventsDetailsBack = @"card_details_close_event";
NSString * const AnalyticsEventsParamLinkType = @"param_link_type";
 
NSString * const AnalyticsEventsMapFilterAll = @"map_all_event";
NSString * const AnalyticsEventsMapFilterTerritories = @"map_terr_event";
NSString * const AnalyticsEventsMapFilterArchitecture = @"map_arch_event";
NSString * const AnalyticsEventsMapFilterReligion = @"map_religion_event";
NSString * const AnalyticsEventsMapFilterNature = @"map_nature_event";
NSString * const AnalyticsEventsMapFilterMuseums = @"map_museums_event";
NSString * const AnalyticsEventsMapFilterWarMemorials = @"map_war_memorials_event";
NSString * const AnalyticsEventsMapFilterOther = @"map_other_event";
NSString * const AnalyticsEventsMapFilterFoot = @"map_foot_event";
NSString * const AnalyticsEventsMapFilterBike = @"map_velo_event";
NSString * const AnalyticsEventsMapFilterWater = @"map_water_event";

NSString * const AnalyticsEventsMapSearch = @"map_search_event";
NSString * const AnalyticsEventsMapInteraction = @"map_point_interaction_event";
NSString * const AnalyticsEventsParamMapInteractionSave = @"param_save";
NSString * const AnalyticsEventsParamMapInteractionLearnMore = @"param_learn_more";
NSString * const AnalyticsEventsMapSearchType = @"map_search_result_event";
NSString * const AnalyticsEventsMapPressSearchResult = @"map_search_select_event";
NSString * const AnalyticsEventsParamMapFilterCheck = @"param_map_filter_check";

NSString * const AnalyticsEventsLifeTimeHomeScreen = @"home_lifetime";
NSString * const AnalyticsEventsLifeTimeDetailsScreen = @"card_details_lifetime";
NSString * const AnalyticsEventsLifeTimeFullMapScreen = @"map_lifetime";

NSString * const AnalyticsEventsParamTimeInterval = @"param_time_interval";

NSString * const AnalyticsEventsGalleryPictureView = @"card_details_switch_photo";
