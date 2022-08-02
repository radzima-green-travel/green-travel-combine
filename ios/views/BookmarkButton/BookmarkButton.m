//
//  BookmarkButton.m
//  greenTravel
//
//  Created by Alex K on 5/5/21.
//

#import "BookmarkButton.h"
#import "ColorsLegacy.h"
#import "Colors.h"
#import "UIImage+extensions.h"
#import "UIButton+extensions.h"

@interface BookmarkButton()

@property (copy, nonatomic) void(^onBookmarkPress)(BOOL);
@property (assign, nonatomic) BookmarkButtonFlavor flavor;

@end

@implementation BookmarkButton

- (instancetype)initWithFlavor:(BookmarkButtonFlavor)flavor
                onBookmarkPress:(void(^)(BOOL))onBookmarkPress {
  self = [super init];
  if (self) {
    _onBookmarkPress = onBookmarkPress;
    _flavor = flavor;
    [self setUp];
  }
  return self;
}

- (void)layoutSubviews {
  [super layoutSubviews];
}

- (void)setUp {
  self.backgroundColor = UIColor.clearColor;
  [self setUpImages];
  self.translatesAutoresizingMaskIntoConstraints = NO;
  [self addTarget:self action:@selector(onPress:) forControlEvents:UIControlEventTouchUpInside];
  [self addTarget:self action:@selector(onPressStart:) forControlEvents:UIControlEventTouchDown];
  [NSLayoutConstraint activateConstraints:@[
    [self.widthAnchor constraintEqualToConstant:44.0],
    [self.heightAnchor constraintEqualToConstant:44.0],
  ]];
}

- (void)setUpImages {
  switch (self.flavor) {
    case BookmarkButtonFlavorIndex: {
      UIImage *imageNotSelected = [UIImage named:@"bookmark-index" withTintColor:[Colors get].bookmarkIndexScreen];
      UIImage *imageSelected = [UIImage named:@"bookmark-index-selected" withTintColor:[Colors get].bookmarkIndexScreen];
      [self setImageForSelectedState:imageSelected imageForNormalState:imageNotSelected];
      break;
    }
    case BookmarkButtonFlavorDetailsScreen: {
      UIImage *imageNotSelected = [UIImage named:@"bookmark-index" withTintColor:[Colors get].bookmarkDetailScreen];
      UIImage *imageSelected = [UIImage named:@"bookmark-index-selected" withTintColor:[Colors get].bookmarkDetailScreen];
      [self setImageForSelectedState:imageSelected imageForNormalState:imageNotSelected];
      break;
    }
    case BookmarkButtonFlavorBottomSheet: {
      UIImage *imageNotSelected = [UIImage named:@"bookmark-index" withTintColor:[Colors get].bookmarkUnselectedBottomSheetTintColor];
      UIImage *imageSelected = [UIImage named:@"bookmark-index-selected" withTintColor:[Colors get].bookmarkSelectedBottomSheetTintColor];
      [self setImageForSelectedState:imageSelected imageForNormalState:imageNotSelected];
      break;
    }
  }
}

- (void)onPress:(id)sender {
  self.onBookmarkPress(self.selected);
  [super fire];
}

- (void)onPressStart:(id)sender {
  [super prepare];
}

- (void)setBookmark:(BOOL)bookmarked {
  [self setSelected:bookmarked];
}

- (void)setOnBookmarkPress:(void(^)(BOOL))onBookmarkPress {
  _onBookmarkPress = onBookmarkPress;
}

@end
