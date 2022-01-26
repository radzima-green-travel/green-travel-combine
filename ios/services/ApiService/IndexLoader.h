//
//  IndexLoader.h
//  greenTravel
//
//  Created by Alex K on 12.01.22.
//

#ifndef IndexLoader_h
#define IndexLoader_h


#endif /* IndexLoader_h */

@class Category;
@class PlaceDetails;

@protocol IndexLoader <NSObject>

- (void)loadCategoriesWithCompletion:(void(^)(NSArray<Category *>*,
                                              NSArray<PlaceDetails *>*,
                                              NSString *))completion;

@end
