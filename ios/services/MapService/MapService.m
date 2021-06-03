//
//  MapService.m
//  greenTravel
//
//  Created by Alex K on 5/27/21.
//

#import "MapService.h"
@import Mapbox;

@interface MapService()

@property (strong, nonatomic) NSURLSession *session;

@end

@implementation MapService

- (instancetype) initWithSession:(NSURLSession *)session {
    self = [super init];
    if (self) {
        _session = session; 
    }
    return self;
}

- (void)loadDirectionsWithCompletionFrom:(CLLocationCoordinate2D)from
                                      to:(CLLocationCoordinate2D)to
                              completion:(void (^)(NSArray<CLLocation *> *))completion {
  NSString *sourceLatLng = [NSString stringWithFormat:@"%f,%f",
                            from.longitude, from.latitude];
  NSString *destinationLatLng = [NSString stringWithFormat:@"%f,%f",
                                 to.longitude, to.latitude];
  NSString *mapToken = @"pk.eyJ1IjoiZXBtLXNsciIsImEiOiJja2V2Z3RqdWYwem12MnFwN2EzYWQ2b2xtIn0.kpeAR4x3J-15NyvhjlZJnA";
  NSString *url = [NSString stringWithFormat:@"https://api.mapbox.com/directions/v5/mapbox/driving/%@;%@?access_token=%@&geometries=geojson", sourceLatLng, destinationLatLng, mapToken];
  
  NSURL *nsURL = [NSURL URLWithString:url];
  
  NSURLSessionDataTask *getCategoriesTask =
  [self.session dataTaskWithURL:nsURL
              completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    if (!data) {
      completion(nil);
      return;
    }
    NSDictionary *body = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    if (body[@"routes"] == [NSNull null]) {
      completion(nil);
      return;
    }
    if ([body[@"routes"] count] == 0) {
      completion(nil);
      return;
    }
    NSArray<NSArray<NSNumber *>*> *coordinates = body[@"routes"][0][@"geometry"][@"coordinates"];
    if (coordinates) {
      NSMutableArray *locations = [[NSMutableArray alloc] init];
      [coordinates enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [locations addObject:[[CLLocation alloc] initWithLatitude:[obj[1] doubleValue] longitude:[obj[0] doubleValue]]];
      }];
      NSLog(@"Error: %@", error);
      completion(locations);
    }
    
    
    
  }];
  [getCategoriesTask resume];
}

@end
