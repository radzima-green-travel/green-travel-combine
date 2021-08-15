//
//  BottomSheetTouchForwardingView.m
//  greenTravel
//
//  Created by Alex K on 8/15/21.
//

#import "BottomSheetTouchForwardingView.h"

@implementation BottomSheetTouchForwardingView

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event {
//    UIView *hitView = [super hitTest:point withEvent:event];
//
//    if (hitView != self) return hitView;
//
//    for (UIView *passthroughView in self.passthroughViews) {
//        UIView *passthroughHitView = [passthroughView hitTest:[self convertPoint:point toView:passthroughView] withEvent:event];
//            if (passthroughHitView) return passthroughHitView;
//    }

    return self;
}

@end
