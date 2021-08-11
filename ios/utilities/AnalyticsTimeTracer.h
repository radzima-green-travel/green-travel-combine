//
//  AnalyticsTimeTracer.h
//  greenTravel
//
//  Created by Alex K on 8/8/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface AnalyticsTimeTracer : NSObject

- (instancetype)initWithEventName:(NSString *)eventName;
- (instancetype)initWithEventName:(NSString *)eventName
                       withParams:(NSDictionary *)params;
- (void)traceStart;
- (void)traceEnd;

@end

NS_ASSUME_NONNULL_END
