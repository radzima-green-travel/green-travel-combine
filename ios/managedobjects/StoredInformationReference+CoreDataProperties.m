//
//  StoredInformationReference+CoreDataProperties.m
//  
//
//  Created by Alex K on 10.02.22.
//
//

#import "StoredInformationReference+CoreDataProperties.h"

@implementation StoredInformationReference (CoreDataProperties)

+ (NSFetchRequest<StoredInformationReference *> *)fetchRequest {
	return [NSFetchRequest fetchRequestWithEntityName:@"StoredInformationReference"];
}

@dynamic url;
@dynamic title;

@end
