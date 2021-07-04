//
//  BottomSheetViewController.h
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;

@interface BottomSheetView : UIView<UIGestureRecognizerDelegate>

@property(assign, nonatomic) BOOL visible;
@property(weak, nonatomic) NSLayoutConstraint *top;
@property(copy, nonatomic) void(^onShow)(BOOL);
- (void)show:(PlaceItem *)item buttonLabel:(NSString *)buttonLabel
onNavigatePress:(void(^)(void))onNavigatePress
onBookmarkPress:(void(^)(BOOL))onBookmarkPress;
- (void)hide;
- (void)setBookmarked:(PlaceItem *)item bookmarked:(BOOL)bookmarked;

@end

NS_ASSUME_NONNULL_END
