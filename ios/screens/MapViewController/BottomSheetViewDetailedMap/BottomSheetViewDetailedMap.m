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
  return [[CommonButton alloc] initWithTarget:self
                                       action:@selector(onDetailsPress:)
                                        label:NSLocalizedString(@"ButtonBuildRouteLabel", @"")];
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
  [(CommonButtonWithProgress *)self.detailsButton setInProgress:NO];
  [self.detailsButton setLabel:NSLocalizedString(@"ButtonNavigateLabel", @"")];
}

- (void)revertToInitialState {
  self.progressStep = BottomSheetViewDetailedMapStepRoute;
  [(CommonButtonWithProgress *)self.detailsButton setInProgress:NO];
  [self.detailsButton setLabel:NSLocalizedString(@"ButtonBuildRouteLabel", @"")];
}

@end
