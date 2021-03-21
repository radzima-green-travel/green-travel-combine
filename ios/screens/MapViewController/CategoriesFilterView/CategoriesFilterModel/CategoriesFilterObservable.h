//
//  CategoriesFilterObservervable.h
//  GreenTravel
//
//  Created by Alex K on 2/26/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol CategoriesFilterObserver;
@class FilterOption;

@protocol CategoriesFilterObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<CategoriesFilterObserver>> *categoriesFilterObservers;
- (void)addObserver:(id<CategoriesFilterObserver>)observer;
- (void)removeObserver:(id<CategoriesFilterObserver>)observer;
- (void)notifyObservers;
- (void)notifyObserversFilterSelect:(NSUInteger)selectedIndex;

@end

NS_ASSUME_NONNULL_END
