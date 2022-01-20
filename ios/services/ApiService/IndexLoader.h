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

- (void)loadCategoriesWithCompletion:(void(^)(NSArray<PlaceCategory *>*,
                                              NSArray<PlaceDetails *>*,
                                              NSString *))completion;

@end
