//
//  AnalyticsUIScrollViewDelegate.h
//  greenTravel
//
//  Created by Alex K on 8/7/21.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface AnalyticsUIScrollViewDelegate : NSObject<UIScrollViewDelegate>

- (instancetype)initWithOnScrollEnd:(void(^)(void))onScrollEnd;
- (void)scrollViewDidScroll:(UIScrollView *)scrollView;

@end

NS_ASSUME_NONNULL_END
