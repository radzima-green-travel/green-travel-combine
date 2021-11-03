//
//  StoredRelatedItemUUID+CoreDataProperties.m
//  
//
//  Created by Alex K on 4.11.21.
//
//

#import "StoredRelatedItemUUID+CoreDataProperties.h"

@implementation StoredRelatedItemUUID (CoreDataProperties)

+ (NSFetchRequest<StoredRelatedItemUUID *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredRelatedItemUUID"];
}

@dynamic uuid;

@end
