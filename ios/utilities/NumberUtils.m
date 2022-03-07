//
//  NumberUtils.m
//  greenTravel
//
//  Created by Alex K on 7/11/21.
//

#import "NumberUtils.h"

CGFloat roundToGivenN(CGFloat coordValue, NSUInteger n) {
  CGFloat multiplier = 10.0 * n;
  return (NSUInteger)round(coordValue * multiplier) / multiplier;
}

CGFloat roundToN(CGFloat coordValue) {
  return roundToGivenN(coordValue, 9);
}

CGFloat clamp(CGFloat value, CGFloat min, CGFloat max) {
  return fmax(min, fmin(max, value));
}

