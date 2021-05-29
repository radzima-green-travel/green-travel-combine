//
//  Directions.h
//  greenTravel
//
//  Created by Alex K on 5/27/21.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Directions : NSObject

@property (assign, nonatomic) CLLocationCoordinate2D from;
@property (assign, nonatomic) CLLocationCoordinate2D to;
@property (strong, nonatomic) NSString *title;

@end

NS_ASSUME_NONNULL_END
