//
//  MapService.h
//  greenTravel
//
//  Created by Alex K on 5/27/21.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@class MGLLineStyleLayer;

@interface MapService : NSObject

- (instancetype)initWithSession:(NSURLSession *)session;
- (void)loadDirectionsWithCompletionFrom:(CLLocationCoordinate2D)from
                                 to:(CLLocationCoordinate2D)to
                         completion:(void(^)(MGLLineStyleLayer *))completion;

@end

NS_ASSUME_NONNULL_END
