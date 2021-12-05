//
//  ViewUtils.m
//  greenTravel
//
//  Created by Alex K on 5.12.21.
//

#import "ViewUtils.h"

UIWindow* getCurrentWindow() {
  UIWindow *currentWindow = [UIApplication.sharedApplication.windows filteredArrayUsingPredicate:
                             [NSPredicate predicateWithBlock:^BOOL(UIWindow  _Nullable window, NSDictionary<NSString *,id> * _Nullable bindings) {
    return window.isKeyWindow;
  }]].firstObject;
  return currentWindow;
}
 
