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
- (void)onNavigationPress;
- (void)show:(PlaceItem *)item
onPressRoute:(void (^)(ContinueToNavigation))onPressRoute
onPressNavigate:(void (^)(void))onPressNavigate
onBookmarkPress:(void (^)(BOOL))onBookmarkPress;
@end

NS_ASSUME_NONNULL_END
