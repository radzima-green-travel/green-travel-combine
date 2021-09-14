//
//  BottomSheetViewDetailedMap.m
//  BottomSheetViewDetailedMap
//
//  Created by Alex K on 12.09.21.
//

#import "BottomSheetViewDetailedMap.h"
#import "CommonButtonWithProgress.h"

@interface BottomSheetViewDetailedMap()

@property (assign, nonatomic) BottomSheetViewDetailedMapStep progressStep;
@property (copy, nonatomic) void (^onPressRoute)(ContinueToNavigation);
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
  __weak typeof(self) weakSelf = self;
  switch (self.progressStep) {
    case BottomSheetViewDetailedMapStepRoute: {
      self.progressStep = BottomSheetViewDetailedMapStepRouteInProgress;
      [(CommonButtonWithProgress *)self.detailsButton setInProgress:YES];
      self.onPressRoute(^{
        [weakSelf continueToNavigation];
      });
      return;
    }
    case BottomSheetViewDetailedMapStepNavigate: {
      self.onPressNavigate();
      [self hide];
      return;
    }
    case BottomSheetViewDetailedMapStepRouteInProgress:break;
  }
}

- (void)continueToNavigation {
  self.progressStep = BottomSheetViewDetailedMapStepNavigate;
  CommonButtonWithProgress *detailsButton = (CommonButtonWithProgress *) self.detailsButton;
  [(CommonButtonWithProgress *)self.detailsButton setInProgress:NO];
  [detailsButton setTitle:@"В путь" forState:UIControlStateNormal];
}

- (void)show:(PlaceItem *)item
onPressRoute:(void (^)(ContinueToNavigation))onPressRoute
onPressNavigate:(void (^)(void))onPressNavigate
onBookmarkPress:(void (^)(BOOL))onBookmarkPress {
  [super show:item buttonLabel:@"Проложить маршрут" onPressDetails:^{}
onBookmarkPress:onBookmarkPress];
  self.onPressRoute = onPressRoute;
  self.onPressNavigate = onPressNavigate;
}

@end
