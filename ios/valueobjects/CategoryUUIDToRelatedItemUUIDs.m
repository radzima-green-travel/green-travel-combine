//
//  CategoryUUIDToRelatedItems.m
//  GreenTravel
//
//  Created by Alex K on 11/7/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "CategoryUUIDToRelatedItemUUIDs.h"

@implementation CategoryUUIDToRelatedItemUUIDs

- (BOOL)isEqual:(id)other
{
    if (other == self) {
        return YES;
    } else if ([other isKindOfClass:CategoryUUIDToRelatedItemUUIDs.class]) {
        CategoryUUIDToRelatedItemUUIDs *otherRelatedLinkedCategories = (CategoryUUIDToRelatedItemUUIDs *)other;
        return [self.categoryUUID isEqualToString:otherRelatedLinkedCategories.categoryUUID] &&
        [self.relatedItemUUIDs isEqualToOrderedSet:otherRelatedLinkedCategories.relatedItemUUIDs];
    } else {
        return [super isEqual:other];
    }
}

- (NSUInteger)hash
{
    return self.categoryUUID.hash ^ self.relatedItemUUIDs.hash;
}

@end
