//
//  StoredCoordinate+CoreDataProperties.h
//  
//
//  Created by Alex K on 12.11.21.
//
//

#import "StoredCoordinate+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredCoordinate (CoreDataProperties)

+ (NSFetchRequest<StoredCoordinate *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nonatomic) double latitude;
@property (nonatomic) double longitude;

@end

NS_ASSUME_NONNULL_END
