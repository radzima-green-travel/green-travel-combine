//
//  StoredRelatedItemUUID+CoreDataProperties.h
//  
//
//  Created by Alex K on 2/6/21.
//
//

#import "StoredRelatedItemUUID+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredRelatedItemUUID (CoreDataProperties)

+ (NSFetchRequest<StoredRelatedItemUUID *> *)fetchRequest;

@property (nullable, nonatomic, copy) NSString *uuid;

@end

NS_ASSUME_NONNULL_END
