//
//  CategoriesObserver.h
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class FilterOption;

@protocol CategoriesFilterObserver <NSObject>

- (void)onFilterOptionsUpdate:(NSArray<FilterOption *>*)filterOptions;
- (void)onFilterOptionsSelect:(NSUInteger)selectedIndex;

@end

NS_ASSUME_NONNULL_END
