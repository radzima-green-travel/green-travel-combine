//
//  BottomSheetViewDetailedMap.m
//  BottomSheetViewDetailedMap
//
//  Created by Alex K on 12.09.21.
//

#import "BottomSheetViewDetailedMap.h"
#import "CommonButtonWithProgress.h"

@interface BottomSheetViewDetailedMap()

@property (assign, nonatomic) BOOL requestIsInProgress;
@property (copy, nonatomic) void (^onPressRoute)(void);
@property (copy, nonatomic) void (^onPressNavigate)(void);

@end

@implementation BottomSheetViewDetailedMap

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (CommonButton *)makeDetailsButton {
  return [[CommonButtonWithProgress alloc] initWithTarget:self action:@selector(onDetailsPress:) label:@""];
}

- (void)onDetailsPress:(id)sender {
  if (self.requestIsInProgress) {
    [self onPressRoute];
    return;
  }
  self.requestIsInProgress = YES;
  [self onPressNavigate];
}

- (void)continueToNavigation {
  self.requestIsInProgress = NO;
}

- (void)show:(PlaceItem *)item buttonLabel:(NSString *)buttonLabel onPressRoute:(void (^)(void))onPressRoute onPressNavigate:(void (^)(void))onPressNavigate onBookmarkPress:(void (^)(BOOL))onBookmarkPress {
  [super show:item buttonLabel:buttonLabel onPressDetails:onPressRoute onBookmarkPress:onBookmarkPress];
  self.onPressRoute = onPressRoute;
  self.onPressNavigate = onPressNavigate;
}

@end
