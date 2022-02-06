//
//  CategoryMappingResult.h
//  greenTravel
//
//  Created by Alex K on 1.02.22.
//

#import <Foundation/Foundation.h>

@class PlaceItem;
@class PlaceCategory;

NS_ASSUME_NONNULL_BEGIN

@interface IndexModelData : NSObject

@property (strong, nonatomic) NSMutableDictionary<NSString *, PlaceCategory *> *flatCategories;
@property (strong, nonatomic) NSMutableDictionary<NSString *, PlaceItem *> *flatItems;
@property (strong, nonatomic) NSMutableArray<PlaceCategory *> *categoryTree;

@end

NS_ASSUME_NONNULL_END
