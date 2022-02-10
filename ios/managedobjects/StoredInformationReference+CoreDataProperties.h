//
//  StoredInformationReference+CoreDataProperties.h
//  
//
//  Created by Alex K on 10.02.22.
//
//

#import "StoredInformationReference+CoreDataClass.h"


NS_ASSUME_NONNULL_BEGIN

@interface StoredInformationReference (CoreDataProperties)

+ (NSFetchRequest<StoredInformationReference *> *)fetchRequest NS_SWIFT_NAME(fetchRequest());

@property (nullable, nonatomic, copy) NSString *url;
@property (nullable, nonatomic, copy) NSString *title;

@end

NS_ASSUME_NONNULL_END
