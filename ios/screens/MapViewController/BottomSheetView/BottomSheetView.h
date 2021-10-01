//
//  BottomSheetViewController.h
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;
@class CommonButton;

@interface BottomSheetView : UIView<UIGestureRecognizerDelegate>

@property(weak, nonatomic) NSLayoutConstraint *top;
@property(copy, nonatomic) void(^onShow)(BOOL, NSString *);
@property(copy, nonatomic) void(^onButtonPress)(void);
@property(copy, nonatomic) void(^onBookmarkPress)(BOOL);
@property(strong, nonatomic) CommonButton *detailsButton;
@property(assign, nonatomic) BOOL visible;
@property(assign, nonatomic) BOOL active;

- (void)show:(PlaceItem *)item;
- (void)show:(PlaceItem *)item buttonLabel:(NSString *)buttonLabel
onPressDetails:(void(^)(void))onNavigatePress
onBookmarkPress:(void(^)(BOOL))onBookmarkPress;
@property(strong, nonatomic) NSString *buttonLabel;
@property(copy, nonatomic) void(^onPressDetails)(void);

- (void)hide;
- (void)setBookmarked:(PlaceItem *)item bookmarked:(BOOL)bookmarked;
- (CommonButton *)makeDetailsButton;
- (void)appearAnimationDidEnd:(BOOL)appear;
- (CGFloat)heightOfContent;

@end

NS_ASSUME_NONNULL_END
