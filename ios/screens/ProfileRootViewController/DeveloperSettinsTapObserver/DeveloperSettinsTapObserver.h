//
//  DeveloperSettinsTapObserver.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 14.11.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DeveloperSettinsTapObserver : NSObject

@property (strong, nonatomic, nullable) NSTimer *timer;
@property (assign, nonatomic) int tapCount;
@property (copy, nonatomic) void (^devSettingsHandler)(void);

-(void)timerFired;

@end

NS_ASSUME_NONNULL_END
