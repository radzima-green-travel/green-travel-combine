//
//  DeveloperSettinsTapObserver.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 14.11.22.
//

#import "DeveloperSettinsTapObserver.h"

@interface DeveloperSettinsTapObserver ()

@property (assign, nonatomic) double time;

@end

@implementation DeveloperSettinsTapObserver

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.time = 5.0;
    self.tapCount = 1;
    [self timerFired];
  }
  return self;
}

-(void)timerFired {
  if (self.timer == nil) {
    self.timer = [NSTimer scheduledTimerWithTimeInterval: 0.1
                                                  target:self
                                                selector:@selector(timerFired)
                                                userInfo:nil repeats:YES];
  }
  if (self.time > 0) {
    self.time -= 0.1;
  }
  if (self.tapCount == 10) {
    self.tapCount = 0;
    self.devSettingsHandler();
  }
  if (self.time <= 0) {
    self.tapCount = 0;
    self.time = 5.0;
    [self.timer invalidate];
    self.timer = nil;
  }
}

- (void)dealloc {
  if ([self.timer isValid]) {
    [self.timer invalidate];
    self.timer = nil;
  }
}

@end
