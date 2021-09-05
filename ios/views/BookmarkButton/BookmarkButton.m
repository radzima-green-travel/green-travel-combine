//
//  BookmarkButton.m
//  greenTravel
//
//  Created by Alex K on 5/5/21.
//

#import "BookmarkButton.h"
#import "ColorsLegacy.h"
#import "Colors.h"

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
  switch (self.flavor) {
    case BookmarkButtonFlavorBottomSheet:
      [self setImage:[UIImage imageNamed:@"bookmark"] forState:UIControlStateNormal];
      [self setImage:[UIImage imageNamed:@"bookmark"] forState:UIControlStateHighlighted];
      [self setImage:[UIImage imageNamed:@"bookmark-selected"] forState:UIControlStateSelected];
      [self setImage:[UIImage imageNamed:@"bookmark-selected"] forState:UIControlStateSelected | UIControlStateHighlighted];
    default:
      break;
  }
}

- (void)setUp {
  self.backgroundColor = UIColor.clearColor;
  [self setUpImages];
  self.translatesAutoresizingMaskIntoConstraints = NO;
  [self addTarget:self action:@selector(onPress:) forControlEvents:UIControlEventTouchUpInside];
  [NSLayoutConstraint activateConstraints:@[
    [self.widthAnchor constraintEqualToConstant:44.0],
    [self.heightAnchor constraintEqualToConstant:44.0],
  ]];
}

- (void)setUpImages {
  switch (self.flavor) {
    case BookmarkButtonFlavorIndex:
      [self setImage:[UIImage imageNamed:@"bookmark-index"] forState:UIControlStateNormal];
      [self setImage:[UIImage imageNamed:@"bookmark-index"] forState:UIControlStateHighlighted];
      [self setImage:[UIImage imageNamed:@"bookmark-index-selected"] forState:UIControlStateSelected];
      [self setImage:[UIImage imageNamed:@"bookmark-index-selected"] forState:UIControlStateSelected | UIControlStateHighlighted];
    case BookmarkButtonFlavorDetailsScreen: {
      UIImage *imageNotSelected = [[UIImage imageNamed:@"bookmark-index"] imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
      UIImage *imageSelected = [[UIImage imageNamed:@"bookmark-index-selected"] imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
      
      [self setImage:imageNotSelected forState:UIControlStateNormal];
      [self setImage:imageNotSelected forState:UIControlStateHighlighted];
      [self setImage:imageSelected forState:UIControlStateSelected];
      [self setImage:imageSelected forState:UIControlStateSelected | UIControlStateHighlighted];
      break;
    }
    case BookmarkButtonFlavorBottomSheet:
      [self setImage:[UIImage imageNamed:@"bookmark"] forState:UIControlStateNormal];
      [self setImage:[UIImage imageNamed:@"bookmark"] forState:UIControlStateHighlighted];
      [self setImage:[UIImage imageNamed:@"bookmark-selected"] forState:UIControlStateSelected];
      [self setImage:[UIImage imageNamed:@"bookmark-selected"] forState:UIControlStateSelected | UIControlStateHighlighted];
    default:
      break;
  }
}

- (void)onPress:(id)sender {
  self.onBookmarkPress(self.selected);
}

- (void)setBookmark:(BOOL)bookmarked {
  [self setSelected:bookmarked];
}

- (void)setOnBookmarkPress:(void(^)(BOOL))onBookmarkPress {
  _onBookmarkPress = onBookmarkPress;
}

@end
