//
//  ScrollViewUtils.m
//  greenTravel
//
//  Created by Alex K on 8/7/21.
//

#import "ScrollViewUtils.h"

BOOL scrolledToEnd(UIScrollView *scrollView) {
  return scrollView.frame.size.height + scrollView.contentOffset.y >=
    scrollView.contentSize.height;
}
