//
//  BottomSheetViewDetailedMap.h
//  BottomSheetViewDetailedMap
//
//  Created by Alex K on 12.09.21.
//

#import "BottomSheetView.h"

NS_ASSUME_NONNULL_BEGIN

typedef void(^ContinueToNavigation)(void);


typedef NS_ENUM(NSInteger, BottomSheetViewDetailedMapStep) {
  BottomSheetViewDetailedMapStepRoute = 0,
  BottomSheetViewDetailedMapStepRouteInProgress = 1,
  BottomSheetViewDetailedMapStepNavigate = 2,
};

@interface BottomSheetViewDetailedMap : BottomSheetView

@property(copy, nonatomic) void(^onNavigatePress)(void);
- (void)continueToNavigation;
- (void)revertToInitialState;
- (void)onNavigationPress;
@property (copy, nonatomic) void (^onPressRoute)(ContinueToNavigation);
@property (copy, nonatomic) void (^onPressNavigate)(void);
@end

NS_ASSUME_NONNULL_END
