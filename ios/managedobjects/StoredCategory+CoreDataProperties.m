//
//  StoredCategory+CoreDataProperties.m
//  
//
//  Created by Alex K on 2/6/21.
//
//

#import "StoredCategory+CoreDataProperties.h"

@implementation StoredCategory (CoreDataProperties)

+ (NSFetchRequest<StoredCategory *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredCategory"];
}

@dynamic coverURL;
@dynamic title;
@dynamic uuid;
@dynamic icon;
@dynamic categories;
@dynamic items;
@dynamic parent;

@end
