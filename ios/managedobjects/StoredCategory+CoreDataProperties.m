//
//  StoredCategory+CoreDataProperties.m
//  
//
//  Created by Alex K on 4.11.21.
//
//

#import "StoredCategory+CoreDataProperties.h"

@implementation StoredCategory (CoreDataProperties)

+ (NSFetchRequest<StoredCategory *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredCategory"];
}

@dynamic coverURL;
@dynamic icon;
@dynamic title;
@dynamic uuid;
@dynamic categories;
@dynamic items;
@dynamic parent;

@end
