//
//  AnalyticsEvents.h
//  greenTravel
//
//  Created by Alex K on 7/18/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface AnalyticsEvents : NSObject

+ (instancetype)get;
- (void)logEvent:(NSString *)event;
- (void)logEvent:(NSString  * _Nonnull)event withParams:(NSDictionary *)params;

@end

FOUNDATION_EXPORT const NSString* AnalyticsEventsNaviMain;
FOUNDATION_EXPORT const NSString* AnalyticsEventsNaviMap;
FOUNDATION_EXPORT const NSString* AnalyticsEventsNaviBookmarks;

FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenHome;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenMapItem;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenBookmarks;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenMapFull;
FOUNDATION_EXPORT const NSString* AnalyticsEventsScreenDetails;


NS_ASSUME_NONNULL_END
