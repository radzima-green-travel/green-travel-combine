//
//  StoredPlaceDetails+CoreDataProperties.m
//  
//
//  Created by Alex K on 4.11.21.
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
@dynamic area;
@dynamic linkedCategories;
@dynamic linkedCategoriesBelongsTo;
@dynamic path;

@end
