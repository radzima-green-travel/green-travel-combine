//
//  AnalyticsTimeTracer.m
//  greenTravel
//
//  Created by Alex K on 8/8/21.
//

#import "AnalyticsTimeTracer.h"
#import "AnalyticsEvents.h"

@interface AnalyticsTimeTracer()

@property(strong, nonatomic) NSString* eventName;
@property(assign, nonatomic) NSTimeInterval startTime;

@end

@implementation AnalyticsTimeTracer

- (instancetype)initWithEventName:(NSString *)eventName
{
  self = [super init];
  if (self) {
    self.eventName = eventName;
  }
  return self;
}

- (void)traceStart {
  self.startTime = [[[NSDate alloc] init] timeIntervalSince1970];
}

- (void)traceEnd {
  NSTimeInterval difference = [[[NSDate alloc] init] timeIntervalSince1970] -
    self.startTime;
  [[AnalyticsEvents get] logEvent:self.eventName withParams:@{
    AnalyticsEventsParamTimeInterval: @(difference)
  }];
}

@end
