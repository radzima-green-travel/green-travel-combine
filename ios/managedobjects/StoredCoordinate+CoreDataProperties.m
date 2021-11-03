//
//  StoredCoordinate+CoreDataProperties.m
//  
//
//  Created by Alex K on 4.11.21.
//
//

#import "StoredCoordinate+CoreDataProperties.h"

@implementation StoredCoordinate (CoreDataProperties)

+ (NSFetchRequest<StoredCoordinate *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredCoordinate"];
}

@dynamic latitude;
@dynamic longitude;

@end
