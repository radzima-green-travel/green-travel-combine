//
//  StoredBookmark+CoreDataProperties.h
//  
//
//  Created by Alex K on 2.12.21.
//
//

#import "StoredBookmark+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredBookmark (CoreDataProperties)

+ (NSFetchRequest<StoredBookmark *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, copy) NSString *itemUUID;
@property (nullable, nonatomic, copy) NSDate *createdAt;

@end

NS_ASSUME_NONNULL_END
