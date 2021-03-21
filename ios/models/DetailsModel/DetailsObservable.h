//
//  DetailsObservable.h
//  GreenTravel
//
//  Created by Alex K on 9/5/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol DetailsObserver;

@protocol DetailsObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<DetailsObserver>> *detailsObservers;
- (void)addObserver:(id<DetailsObserver>)observer;
- (void)removeObserver:(id<DetailsObserver>)observer;
- (void)notifyObservers;

@end

NS_ASSUME_NONNULL_END
