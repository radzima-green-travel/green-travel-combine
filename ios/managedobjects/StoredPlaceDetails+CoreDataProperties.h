//
//  StoredPlaceDetails+CoreDataProperties.h
//  
//
//  Created by Alex K on 12.11.21.
//
//

#import "StoredPlaceDetails+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredPlaceDetails (CoreDataProperties)

+ (NSFetchRequest<StoredPlaceDetails *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, copy) NSString *address;
@property (nullable, nonatomic, copy) NSString *descriptionHTML;
@property (nullable, nonatomic, copy) NSString *imageURLs;
@property (nullable, nonatomic, copy) NSString *url;
@property (nullable, nonatomic, copy) NSString *uuid;
@property (nullable, nonatomic, retain) NSObject *area;
@property (nullable, nonatomic, retain) NSObject *path;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *linkedCategories;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *linkedCategoriesBelongsTo;

@end

@interface StoredPlaceDetails (CoreDataGeneratedAccessors)

- (void)insertObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value inLinkedCategoriesAtIndex:(NSUInteger)idx;
- (void)removeObjectFromLinkedCategoriesAtIndex:(NSUInteger)idx;
- (void)insertLinkedCategories:(NSArray<StoredCategoryUUIDToRelatedItemUUIDs *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeLinkedCategoriesAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInLinkedCategoriesAtIndex:(NSUInteger)idx withObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value;
- (void)replaceLinkedCategoriesAtIndexes:(NSIndexSet *)indexes withLinkedCategories:(NSArray<StoredCategoryUUIDToRelatedItemUUIDs *> *)values;
- (void)addLinkedCategoriesObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value;
- (void)removeLinkedCategoriesObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value;
- (void)addLinkedCategories:(NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *)values;
- (void)removeLinkedCategories:(NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *)values;

- (void)insertObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value inLinkedCategoriesBelongsToAtIndex:(NSUInteger)idx;
- (void)removeObjectFromLinkedCategoriesBelongsToAtIndex:(NSUInteger)idx;
- (void)insertLinkedCategoriesBelongsTo:(NSArray<StoredCategoryUUIDToRelatedItemUUIDs *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeLinkedCategoriesBelongsToAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInLinkedCategoriesBelongsToAtIndex:(NSUInteger)idx withObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value;
- (void)replaceLinkedCategoriesBelongsToAtIndexes:(NSIndexSet *)indexes withLinkedCategoriesBelongsTo:(NSArray<StoredCategoryUUIDToRelatedItemUUIDs *> *)values;
- (void)addLinkedCategoriesBelongsToObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value;
- (void)removeLinkedCategoriesBelongsToObject:(StoredCategoryUUIDToRelatedItemUUIDs *)value;
- (void)addLinkedCategoriesBelongsTo:(NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *)values;
- (void)removeLinkedCategoriesBelongsTo:(NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *)values;

@end

NS_ASSUME_NONNULL_END
