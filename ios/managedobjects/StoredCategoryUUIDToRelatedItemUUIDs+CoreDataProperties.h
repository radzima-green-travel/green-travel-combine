//
//  StoredCategoryUUIDToRelatedItemUUIDs+CoreDataProperties.h
//  
//
//  Created by Alex K on 12.11.21.
//
//

#import "StoredCategoryUUIDToRelatedItemUUIDs+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredCategoryUUIDToRelatedItemUUIDs (CoreDataProperties)

+ (NSFetchRequest<StoredCategoryUUIDToRelatedItemUUIDs *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, copy) NSString *uuid;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredRelatedItemUUID *> *relatedItemUUIDs;

@end

@interface StoredCategoryUUIDToRelatedItemUUIDs (CoreDataGeneratedAccessors)

- (void)insertObject:(StoredRelatedItemUUID *)value inRelatedItemUUIDsAtIndex:(NSUInteger)idx;
- (void)removeObjectFromRelatedItemUUIDsAtIndex:(NSUInteger)idx;
- (void)insertRelatedItemUUIDs:(NSArray<StoredRelatedItemUUID *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeRelatedItemUUIDsAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInRelatedItemUUIDsAtIndex:(NSUInteger)idx withObject:(StoredRelatedItemUUID *)value;
- (void)replaceRelatedItemUUIDsAtIndexes:(NSIndexSet *)indexes withRelatedItemUUIDs:(NSArray<StoredRelatedItemUUID *> *)values;
- (void)addRelatedItemUUIDsObject:(StoredRelatedItemUUID *)value;
- (void)removeRelatedItemUUIDsObject:(StoredRelatedItemUUID *)value;
- (void)addRelatedItemUUIDs:(NSOrderedSet<StoredRelatedItemUUID *> *)values;
- (void)removeRelatedItemUUIDs:(NSOrderedSet<StoredRelatedItemUUID *> *)values;

@end

NS_ASSUME_NONNULL_END
