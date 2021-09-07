//
//  UIButtonWithFeedback.m
//  UIButtonWithFeedback
//
//  Created by Alex K on 5.09.21.
//

#import "UIButtonWithFeedback.h"

@interface UIButtonWithFeedback()

@property (strong, nonatomic) UISelectionFeedbackGenerator *feedbackGenerator;
@property (strong, nonatomic) NSTimer *timer;

@end

@implementation UIButtonWithFeedback

- (void)prepare {
  self.feedbackGenerator = [[UISelectionFeedbackGenerator alloc] init];
  [self.feedbackGenerator prepare];
  __weak typeof(self) weakSelf = self;
  self.timer = [NSTimer scheduledTimerWithTimeInterval:0.5 repeats:NO block:^(NSTimer * _Nonnull timer) {
    weakSelf.feedbackGenerator = nil;
  }];
}

- (void)fire {
  [self.timer invalidate];
  [self.feedbackGenerator selectionChanged];
}

@end
