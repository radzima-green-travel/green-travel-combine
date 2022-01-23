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

@protocol IndexLoader <NSObject>

- (void)loadCategories:(NSString *)currentHash
        withCompletion:(void(^)(NSArray<PlaceCategory *>*categoriesList,
                                NSArray<PlaceDetails *>*detailsList,
                                NSString *updatedHash))completion;

@end
