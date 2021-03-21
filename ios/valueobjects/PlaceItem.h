//
//  ParticularPlaceItem.h
//  GreenTravel
//
//  Created by Alex K on 8/17/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@class Category;
@class PlaceDetails;

@interface PlaceItem : NSObject

@property (strong, nonatomic) NSString *uuid;
@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSString *cover;
@property (weak, nonatomic) Category *category;
@property (assign, nonatomic) CLLocationCoordinate2D coords;
@property (assign, nonatomic) BOOL bookmarked;
@property (strong, nonatomic) PlaceDetails *details;
@property (strong, nonatomic) void (^onPlaceCellPress)(void);
@property (strong, nonatomic) void (^onFavoriteButtonPress)(void);

@end 

NS_ASSUME_NONNULL_END
