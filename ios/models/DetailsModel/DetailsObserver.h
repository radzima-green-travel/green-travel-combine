//
//  DetailsObserver.h
//  GreenTravel
//
//  Created by Alex K on 9/5/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;
@class PlaceDetails;

@protocol DetailsObserver <NSObject>

- (void)onDetailsUpdate:(NSDictionary<NSString*, PlaceDetails*> *)itemUUIDToDetails
       itemUUIDToStatus:(NSDictionary<NSString*, NSNumber*> *)itemUUIDToStatus;

@end

NS_ASSUME_NONNULL_END
