//
//  CommonButtonWithProgress.m
//  CommonButtonWithProgress
//
//  Created by Alex K on 12.09.21.
//

#import "CommonButtonWithProgress.h"

@interface CommonButtonWithProgress()

@property(strong, nonatomic) UIActivityIndicatorView *progressIndicator;
@property(strong, nonatomic) NSString *labelBackup;

@end

@implementation CommonButtonWithProgress

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/


- (UIActivityIndicatorView *)makeActivityIndicator {
  if (self.progressIndicator != nil) {
    return self.progressIndicator;
  }
  self.progressIndicator = [[UIActivityIndicatorView alloc]
                                      initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleMedium];
  return self.progressIndicator;
}

- (void)addActivityIndicator {
  [self addSubview:[self makeActivityIndicator]];
  self.progressIndicator.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.progressIndicator.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
    [self.progressIndicator.centerYAnchor constraintEqualToAnchor:self.centerYAnchor]
  ]];
}

- (void)setInProgress:(BOOL)inProgress {
  _inProgress = inProgress;
  if (inProgress) {
    UIActivityIndicatorView *progressIndicator = [[UIActivityIndicatorView alloc]
                                        initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleMedium];
    self.labelBackup = self.currentTitle;
    [self setTitle:@"" forState:UIControlStateNormal];
    [self addActivityIndicator];
    [self.progressIndicator startAnimating];
    [self setEnabled:NO];
    return;
  }
  [self setEnabled:YES];
  if (self.labelBackup) {
    [self setTitle:self.labelBackup forState:UIControlStateNormal];
  }
  [self.progressIndicator stopAnimating];
  [self.progressIndicator removeFromSuperview];
}


@end
