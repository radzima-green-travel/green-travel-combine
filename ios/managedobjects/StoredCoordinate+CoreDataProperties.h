//
//  StoredCoordinate+CoreDataProperties.h
//  
//
//  Created by Alex K on 5/20/21.
//
//

#import "StoredCoordinate+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredCoordinate (CoreDataProperties)

+ (NSFetchRequest<StoredCoordinate *> *)fetchRequest;

@property (nonatomic) double latitude;
@property (nonatomic) double longitude;

@end

NS_ASSUME_NONNULL_END
