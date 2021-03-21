//
//  PlaceDetails.m
//  GreenTravel
//
//  Created by Alex K on 8/27/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "PlaceDetails.h"

@implementation PlaceDetails

- (BOOL)isEqual:(id)other
{
    if (other == self) {
        return YES;
    } else if ([other isKindOfClass:PlaceDetails.class]) {
        PlaceDetails *otherDetails = (PlaceDetails *)other;
        return [self.address isEqualToString:otherDetails.address] &&
        [self.images isEqualToArray:otherDetails.images] &&
        [self.descriptionHTML isEqualToString:otherDetails.descriptionHTML] &&
        [self.categoryIdToItems isEqualToArray:otherDetails.categoryIdToItems];
    } else {
        return [super isEqual:other];
    }
}

- (NSUInteger)hash {
    return self.address.hash ^ self.images.hash ^ self.descriptionHTML.hash ^ self.categoryIdToItems.hash;
}

@end
