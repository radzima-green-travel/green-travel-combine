//
//  BottomSheetViewController.h
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceItem;

@interface BottomSheetViewController : UIViewController<UIGestureRecognizerDelegate>

@property(assign, nonatomic, readwrite) BOOL visible;
- (void)show:(PlaceItem *)item onNavigatePress:(void(^)(void))onNavigatePress
onBookmarkPress:(void(^)(BOOL))onBookmarkPress;
- (void)hide;
- (void)setBookmarked:(PlaceItem *)item bookmarked:(BOOL)bookmarked;

@end

NS_ASSUME_NONNULL_END
