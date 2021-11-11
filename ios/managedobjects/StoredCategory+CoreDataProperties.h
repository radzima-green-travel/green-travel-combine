//
//  StoredCategory+CoreDataProperties.h
//  
//
//  Created by Alex K on 12.11.21.
//
//

#import "StoredCategory+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredCategory (CoreDataProperties)

+ (NSFetchRequest<StoredCategory *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, copy) NSString *coverURL;
@property (nullable, nonatomic, copy) NSString *icon;
@property (nullable, nonatomic, copy) NSString *title;
@property (nullable, nonatomic, copy) NSString *uuid;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredCategory *> *categories;
@property (nullable, nonatomic, retain) NSOrderedSet<StoredPlaceItem *> *items;
@property (nullable, nonatomic, retain) StoredCategory *parent;

@end

@interface StoredCategory (CoreDataGeneratedAccessors)

- (void)insertObject:(StoredCategory *)value inCategoriesAtIndex:(NSUInteger)idx;
- (void)removeObjectFromCategoriesAtIndex:(NSUInteger)idx;
- (void)insertCategories:(NSArray<StoredCategory *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeCategoriesAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInCategoriesAtIndex:(NSUInteger)idx withObject:(StoredCategory *)value;
- (void)replaceCategoriesAtIndexes:(NSIndexSet *)indexes withCategories:(NSArray<StoredCategory *> *)values;
- (void)addCategoriesObject:(StoredCategory *)value;
- (void)removeCategoriesObject:(StoredCategory *)value;
- (void)addCategories:(NSOrderedSet<StoredCategory *> *)values;
- (void)removeCategories:(NSOrderedSet<StoredCategory *> *)values;

- (void)insertObject:(StoredPlaceItem *)value inItemsAtIndex:(NSUInteger)idx;
- (void)removeObjectFromItemsAtIndex:(NSUInteger)idx;
- (void)insertItems:(NSArray<StoredPlaceItem *> *)value atIndexes:(NSIndexSet *)indexes;
- (void)removeItemsAtIndexes:(NSIndexSet *)indexes;
- (void)replaceObjectInItemsAtIndex:(NSUInteger)idx withObject:(StoredPlaceItem *)value;
- (void)replaceItemsAtIndexes:(NSIndexSet *)indexes withItems:(NSArray<StoredPlaceItem *> *)values;
- (void)addItemsObject:(StoredPlaceItem *)value;
- (void)removeItemsObject:(StoredPlaceItem *)value;
- (void)addItems:(NSOrderedSet<StoredPlaceItem *> *)values;
- (void)removeItems:(NSOrderedSet<StoredPlaceItem *> *)values;

@end

NS_ASSUME_NONNULL_END
