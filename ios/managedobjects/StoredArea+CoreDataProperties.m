//
//  StoredArea+CoreDataProperties.m
//  
//
//  Created by Alex K on 5/19/21.
//
//

#import "StoredArea+CoreDataProperties.h"

@implementation StoredArea (CoreDataProperties)

+ (NSFetchRequest<StoredArea *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredArea"];
}

@dynamic coordinateCollections;

@end
