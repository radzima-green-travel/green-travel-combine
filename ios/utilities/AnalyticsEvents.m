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

const NSString* AnalyticsEventsVisitSearch = @"home_search_select_event";
const NSString* AnalyticsEventsPressSearchResult = @"home_search_result_event";
