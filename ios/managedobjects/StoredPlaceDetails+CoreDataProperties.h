//
//  StoredPlaceDetails+CoreDataProperties.h
//  
//
//  Created by Alex K on 10.02.22.
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
@property (nullable, nonatomic, copy) NSString *length;
@property (nullable, nonatomic, retain) StoredArea *area;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *linkedCategories;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *linkedCategoriesBelongsTo;
@property (nullable, nonatomic, retain) StoredCoordinateCollection *path;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredInformationReference *> *references;

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

- (void)insertObject:(StoredInformationReference *)value inReferencesAtIndex:(NSUInteger)idx;
- (void)removeObjectFromReferencesAtIndex:(NSUInteger)idx;
- (void)insertReferences:(NSArray<StoredInformationReference *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeReferencesAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInReferencesAtIndex:(NSUInteger)idx withObject:(StoredInformationReference *)value;
- (void)replaceReferencesAtIndexes:(NSIndexSet *)indexes withReferences:(NSArray<StoredInformationReference *> *)values;
- (void)addReferencesObject:(StoredInformationReference *)value;
- (void)removeReferencesObject:(StoredInformationReference *)value;
- (void)addReferences:(NSOrderedSet<StoredInformationReference *> *)values;
- (void)removeReferences:(NSOrderedSet<StoredInformationReference *> *)values;

@end

NS_ASSUME_NONNULL_END
