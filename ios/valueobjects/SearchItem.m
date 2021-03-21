//
//  SearchItem.m
//  GreenTravel
//
//  Created by Alex K on 8/22/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "SearchItem.h"

@implementation SearchItem

- (instancetype)init
{
    self = [super init];
    if (self) {
        _distance = -1;
        _title = @"";
    }
    return self;
}

- (NSString *)searchableText {
    if (self.distance >= 0) {
        NSLog(@"Search distance: %f", self.distance);
        NSNumberFormatter *fmt = [[NSNumberFormatter alloc] init];
        fmt.numberStyle = NSNumberFormatterDecimalStyle;
        fmt.maximumFractionDigits = 1;
        NSString *kilometers = [fmt stringFromNumber:@(self.distance)];
        return [NSString stringWithFormat:@"%@, %@ км", self.title, kilometers];
    }
    return [NSString stringWithFormat:@"%@", self.title];
}

@end
