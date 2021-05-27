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
                              completion:(void (^)(MGLLineStyleLayer *))completion {
  NSString *sourceLatLng = [NSString stringWithFormat:@"%f,%f",
                            from.latitude, from.longitude];
  NSString *destinationLatLng = [NSString stringWithFormat:@"%f,%f",
                                 to.latitude, to.longitude];
  NSString *mapToken = @"";
  NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"https://api.mapbox.com/directions/v5/mapbox/driving/%@;%@?access_token=%@&geometries=geojson", sourceLatLng, destinationLatLng, mapToken]];
  
  NSURLSessionDataTask *getCategoriesTask =
  [self.session dataTaskWithURL:url
              completionHandler:^(NSData * _Nullable geoJson, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    if (!geoJson) {
      completion(nil);
      return;
    }
    MGLShape *shape = [MGLShape shapeWithData:geoJson encoding:NSUTF8StringEncoding error:nil];
    MGLSource *source = [[MGLShapeSource alloc] initWithIdentifier:@"polyline" shape:shape options:nil];
    MGLLineStyleLayer *dashedLayer = [[MGLLineStyleLayer alloc] initWithIdentifier:@"polyline-dash" source:source];
    dashedLayer.lineJoin = [NSExpression expressionForConstantValue:[NSValue valueWithMGLLineJoin:MGLLineJoinRound]];;
    dashedLayer.lineCap = [NSExpression expressionForConstantValue:[NSValue valueWithMGLLineCap:MGLLineCapRound]];
    dashedLayer.lineWidth = [NSExpression expressionForConstantValue:@4];
    dashedLayer.lineColor = [NSExpression expressionForConstantValue:[UIColor whiteColor]];
    dashedLayer.lineOpacity = [NSExpression expressionForConstantValue:@0.5];
    dashedLayer.lineDashPattern = [NSExpression expressionForConstantValue:@[@0, @1.5]];
    completion(dashedLayer);
  }];
  [getCategoriesTask resume];
}

@end
