//
//  NumberUtils.h
//  greenTravel
//
//  Created by Alex K on 7/11/21.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

CGFloat roundToN(CGFloat coordValue);
CGFloat roundToGivenN(CGFloat coordValue, NSUInteger n);
CGFloat fclamp(CGFloat value, CGFloat minValue, CGFloat maxValue);
NSInteger clamp(NSInteger value, NSInteger minValue, NSInteger maxValue);
