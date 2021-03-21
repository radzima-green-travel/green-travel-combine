//
//  StoredCategoryUUIDToRelatedItemUUIDs+CoreDataProperties.m
//  
//
//  Created by Alex K on 2/6/21.
//
//

#import "StoredCategoryUUIDToRelatedItemUUIDs+CoreDataProperties.h"

@implementation StoredCategoryUUIDToRelatedItemUUIDs (CoreDataProperties)

+ (NSFetchRequest<StoredCategoryUUIDToRelatedItemUUIDs *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredCategoryUUIDToRelatedItemUUIDs"];
}

@dynamic uuid;
@dynamic relatedItemUUIDs;

@end
