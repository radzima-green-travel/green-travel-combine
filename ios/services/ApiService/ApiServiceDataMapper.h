//
//  ApiServiceDataMapper.h
//  GreenTravel
//
//  Created by Alex K on 11/7/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

@class PlaceItem;

PlaceItem* apiPlaceItemToLocalPlaceItem(NSDictionary *apiPlaceItem);
