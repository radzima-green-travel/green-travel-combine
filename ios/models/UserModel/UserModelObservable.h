//
//  UserModelObservable.h
//  greenTravel
//
//  Created by Alex K on 24.05.22.
//

#ifndef UserModelObservable_h
#define UserModelObservable_h


#endif /* UserModelObservable_h */


@protocol UserModelObserver;

@protocol UserModelObservable <NSObject>

@property (strong, nonatomic) NSMutableArray<id<UserModelObserver>> *userModelObservers;
- (void)addUserModelObserver:(id<UserModelObserver>)observer;
- (void)removeUserModelObserver:(id<UserModelObserver>)observer;
- (void)notifyUserModelObservers;

@end
