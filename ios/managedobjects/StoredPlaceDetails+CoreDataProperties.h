//
//  StoredPlaceDetails+CoreDataProperties.h
//  
//
//  Created by Alex K on 2/6/21.
//
//

#import "StoredPlaceDetails+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredPlaceDetails (CoreDataProperties)

+ (NSFetchRequest<StoredPlaceDetails *> *)fetchRequest;

@property (nullable, nonatomic, copy) NSString *address;
@property (nullable, nonatomic, copy) NSString *descriptionHTML;
@property (nullable, nonatomic, copy) NSString *imageURLs;
@property (nullable, nonatomic, copy) NSString *uuid;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredCategoryUUIDToRelatedItemUUIDs *> *linkedCategories;

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

@end

NS_ASSUME_NONNULL_END
