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

- (void)onDetailsUpdate:(NSMutableDictionary<NSString*, PlaceDetails*> *)itemUUIDToDetails
                  items:(NSMutableDictionary<NSString*, PlaceItem*> *)itemUUIDToItem;

@end

NS_ASSUME_NONNULL_END
