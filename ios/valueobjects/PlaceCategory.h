//
//  Category.h
//  GreenTravel
//
//  Created by Alex K on 8/26/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;

@interface PlaceCategory : NSObject<NSCopying>

@property (strong, nonatomic) NSString *uuid;
@property (weak, nonatomic) PlaceCategory *parentCategory;
@property (assign, nonatomic) NSUInteger index;
@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSString *icon;
@property (strong, nonatomic) NSMutableArray<PlaceCategory *> *categories;
@property (strong, nonatomic) NSMutableArray<PlaceItem *> *items;
@property (strong, nonatomic) NSString *cover;
@property (strong, nonatomic) void (^onAllButtonPress)(void);
@property (strong, nonatomic) void (^onPlaceCellPress)(void);

@end

NS_ASSUME_NONNULL_END
