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
@property(strong, nonatomic) NSDictionary* params;
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

- (instancetype)initWithEventName:(NSString *)eventName
                       withParams:(NSDictionary *)params {
  self = [self initWithEventName:eventName];
  if (self) {
    self.params = params;
  }
  return self;
}

- (void)traceStart {
  self.startTime = [[[NSDate alloc] init] timeIntervalSince1970];
}

- (void)traceEnd {
  NSTimeInterval difference = floor([[[NSDate alloc] init] timeIntervalSince1970] -
                                    self.startTime);
  NSMutableDictionary *resultParams = [[NSMutableDictionary alloc] init];
  resultParams[AnalyticsEventsParamTimeInterval] = @(difference);
  if (self.params != nil) {
    [self.params enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
      resultParams[key] = obj;
    }];
  }
  [[AnalyticsEvents get] logEvent:self.eventName withParams:resultParams];
}

@end
