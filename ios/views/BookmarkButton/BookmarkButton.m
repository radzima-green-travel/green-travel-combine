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
      UIImage *imageNotSelected = [UIImage imageNamed:@"bookmark-index"];
      UIImage *imageSelected = [UIImage imageNamed:@"bookmark-index-selected"];
      
      [self setImage:imageNotSelected forState:UIControlStateNormal];
      [self setImage:imageSelected forState:UIControlStateSelected];
      [self setImage:imageNotSelected forState:UIControlStateHighlighted | UIControlStateNormal];
      [self setImage:imageSelected forState:UIControlStateSelected | UIControlStateHighlighted];
      break;
    }
    case BookmarkButtonFlavorDetailsScreen: {
      UIImage *imageNotSelected = [[[UIImage imageNamed:@"bookmark-index"]
                                    imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate]
                                    tintedImage:[Colors get].bookmarkDetailScreen];
      UIImage *imageSelected = [[[UIImage imageNamed:@"bookmark-index-selected"]
                                 imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate]
                                 tintedImage:[Colors get].bookmarkDetailScreen];
      
      [self setImage:imageNotSelected forState:UIControlStateNormal];
      [self setImage:imageSelected forState:UIControlStateSelected];
      [self setImage:imageNotSelected forState:UIControlStateHighlighted | UIControlStateNormal];
      [self setImage:imageSelected forState:UIControlStateHighlighted | UIControlStateSelected];
      break;
    }
    case BookmarkButtonFlavorBottomSheet: {
      UIImage *imageNotSelected = [[[UIImage imageNamed:@"bookmark-index"]
                                    imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate]
                                    tintedImage:[Colors get].bookmarkUnselectedBottomSheetTintColor];
      UIImage *imageSelected = [[[UIImage imageNamed:@"bookmark-index-selected"]
                                 imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate]
                                 tintedImage:[Colors get].bookmarkSelectedBottomSheetTintColor];
      
      [self setImage:imageNotSelected forState:UIControlStateNormal];
      [self setImage:imageSelected forState:UIControlStateSelected];
      [self setImage:imageNotSelected forState:UIControlStateHighlighted | UIControlStateNormal];
      [self setImage:imageSelected forState:UIControlStateHighlighted | UIControlStateSelected];
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
