//
//  IndexLoader.h
//  greenTravel
//
//  Created by Alex K on 12.01.22.
//

@class PlaceCategory;
@class PlaceDetails;
@class IndexModelData;

typedef void (^CategoriesCompletion)(IndexModelData *indexModelData,
                                     NSArray<PlaceDetails *> *details,
                                     NSString *updatedHash);

@protocol IndexLoader <NSObject>

- (void)loadCategories:(NSString *)currentHash
             forceLoad:(BOOL)forceLoad
        withCompletion:(CategoriesCompletion)completion;

@end
