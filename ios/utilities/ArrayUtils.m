//
//  CategoryUtils.m
//  GreenTravel
//
//  Created by Alex K on 9/20/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "ArrayUtils.h"

NSArray* shuffledArray(NSArray *items) {
  NSMutableArray *shuffledItems = [NSMutableArray arrayWithArray:items];
  for (NSUInteger counter = [shuffledItems count]; counter > 1; counter--) {
    [shuffledItems exchangeObjectAtIndex:counter - 1 withObjectAtIndex:arc4random_uniform((u_int32_t)counter)];
  }
  return [shuffledItems subarrayWithRange:NSMakeRange(0, MIN(10, [shuffledItems count]))];
}

NSArray* slice(NSArray *items) {
  NSMutableArray *itemsToSlice = [NSMutableArray arrayWithArray:items];
  return [itemsToSlice subarrayWithRange:NSMakeRange(0, MIN(10, [itemsToSlice count]))];
}

