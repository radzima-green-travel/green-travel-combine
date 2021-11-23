//
//  DispatchUtils.m
//  greenTravel
//
//  Created by Alex K on 24.11.21.
//

#import <Foundation/Foundation.h>
#import "DispatchUtils.h"

void dispatchBlockWithUXDelay(CGFloat delayInSeconds, void(^executionBlock)(void(^completion)(void))) {
  dispatch_group_t group = dispatch_group_create();
  dispatch_queue_t queue = dispatch_queue_create("uxqueue", DISPATCH_QUEUE_CONCURRENT);

  dispatch_group_enter(group);
  dispatch_async(queue, ^{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delayInSeconds * NSEC_PER_SEC), queue, ^{
      dispatch_group_leave(group);
    });
  });

  dispatch_group_enter(group);
  dispatch_async(queue, ^{
    executionBlock(^{
      dispatch_group_leave(group);
    });
  });

  dispatch_async(queue, ^{
    dispatch_group_wait(group, DISPATCH_TIME_FOREVER);
  });
}

