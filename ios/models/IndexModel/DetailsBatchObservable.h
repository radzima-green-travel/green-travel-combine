//
//  DetailsBatchObserver.h
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DetailsBatchConstants.h"

NS_ASSUME_NONNULL_BEGIN

@protocol DetailsBatchObserver;

@protocol DetailsBatchObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<DetailsBatchObserver>> *detailsBatchObservers;
- (void)addObserverDetailsBatch:(id<DetailsBatchObserver>)observer;
- (void)removeObserverDetailsBatch:(id<DetailsBatchObserver>)observer;
- (void)notifyObserversDetailsBatch:(DetailsLoadState)detailsLoadState;

@end

NS_ASSUME_NONNULL_END
