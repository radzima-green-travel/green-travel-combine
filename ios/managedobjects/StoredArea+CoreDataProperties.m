//
//  StoredArea+CoreDataProperties.m
//  
//
//  Created by Alex K on 4.11.21.
//
//

#import "StoredArea+CoreDataProperties.h"

@implementation StoredArea (CoreDataProperties)

+ (NSFetchRequest<StoredArea *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredArea"];
}

@dynamic coordinateCollections;

@end
