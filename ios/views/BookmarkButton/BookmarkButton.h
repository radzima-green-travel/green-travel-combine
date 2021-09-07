//
//  BookmarkButton.h
//  greenTravel
//
//  Created by Alex K on 5/5/21.
//

#import <UIKit/UIKit.h>
#import "UIButtonWithFeedback.h"
#import "BookmarkButtonConstants.h"

NS_ASSUME_NONNULL_BEGIN


@interface BookmarkButton : UIButtonWithFeedback

- (instancetype)initWithFlavor:(BookmarkButtonFlavor)flavor
               onBookmarkPress:(void(^)(BOOL))onBookmarkPress;
- (void)setBookmark:(BOOL)bookmarked;
- (void)setOnBookmarkPress:(void(^)(BOOL))onBookmarkPress;

@end

NS_ASSUME_NONNULL_END
