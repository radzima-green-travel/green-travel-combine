//
//  StoredBookmark+CoreDataProperties.m
//  
//
//  Created by Alex K on 2.12.21.
//
//

#import "StoredBookmark+CoreDataProperties.h"

@implementation StoredBookmark (CoreDataProperties)

+ (NSFetchRequest<StoredBookmark *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredBookmark"];
}

@dynamic itemUUID;
@dynamic createdAt;

@end
