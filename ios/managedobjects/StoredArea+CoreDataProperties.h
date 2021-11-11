//
//  StoredArea+CoreDataProperties.h
//  
//
//  Created by Alex K on 12.11.21.
//
//

#import "StoredArea+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredArea (CoreDataProperties)

+ (NSFetchRequest<StoredArea *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, retain) NSOrderedSet<StoredCoordinateCollection *> *coordinateCollections;

@end

@interface StoredArea (CoreDataGeneratedAccessors)

- (void)insertObject:(StoredCoordinateCollection *)value inCoordinateCollectionsAtIndex:(NSUInteger)idx;
- (void)removeObjectFromCoordinateCollectionsAtIndex:(NSUInteger)idx;
- (void)insertCoordinateCollections:(NSArray<StoredCoordinateCollection *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeCoordinateCollectionsAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInCoordinateCollectionsAtIndex:(NSUInteger)idx withObject:(StoredCoordinateCollection *)value;
- (void)replaceCoordinateCollectionsAtIndexes:(NSIndexSet *)indexes withCoordinateCollections:(NSArray<StoredCoordinateCollection *> *)values;
- (void)addCoordinateCollectionsObject:(StoredCoordinateCollection *)value;
- (void)removeCoordinateCollectionsObject:(StoredCoordinateCollection *)value;
- (void)addCoordinateCollections:(NSOrderedSet<StoredCoordinateCollection *> *)values;
- (void)removeCoordinateCollections:(NSOrderedSet<StoredCoordinateCollection *> *)values;

@end

NS_ASSUME_NONNULL_END
