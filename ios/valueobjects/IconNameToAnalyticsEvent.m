//
//  IconNameToImageNameMap.m
//  GreenTravel
//
//  Created by Alex K on 2/2/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "IconNameToAnalyticsEvent.h"
#import <UIKit/UIKit.h>
#import "AnalyticsEvents.h"

@interface IconNameToAnalyticsEvent()

@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *iconNameToAnalyticsEvent;

@end

@implementation IconNameToAnalyticsEvent

static IconNameToAnalyticsEvent *instance;

- (instancetype)init
{
  self = [super init];
  if (self) {
    _iconNameToAnalyticsEvent = @{
      @"historical-place": AnalyticsEventsMapFilterReligion,
      @"war-monuments": AnalyticsEventsMapFilterWarMemorials,
      @"museums": AnalyticsEventsMapFilterMuseums,
      @"castles": AnalyticsEventsMapFilterArchitecture,
      @"nature-monuments":AnalyticsEventsMapFilterNature,
      @"other-monuments": AnalyticsEventsMapFilterOther,
      @"walking-routes": AnalyticsEventsMapFilterFoot,
      @"object": AnalyticsEventsMapFilterTerritories,
      @"bicycle-route": AnalyticsEventsMapFilterBike,
      @"water-route": AnalyticsEventsMapFilterWater,
    };
  }
  return self;
}

- (NSString *)analyticsEventForIconName:(NSString *)name {
  if (!self.iconNameToAnalyticsEvent[name]) {
    return nil;
  }
  NSString *analyticsEvent = self.iconNameToAnalyticsEvent[name];
  return analyticsEvent;
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[IconNameToAnalyticsEvent alloc] init];
    return instance;
}

@end
