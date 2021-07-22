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

const NSString* AnalyticsEventsNaviMain = @"navi_home_event";
const NSString* AnalyticsEventsNaviMap = @"navi_map_event";
const NSString* AnalyticsEventsNaviBookmarks = @"navi_bookmarks_event";

const NSString* AnalyticsEventsScreenHome = @"screen_home_feed_event";
const NSString* AnalyticsEventsScreenMapItem = @"screen_map_feed_event";
const NSString* AnalyticsEventsScreenBookmarks = @"screen_bookmarks_feed_event";
const NSString* AnalyticsEventsScreenMapFull = @"screen_map_all_event";
const NSString* AnalyticsEventsScreenDetails = @"screen_details_event";
const NSString* AnalyticsEventsParamCardName = @"param_card_name";
const NSString* AnalyticsEventsParamCardCategory = @"param_card_category";

const NSString* AnalyticsEventsPressCard = @"home_feed_card_event";
const NSString* AnalyticsEventsSaveCard = @"home_feed_save_card_event";
const NSString* AnalyticsEventsUnsaveCard = @"home_feed_unsave_card_event";
const NSString* AnalyticsEventsSeeAll = @"home_feed_see_all_event";

const NSString* AnalyticsEventsPressBookmarkedCard = @"saved_category_event";

const NSString* AnalyticsEventsSearchType = @"home_search_result_event";
const NSString* AnalyticsEventsPressSearchResult = @"home_search_select_event";
const NSString* AnalyticsEventsParamSearchQuery=@"param_search_query";

const NSString* AnalyticsEventsTimeSpentInActiveState = @"time_active_event";
const NSString* AnalyticsEventsParamFramework = @"param_framework";

const NSString* AnalyticsEventsDetailsSave = @"card_details_save_event";
const NSString* AnalyticsEventsDetailsUnsave = @"card_details_unsave_event";
const NSString* AnalyticsEventsDetailsOpenMap = @"card_details_open_in_map_event";
const NSString* AnalyticsEventsPressCoords = @"card_details_coordinates_event";
const NSString* AnalyticsEventsDetailsBack = @"card_details_close_event";
const NSString* AnalyticsEventsParamLinkType = @"param_link_type";

const NSString* AnalyticsEventsMapFilterAll = @"map_all_event";
const NSString* AnalyticsEventsMapFilterTerritories = @"map_terr_event";
const NSString* AnalyticsEventsMapFilterArchitecture = @"map_arch_event";
const NSString* AnalyticsEventsMapFilterReligion = @"map_religion_event";
const NSString* AnalyticsEventsMapFilterNature = @"map_nature_event";
const NSString* AnalyticsEventsMapFilterMuseums = @"map_museums_event";
const NSString* AnalyticsEventsMapFilterWarMemorials = @"map_war_memorials_event";
const NSString* AnalyticsEventsMapFilterOther = @"map_other_event";
const NSString* AnalyticsEventsMapFilterFoot = @"map_foot_event";
const NSString* AnalyticsEventsMapFilterBike = @"map_velo_event";
const NSString* AnalyticsEventsMapFilterWater = @"map_water_event";

const NSString* AnalyticsEventsMapSearch = @"map_search_event";
const NSString* AnalyticsEventsMapInteraction = @"map_point_interaction_event";
const NSString* AnalyticsEventsMapSearchType = @"map_search_result_event";
const NSString* AnalyticsEventsMapPressSearchResult = @"map_search_select_event";
