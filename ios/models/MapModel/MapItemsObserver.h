//
//  SearchItemsObserver.h
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class MapItem;

@protocol MapItemsObserver <NSObject>

- (void)onMapItemsUpdate:(NSArray<MapItem *>*)mapItems;

@end

NS_ASSUME_NONNULL_END
