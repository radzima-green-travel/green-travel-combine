//
//  StoredPlaceDetails+CoreDataClass.h
//  
//
//  Created by Alex K on 10.02.22.
//
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>

@class StoredArea, StoredCategoryUUIDToRelatedItemUUIDs, StoredCoordinateCollection, StoredInformationReference;

NS_ASSUME_NONNULL_BEGIN

@interface StoredPlaceDetails : NSManagedObject

@end

NS_ASSUME_NONNULL_END

#import "StoredPlaceDetails+CoreDataProperties.h"
