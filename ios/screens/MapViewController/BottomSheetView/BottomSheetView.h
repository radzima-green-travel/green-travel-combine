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

@property(weak, nonatomic) NSLayoutConstraint *top;
@property(copy, nonatomic) void(^onShow)(BOOL, NSString *);
- (void)show:(PlaceItem *)item buttonLabel:(NSString *)buttonLabel
onNavigatePress:(void(^)(void))onNavigatePress
onBookmarkPress:(void(^)(BOOL))onBookmarkPress;
@property(strong, nonatomic) NSString *buttonLabel;
- (void)hide;
- (void)setBookmarked:(PlaceItem *)item bookmarked:(BOOL)bookmarked;

@end

NS_ASSUME_NONNULL_END
