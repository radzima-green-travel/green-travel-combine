//
//  IndexPeeks.h
//  greenTravel
//
//  Created by Alex K on 6/16/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;
@class PlaceCategory;

@interface IndexPeeks : NSObject

@property (strong, nonatomic) PlaceCategory *category;
@property (strong, nonatomic) NSArray<PlaceItem *> *items;
@property (strong, nonatomic) NSArray<PlaceCategory *> *categories;

@end

NS_ASSUME_NONNULL_END
