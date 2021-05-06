//
//  BookmarkButton.h
//  greenTravel
//
//  Created by Alex K on 5/5/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface BookmarkButton : UIButton

- (instancetype)initWithOnBookmarkPress:(void(^)(BOOL))onBookmarkPress;
- (void)setBookmark:(BOOL)bookmarked;
- (void)setOnBookmarkPress:(void(^)(BOOL))onBookmarkPress;

@end

NS_ASSUME_NONNULL_END
