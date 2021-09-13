//
//  BottomSheetViewDetailedMap.h
//  BottomSheetViewDetailedMap
//
//  Created by Alex K on 12.09.21.
//

#import "BottomSheetView.h"

NS_ASSUME_NONNULL_BEGIN

@interface BottomSheetViewDetailedMap : BottomSheetView

- (void)continueToNavigation;
- (void)onNavigationPress;
- (void)show:(PlaceItem *)item buttonLabel:(NSString *)buttonLabel
onPressRoute:(void(^)(void))onPressRoute
onPressNavigate:(void(^)(void))onPressNavigate
onBookmarkPress:(void(^)(BOOL))onBookmarkPress;

@end

NS_ASSUME_NONNULL_END
