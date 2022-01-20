//
//  CategoriesObserver.h
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceCategory;
@class PlaceItem;

@protocol CategoriesObserver <NSObject>

- (void)onCategoriesUpdate:(NSArray<PlaceCategory *>*)categories;
- (void)onCategoriesNewDataAvailable;
- (void)onCategoriesLoading:(BOOL)loading;
- (void)onDetailsLoading:(BOOL)loading;

@end

NS_ASSUME_NONNULL_END
