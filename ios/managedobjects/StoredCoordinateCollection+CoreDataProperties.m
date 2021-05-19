//
//  StoredCoordinateCollection+CoreDataProperties.m
//  
//
//  Created by Alex K on 5/19/21.
//
//

#import "StoredCoordinateCollection+CoreDataProperties.h"

@implementation StoredCoordinateCollection (CoreDataProperties)

+ (NSFetchRequest<StoredCoordinateCollection *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredCoordinateCollection"];
}

@dynamic coordinates;

@end
