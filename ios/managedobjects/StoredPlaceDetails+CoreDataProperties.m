//
//  StoredPlaceDetails+CoreDataProperties.m
//  
//
//  Created by Alex K on 23.11.21.
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
@dynamic url;
@dynamic uuid;
@dynamic linkedCategories;
@dynamic linkedCategoriesBelongsTo;
@dynamic path;
@dynamic area;

@end
