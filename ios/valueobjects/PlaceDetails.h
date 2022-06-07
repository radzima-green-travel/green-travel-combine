//
//  PlaceDetails.h
//  GreenTravel
//
//  Created by Alex K on 8/27/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@class CategoryUUIDToRelatedItemUUIDs;
@class PlaceItem;
@class InformationReference;

NS_ASSUME_NONNULL_BEGIN

@interface PlaceDetails : NSObject

@property (strong, nonatomic) NSString *uuid;
@property (weak, nonatomic) PlaceItem *parentItem;
@property (strong, nonatomic) NSArray<NSString *> *images;
@property (strong, nonatomic) NSString *address;
@property (strong, nonatomic) NSString *descriptionHTML;
@property (strong, nonatomic) NSString *url;
@property (strong, nonatomic) NSString *length;
@property (strong, nonatomic) NSString *singularName;
- (BOOL)isEqual:(id)object;
@property (readonly) NSUInteger hash;
@property (strong, nonatomic) NSArray<CategoryUUIDToRelatedItemUUIDs *> *categoryIdToItems;
@property (strong, nonatomic) NSArray<CategoryUUIDToRelatedItemUUIDs *> *categoryIdToItemsBelongsTo;
// Coordinate array.
@property (strong, nonatomic) NSArray<NSArray<CLLocation *> *> *area;
// Coordinate array.
@property (strong, nonatomic) NSArray<CLLocation *> *path;
@property (strong, nonatomic) NSArray<InformationReference *> *references;

@end 

NS_ASSUME_NONNULL_END
