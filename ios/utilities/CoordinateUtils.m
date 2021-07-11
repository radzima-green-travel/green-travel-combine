//
//  CoordinateUtils.m
//  greenTravel
//
//  Created by Alex K on 7/10/21.
//

#import "CoordinateUtils.h"
#import <UIKit/UIKit.h>

CGFloat roundToN(CGFloat coordValue) {
  return (NSUInteger)round(coordValue * 1000000000.0) / 1000000000.0;
}

BOOL coordinatesEqual(CLLocationCoordinate2D coordA,
                      CLLocationCoordinate2D coordB) {
//  return coordA.latitude == coordB.latitude &&
//  coordA.longitude == coordB.longitude;
  
  return roundToN(coordA.latitude) == roundToN(coordB.latitude) &&
  roundToN(coordA.longitude) == roundToN(coordB.longitude);
}
