//
//  CategoryUUIDToRelatedItems.h
//  GreenTravel
//
//  Created by Alex K on 11/7/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CategoryUUIDToRelatedItemUUIDs : NSObject

@property (strong, nonatomic) NSString *categoryUUID;
@property (strong, nonatomic) NSOrderedSet<NSString *> *relatedItemUUIDs;

@end

NS_ASSUME_NONNULL_END
