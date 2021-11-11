//
//  StoredCoordinateCollection+CoreDataProperties.h
//  
//
//  Created by Alex K on 12.11.21.
//
//

#import "StoredCoordinateCollection+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredCoordinateCollection (CoreDataProperties)

+ (NSFetchRequest<StoredCoordinateCollection *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, retain) NSOrderedSet<StoredCoordinate *> *coordinates;

@end

@interface StoredCoordinateCollection (CoreDataGeneratedAccessors)

- (void)insertObject:(StoredCoordinate *)value inCoordinatesAtIndex:(NSUInteger)idx;
- (void)removeObjectFromCoordinatesAtIndex:(NSUInteger)idx;
- (void)insertCoordinates:(NSArray<StoredCoordinate *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeCoordinatesAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInCoordinatesAtIndex:(NSUInteger)idx withObject:(StoredCoordinate *)value;
- (void)replaceCoordinatesAtIndexes:(NSIndexSet *)indexes withCoordinates:(NSArray<StoredCoordinate *> *)values;
- (void)addCoordinatesObject:(StoredCoordinate *)value;
- (void)removeCoordinatesObject:(StoredCoordinate *)value;
- (void)addCoordinates:(NSOrderedSet<StoredCoordinate *> *)values;
- (void)removeCoordinates:(NSOrderedSet<StoredCoordinate *> *)values;

@end

NS_ASSUME_NONNULL_END
