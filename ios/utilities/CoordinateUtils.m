//
//  CoordinateUtils.m
//  greenTravel
//
//  Created by Alex K on 7/10/21.
//

#import "CoordinateUtils.h"
#import <UIKit/UIKit.h>
#import "NumberUtils.h"

BOOL coordinatesEqual(CLLocationCoordinate2D coordA,
                      CLLocationCoordinate2D coordB) {
  return roundToN(coordA.latitude) == roundToN(coordB.latitude) &&
  roundToN(coordA.longitude) == roundToN(coordB.longitude);
}
