//
//  MapItem.h
//  GreenTravel
//
//  Created by Alex K on 8/30/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@class PlaceItem;

@interface MapItem: NSObject

@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSString *uuid;
@property (strong, nonatomic) PlaceItem *correspondingPlaceItem;
@property (assign, nonatomic) CLLocationCoordinate2D coords;

@end
