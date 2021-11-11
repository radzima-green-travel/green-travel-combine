//
//  StoredSearchItem+CoreDataProperties.h
//  
//
//  Created by Alex K on 12.11.21.
//
//

#import "StoredSearchItem+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredSearchItem (CoreDataProperties)

+ (NSFetchRequest<StoredSearchItem *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, copy) NSString *correspondingPlaceItemUUID;
@property (nonatomic) int16_t order;

@end

NS_ASSUME_NONNULL_END
