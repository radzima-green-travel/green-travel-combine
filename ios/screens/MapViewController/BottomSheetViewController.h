//
//  BottomSheetViewController.h
//  greenTravel
//
//  Created by Alex K on 5/2/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface BottomSheetViewController : UIViewController<UIGestureRecognizerDelegate>

@property(assign, nonatomic, readwrite) BOOL visible;
- (void)show:(NSString *)title bookmarked:(BOOL)bookmarked
  completion:(void(^)(void))completion;
- (void)hide;

@end

NS_ASSUME_NONNULL_END
