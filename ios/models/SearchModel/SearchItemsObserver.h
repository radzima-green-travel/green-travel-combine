//
//  SearchItemsObserver.h
//  GreenTravel
//
//  Created by Alex K on 8/29/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class SearchItem;

@protocol SearchItemsObserver <NSObject>

- (void)onSearchItemsUpdate:(NSArray<SearchItem *>*)searchItems;
- (void)onSearchHistoryItemsUpdate:(NSArray<SearchItem *>*)searchHistoryItems;

@end

NS_ASSUME_NONNULL_END
