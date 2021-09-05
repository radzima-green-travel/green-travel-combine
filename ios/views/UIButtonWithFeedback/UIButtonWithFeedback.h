//
//  UIButtonWithFeedback.h
//  UIButtonWithFeedback
//
//  Created by Alex K on 5.09.21.
//

#import <UIKit/UIKit.h>
#import "UIButtonHighlightable.h"

NS_ASSUME_NONNULL_BEGIN

@interface UIButtonWithFeedback : UIButtonHighlightable

- (void)prepare;
- (void)fire;

@end

NS_ASSUME_NONNULL_END
