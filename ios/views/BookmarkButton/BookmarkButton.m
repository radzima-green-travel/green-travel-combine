//
//  BookmarkButton.m
//  greenTravel
//
//  Created by Alex K on 5/5/21.
//

#import "BookmarkButton.h"
#import "Colors.h"

@interface BookmarkButton()

@property (copy, nonatomic) void(^onBookmarkPress)(BOOL);

@end

@implementation BookmarkButton

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithOnBookmarkPress:(void(^)(BOOL))onBookmarkPress {
  self = [super init];
  if (self) {
    _onBookmarkPress = onBookmarkPress;
    [self setUp];
  }
  return self;
}

- (void)setUp {
  self.translatesAutoresizingMaskIntoConstraints = NO;
  self.backgroundColor = [Colors get].white;
  
  [self setImage:[UIImage imageNamed:@"bookmark"] forState:UIControlStateNormal];
  [self setImage:[UIImage imageNamed:@"bookmark-selected"] forState:UIControlStateSelected];
  [self addTarget:self action:@selector(onPress:) forControlEvents:UIControlEventTouchUpInside];
  [NSLayoutConstraint activateConstraints:@[
    [self.widthAnchor constraintEqualToConstant:44.0],
    [self.heightAnchor constraintEqualToConstant:44.0],
  ]];
}

- (void)onPress:(id)sender {
  self.onBookmarkPress(self.selected);
}

- (void)setBookmark:(BOOL)bookmarked {
  [self setSelected:bookmarked];
}

@end
