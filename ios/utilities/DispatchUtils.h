//
//  DispatchUtils.h
//  greenTravel
//
//  Created by Alex K on 24.11.21.
//

#ifndef DispatchUtils_h
#define DispatchUtils_h


#endif /* DispatchUtils_h */
#import <UIKit/UIKit.h>

void dispatchBlockWithUXDelay(CGFloat delayInSeconds, void(^executionBlock)(void(^completion)(void)));
