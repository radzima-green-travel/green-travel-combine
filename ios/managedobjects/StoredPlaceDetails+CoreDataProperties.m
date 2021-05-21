//
//  StoredPlaceDetails+CoreDataProperties.m
//  
//
//  Created by Alex K on 5/19/21.
//
//

#import "StoredPlaceDetails+CoreDataProperties.h"

@implementation StoredPlaceDetails (CoreDataProperties)

+ (NSFetchRequest<StoredPlaceDetails *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredPlaceDetails"];
}

@dynamic address;
@dynamic descriptionHTML;
@dynamic imageURLs;
@dynamic uuid;
@dynamic area;
@dynamic linkedCategories;
@dynamic path;

@end
