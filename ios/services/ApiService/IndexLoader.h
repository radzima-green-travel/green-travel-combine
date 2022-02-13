//
//  IndexLoader.h
//  greenTravel
//
//  Created by Alex K on 12.01.22.
//

#ifndef IndexLoader_h
#define IndexLoader_h


#endif /* IndexLoader_h */

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
