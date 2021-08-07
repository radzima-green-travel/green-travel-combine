//
//  AnalyticsUIScrollViewDelegate.m
//  greenTravel
//
//  Created by Alex K on 8/7/21.
//

#import "AnalyticsUIScrollViewDelegate.h"
#import "ScrollViewUtils.h"

@interface AnalyticsUIScrollViewDelegate()

@property (assign, nonatomic) BOOL scrolledToEnd;
@property (strong, nonatomic) void(^onScrollEnd)(void);

@end

@implementation AnalyticsUIScrollViewDelegate

- (instancetype)initWithOnScrollEnd:(void(^)(void))onScrollEnd
{
  self = [super init];
  if (self) {
    self.onScrollEnd = onScrollEnd;
  }
  return self;
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
  if (scrolledToEnd(scrollView) && !self.scrolledToEnd) {
    self.scrolledToEnd = YES;
    self.onScrollEnd();
  }
}

@end
