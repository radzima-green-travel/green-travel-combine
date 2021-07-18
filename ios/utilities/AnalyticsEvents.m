//
//  IconNameToImageNameMap.m
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
