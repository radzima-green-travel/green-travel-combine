//
//  LocationObservable.h
//  GreenTravel
//
//  Created by Alex K on 9/2/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol LocationObserver;

@protocol LocationObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<LocationObserver>> *locationObservers;
- (void)addObserver:(id<LocationObserver>)observer;
- (void)removeObserver:(id<LocationObserver>)observer;
- (void)notifyObservers;

@end

NS_ASSUME_NONNULL_END
