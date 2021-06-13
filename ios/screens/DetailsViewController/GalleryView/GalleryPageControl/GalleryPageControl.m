//
//  GalleryPageControl.m
//  GreenTravel
//
//  Created by Alex K on 12/12/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "GalleryPageControl.h"
#import "ColorsLegacy.h"
#import "DotSizes.h"

typedef NS_ENUM(NSInteger, PageControlState) {
    PageControlStateLeftDots5,
    PageControlStateLeftDots6,
    PageControlStateDots7,
    PageControlStateRightDots6,
    PageControlStateRightDots5
};

typedef NS_ENUM(NSInteger, DotSize) {
    DotSizeXS,
    DotSizeS,
    DotSizeM,
    DotSizeL
};

typedef NS_OPTIONS(NSInteger, DotsGrow) {
    DotsGrowOff = 1 << 0,
    DotsGrowConstant = 1 << 1,
    DotsGrowDown = 1 << 2,
    DotsGrowUp = 1 << 3
};

struct IndexWindow {
    NSInteger left;
    NSInteger right;
};

struct CenterOffsetCompensation {
    CGFloat animationStart;
    CGFloat animationEnd;
    CGFloat competion;
};

static const CGFloat kDotScaleMedium = 5.0 / 7.0;
static const CGFloat kDotScaleSmall = 3.0 / 7.0;
static const CGFloat kDotScaleExtraSmall = 0.2;

static const CGFloat kDotWidth = 7.0;
static const CGFloat kSpacing = 5.0;

static const CGFloat kAnimationDuration = 0.2;
static const CGFloat kAnimationDurationSkip = 0.01;

static const NSUInteger kMaxNumberOfDotsOnStart = 5;
static const NSUInteger kMinNumberOfPagesWhenToSwitchToContinuousMode = 6;

NSInteger indexWindowLength(struct IndexWindow indexWindow) {
    return indexWindow.right - indexWindow.left + 1;
}

BOOL indexWindowEquals(struct IndexWindow indexWindowA, struct IndexWindow indexWindowB) {
    return indexWindowA.right == indexWindowB.right &&
            indexWindowA.left == indexWindowB.left;
}

NSUInteger normalizedPage(NSUInteger page, struct IndexWindow indexWindow) {
    return page - indexWindow.left;
}

NSUInteger normalizedPageRight(NSUInteger page, struct IndexWindow indexWindow) {
    return indexWindow.right - page;
}

CGFloat dotsWidth(NSInteger dotCount) {
    return dotCount * kDotWidth + (dotCount - 1) * kSpacing;
}

CGFloat centerCompensation(NSUInteger dotCountLeft, NSUInteger dotCountRight) {
    CGFloat threeDotsWidth = dotsWidth(3);
    CGFloat offset = (dotsWidth(3 + dotCountRight - dotCountLeft) - threeDotsWidth) / 2;
    return offset;
}

@interface GalleryPageControl ()

@property (strong, nonatomic) UIScrollView *scrollView;
@property (strong, nonatomic) UIStackView *contentView;
@property (strong, nonatomic) UIPageControl *pageControl;
@property (strong, nonatomic) NSArray<NSString *> *imageURLs;
@property (assign, nonatomic) CGFloat aspectRatio;
@property (assign, nonatomic) CGFloat indexOfScrolledItem;
@property (strong, nonatomic) NSLayoutConstraint *centerOffsetConstraint;
@property (assign, nonatomic) BOOL continuousMode;
@property (strong, nonatomic) NSMutableArray<void(^)(void)> *queueAnimations;
@property (assign, nonatomic) BOOL queueIsUnblocked;
@property (assign, nonatomic) CGFloat animationDuration;

@property (nonatomic, assign) NSInteger numberOfPages;
@property (nonatomic, assign) NSInteger currentPage;
@property (assign, nonatomic) PageControlState pageControlState;
@property (assign, nonatomic) struct IndexWindow indexWindow;

@end

@implementation GalleryPageControl

- (instancetype)initWithNumberOfPages:(NSUInteger)numberOfPages {
    self = [super initWithFrame:CGRectZero];
    if (self) {
        [self setUp];
        [self setNumberOfPages:numberOfPages];
    }
    return self;
}

#pragma mark - Set up
- (void)setUp {
    self.pageControlState = PageControlStateLeftDots5;
    self.currentPage = 0;
    self.queueAnimations = [[NSMutableArray alloc] init];
    self.queueIsUnblocked = YES;
    self.animationDuration = kAnimationDuration;
    
#pragma mark - Content view
    self.contentView = [[UIStackView alloc] init];
    self.contentView.alignment = UIStackViewAlignmentCenter;
    self.contentView.distribution = UIStackViewDistributionFill;
    self.contentView.spacing = kSpacing;
    self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
    [self addSubview:self.contentView];
    self.centerOffsetConstraint =
    [self.contentView.centerXAnchor constraintEqualToAnchor:self.centerXAnchor
                                                   constant:0];
    [NSLayoutConstraint activateConstraints:@[
        [self.contentView.topAnchor constraintEqualToAnchor:self.topAnchor],
        self.centerOffsetConstraint,
        [self.contentView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
        [self.contentView.heightAnchor constraintEqualToAnchor:self.heightAnchor]
    ]];
}

- (void)setNumberOfPages:(NSInteger)numberOfPages {
    _numberOfPages = numberOfPages;
    self.continuousMode = numberOfPages >= kMinNumberOfPagesWhenToSwitchToContinuousMode;
    NSUInteger indexWindowRight = fmin(kMaxNumberOfDotsOnStart, numberOfPages) - 1;
    self.indexWindow = (struct IndexWindow){0, indexWindowRight};
    NSUInteger maxVisibleDotsOnStart = fmin(kMaxNumberOfDotsOnStart, _numberOfPages);
    for (UIView *subview in self.contentView.subviews) {
        [self.contentView removeArrangedSubview:subview];
        [subview removeFromSuperview];
    }
    for (int counter = 0; counter < maxVisibleDotsOnStart; counter++) {
        [self.contentView addArrangedSubview:[self createDotView]];
    }
    if (_numberOfPages > kMaxNumberOfDotsOnStart) {
        [self applyDotSizes:@[@(DotSizeL), @(DotSizeL), @(DotSizeL), @(DotSizeM), @(DotSizeS)]];
        [self updateCenterOffsetCompensation:centerCompensation(0, 2)];
    } else {
        [self applyDotSizes:[self fillDotSizeStandardForNumberOfPages:_numberOfPages]];
    }
    [self applyDotColorsWithCurrentPage:0 indexWindow:(struct IndexWindow){0, indexWindowRight}];
}

- (NSArray<NSNumber *>*)fillDotSizeStandardForNumberOfPages:(NSUInteger)numberOfPages {
    NSMutableArray<NSNumber *> *dotSizes = [[NSMutableArray alloc] init];
    for (NSUInteger counter = 0; counter < _numberOfPages; counter++) {
        [dotSizes addObject:@(DotSizeL)];
    }
    return [dotSizes copy];
}

#pragma mark - Move to next page
- (void)moveToNextPage {
    __weak typeof(self) weakSelf = self;
    [self enqueueMoveToPage:^{
        [weakSelf moveToPage:YES];
    }];
}

- (void)moveToPrevPage {
    __weak typeof(self) weakSelf = self;
    [self enqueueMoveToPage:^{
        [weakSelf moveToPage:NO];
    }];
}

- (void)enqueueMoveToPage:(void(^)(void))moveToPage {
    [self.queueAnimations addObject:moveToPage];
    [self launchWorkIfPossible];
}

- (void)launchWorkIfPossible {
    if (self.queueIsUnblocked && [self.queueAnimations count]) {
        void(^enquedMoveToPage)(void) = self.queueAnimations[0];
        [self.queueAnimations removeObjectAtIndex:0];
        enquedMoveToPage();
    }
}

- (void)moveToPage:(BOOL)next {
    self.queueIsUnblocked = NO;
    NSUInteger nextPage = self.currentPage + (next ? 1 : -1);
    PageControlState prevState = self.pageControlState;
    PageControlState nextState = [self getNextState:self.pageControlState
                                        forNextPage:nextPage];
    struct IndexWindow prevIndexWindow = self.indexWindow;
    struct IndexWindow nextIndexWindow =
    [self getNextIndexWindowForPrevState:self.pageControlState
                               nextState:nextState nextPage:nextPage
                         prevIndexWindow:self.indexWindow];
    DotsGrow growBehavior =
    [self getNextDotsGrowStateFromPrevIndexWindow:self.indexWindow
                                  nextIndexWindow:nextIndexWindow];
    BOOL indexWindowMoved = indexWindowEquals(prevIndexWindow, nextIndexWindow);
    DotSizes *dotSizes =
    [self prepareDotsBeforeAnimationForPrevState:prevState
                                       nextState:nextState
                                            next:next
                                indexWindowMoved:indexWindowMoved
                                   numberOfPages:self.numberOfPages];
    struct CenterOffsetCompensation centerCompensation =
    [self getCenterOffsetCompensation:prevState nextState:nextState next:next
                     indexWindowMoved:indexWindowMoved];
#pragma mark - Setting new state
    self.pageControlState = nextState;
    [self setCurrentPage:nextPage];
    self.indexWindow = nextIndexWindow;
    
    __weak typeof(self) weakSelf = self;
    if (growBehavior & DotsGrowOff || !self.continuousMode) {
        [self applyDotSizes:dotSizes.before];
        [self updateCenterOffsetCompensation:centerCompensation.animationStart];
        UIViewPropertyAnimator *moveAnimator = [[UIViewPropertyAnimator alloc] initWithDuration:weakSelf.animationDuration curve:UIViewAnimationCurveLinear animations:^{
            [weakSelf applyDotColorsWithCurrentPage:nextPage indexWindow:nextIndexWindow];
            [weakSelf applyDotSizes:dotSizes.after];
            [weakSelf updateCenterOffsetCompensation:centerCompensation.animationEnd];
        }];
        [moveAnimator startAnimation];
        [moveAnimator addCompletion:^(UIViewAnimatingPosition finalPosition) {
            [weakSelf updateCenterOffsetCompensation:centerCompensation.competion];
            weakSelf.queueIsUnblocked = YES;
            [weakSelf launchWorkIfPossible];
        }];
        return;
    }
    
    NSInteger prevCount = [self.contentView.arrangedSubviews count];
    if (growBehavior & DotsGrowUp || growBehavior & DotsGrowConstant) {
        [self.contentView insertArrangedSubview:[self createDotView]
                                        atIndex:next ? prevCount : 0];
    } else {
        [self.contentView.arrangedSubviews[next ? 0 : prevCount - 1] removeFromSuperview];
    }
    [self applyDotSizes:dotSizes.before];
    NSInteger newCount = [self.contentView.arrangedSubviews count];
    
    [self updateCenterOffsetCompensation:centerCompensation.animationStart];
    
    UIViewPropertyAnimator *moveAnimator =
    [[UIViewPropertyAnimator alloc] initWithDuration:weakSelf.animationDuration
                                               curve:UIViewAnimationCurveLinear
                                          animations:^{
        if (growBehavior & DotsGrowConstant) {
            [weakSelf applyDotColorsWithCurrentPage:nextPage + (next ? 1 : 0) indexWindow:nextIndexWindow];
        } else {
            [weakSelf applyDotColorsWithCurrentPage:nextPage indexWindow:nextIndexWindow];
        }
        [weakSelf applyDotSizes:dotSizes.after];
        [weakSelf updateCenterOffsetCompensation:centerCompensation.animationEnd];
    }];
    [moveAnimator addCompletion:^(UIViewAnimatingPosition finalPosition) {
        if (growBehavior & DotsGrowConstant) {
            [weakSelf.contentView.arrangedSubviews[next ? 0 : newCount - 1] removeFromSuperview];
        }
        [weakSelf updateCenterOffsetCompensation:centerCompensation.competion];
        weakSelf.queueIsUnblocked = YES;
        [weakSelf launchWorkIfPossible];
    }];
    [moveAnimator startAnimation];
}

- (void)updateCenterOffsetCompensation:(CGFloat)centerCompensation {
    self.centerOffsetConstraint.constant = centerCompensation;
    [self setNeedsLayout];
    [self layoutIfNeeded];
}

#pragma mark - Center offset compensation
- (struct CenterOffsetCompensation)getCenterOffsetCompensation:(PageControlState)prevState
                                                     nextState:(PageControlState)nextState
                                                          next:(BOOL)next
                                              indexWindowMoved:(BOOL)indexWindowMoved {
    if (!self.continuousMode) {
        return (struct CenterOffsetCompensation){0.0, 0.0, 0.0};
    }
    switch (prevState) {
        case PageControlStateLeftDots5:
            if (nextState == PageControlStateLeftDots6) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(0, 3), centerCompensation(1, 2),
                    centerCompensation(1, 2)
                };
            }
            return (struct CenterOffsetCompensation){
                centerCompensation(0, 2), centerCompensation(0, 2),
                centerCompensation(0, 2)
            };
        case PageControlStateLeftDots6:
            if (nextState == PageControlStateDots7) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(1, 3), centerCompensation(2, 2),
                    centerCompensation(2, 2)
                };
            }
            if (nextState == PageControlStateLeftDots5) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(1, 1), centerCompensation(0, 2),
                    centerCompensation(0, 2)
                };
            }
            if (nextState == PageControlStateRightDots6) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(1, 2), centerCompensation(2, 1),
                    centerCompensation(2, 1)
                };
            }
            return (struct CenterOffsetCompensation){
                centerCompensation(1, 2), centerCompensation(1, 2),
                centerCompensation(1, 2)
            };
        case PageControlStateDots7:
            if (nextState == prevState && next && !indexWindowMoved) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(2, 3), centerCompensation(3, 2),
                    centerCompensation(2, 2)
                };
            }
            if (nextState == prevState && !next && !indexWindowMoved) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(3, 2), centerCompensation(2, 3),
                    centerCompensation(2, 2)
                };
            }
            if (nextState == PageControlStateRightDots6) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(1, 2), centerCompensation(2, 1),
                    centerCompensation(2, 1)
                };
            } else if (nextState == PageControlStateLeftDots6) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(2, 1), centerCompensation(1, 2),
                    centerCompensation(1, 2)
                };
            }
            return (struct CenterOffsetCompensation){
                centerCompensation(2, 2), centerCompensation(2, 2),
                centerCompensation(2, 2)
            };
        case PageControlStateRightDots6:
            if (nextState == PageControlStateRightDots5) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(1, 1), centerCompensation(2, 0),
                    centerCompensation(2, 0)
                };
            }
            if (nextState == PageControlStateDots7) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(3, 1), centerCompensation(2, 2),
                    centerCompensation(2, 2)
                };
            }
            if (nextState == PageControlStateLeftDots6) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(2, 1), centerCompensation(1, 2),
                    centerCompensation(1, 2)
                };
            }
            return (struct CenterOffsetCompensation){
                centerCompensation(2, 1), centerCompensation(2, 1),
                centerCompensation(2, 1)
            };
        case PageControlStateRightDots5:
            if (nextState == PageControlStateRightDots6) {
                return (struct CenterOffsetCompensation){
                    centerCompensation(3, 0), centerCompensation(2, 1),
                    centerCompensation(2, 1)
                };
            }
            return (struct CenterOffsetCompensation){
                centerCompensation(2, 0), centerCompensation(2, 0),
                centerCompensation(2, 0)
            };
    }
    return (struct CenterOffsetCompensation){0.0, 0.0, 0.0};
}

- (void)toggleSkipAnimation {
    __weak typeof(self) weakSelf = self;
    self.animationDuration = kAnimationDurationSkip;
    [NSTimer scheduledTimerWithTimeInterval:0.5 repeats:NO block:^(NSTimer * _Nonnull timer) {
        weakSelf.animationDuration = kAnimationDuration;
    }];
}

- (void)dispose {
    
}

#pragma mark - Prepare dot sizes
- (DotSizes *)prepareDotsBeforeAnimationForPrevState:(PageControlState)prevState
                                     nextState:(PageControlState)nextState
                                                next:(BOOL)next
                                    indexWindowMoved:(BOOL)indexWindowMoved
                                       numberOfPages:(NSUInteger)numberOfPages {
    DotSizes *dotsIndexes = [[DotSizes alloc] init];
    if (!self.continuousMode) {
        dotsIndexes.before = dotsIndexes.after =
        [self fillDotSizeStandardForNumberOfPages:numberOfPages];
        return dotsIndexes;
    }
    switch (prevState) {
        case PageControlStateLeftDots5:
            if (nextState == PageControlStateLeftDots6) {
                dotsIndexes.before = @[@(DotSizeL), @(DotSizeL), @(DotSizeL),
                                       @(DotSizeM), @(DotSizeS), @(DotSizeXS)];
                dotsIndexes.after = @[@(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeM), @(DotSizeS)];
            } else {
                dotsIndexes.before = dotsIndexes.after =
                @[@(DotSizeL), @(DotSizeL), @(DotSizeL), @(DotSizeM), @(DotSizeS)];
            }
            break;
        case PageControlStateLeftDots6:
            if (nextState == PageControlStateDots7) {
                dotsIndexes.before = @[@(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeM), @(DotSizeS), @(DotSizeXS)];
                dotsIndexes.after = @[@(DotSizeS), @(DotSizeM), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeL), @(DotSizeM), @(DotSizeS)];
            } else if (nextState == PageControlStateLeftDots5) {
                dotsIndexes.before = @[@(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeM), @(DotSizeS)];
                dotsIndexes.after = @[@(DotSizeL), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeM), @(DotSizeS)];
            } else if (nextState == PageControlStateRightDots6) {
                dotsIndexes.before = @[@(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeM), @(DotSizeS)];
                dotsIndexes.after = @[@(DotSizeS), @(DotSizeM), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeL), @(DotSizeM)];
            } else {
                dotsIndexes.before = dotsIndexes.after =
                @[@(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL), @(DotSizeM), @(DotSizeS)];
            }
            break;
        case PageControlStateDots7:
            if (nextState == prevState && next && !indexWindowMoved) {
                dotsIndexes.before = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeM), @(DotSizeS), @(DotSizeXS)];
                dotsIndexes.after = @[@(DotSizeXS), @(DotSizeS), @(DotSizeM), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeL), @(DotSizeM), @(DotSizeS)];
            } else if (nextState == prevState && !next && !indexWindowMoved) {
                dotsIndexes.before = @[@(DotSizeXS), @(DotSizeS), @(DotSizeM), @(DotSizeL),
                                       @(DotSizeL), @(DotSizeL), @(DotSizeM), @(DotSizeS)];
                dotsIndexes.after = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeM), @(DotSizeS), @(DotSizeXS)];
            } else if (nextState == PageControlStateRightDots6) {
                dotsIndexes.before = @[@(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeM), @(DotSizeS)];
                dotsIndexes.after = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL), @(DotSizeM)];
            } else if (nextState == PageControlStateLeftDots6) {
                dotsIndexes.before = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),
                                       @(DotSizeL), @(DotSizeM)];
                dotsIndexes.after = @[@(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeM), @(DotSizeS)];
            } else {
                dotsIndexes.before = dotsIndexes.after =
                @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),@(DotSizeL), @(DotSizeM), @(DotSizeS)];
            }
            break;
        case PageControlStateRightDots6:
            if (nextState == PageControlStateRightDots5) {
                dotsIndexes.before = @[@(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL),
                                       @(DotSizeM)];
                dotsIndexes.after = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeL)];
            } else if (nextState == PageControlStateDots7) {
                dotsIndexes.before = @[@(DotSizeXS), @(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),
                                       @(DotSizeL), @(DotSizeM)];
                dotsIndexes.after = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeM), @(DotSizeS)];
            } else if (nextState == PageControlStateLeftDots6) {
                dotsIndexes.before = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL),
                                       @(DotSizeM)];
                dotsIndexes.after = @[@(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeM), @(DotSizeS)];
            } else {
                dotsIndexes.before = dotsIndexes.after =
                @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL), @(DotSizeM)];
            }
            break;
        case PageControlStateRightDots5:
            if (nextState == PageControlStateRightDots6) {
                dotsIndexes.before = @[@(DotSizeXS), @(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL),
                                       @(DotSizeL)];
                dotsIndexes.after = @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL),
                                      @(DotSizeM)];
            } else {
                dotsIndexes.before = dotsIndexes.after =
                @[@(DotSizeS), @(DotSizeM), @(DotSizeL), @(DotSizeL), @(DotSizeL)];
            }
            break;
    }
    return dotsIndexes;
}

#pragma mark - Apply dot attributes
- (void)applyDotColorsWithCurrentPage:(NSUInteger)currentPage
           indexWindow:(struct IndexWindow)indexWindow {
    NSUInteger currentDotIndex = normalizedPage(currentPage, indexWindow);
    [self.contentView.arrangedSubviews
    enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull dotView,
                  NSUInteger dotIndex, BOOL * _Nonnull stop) {
    if (dotIndex == currentDotIndex) {
        dotView.backgroundColor = [ColorsLegacy get].apple;
    } else {
        dotView.backgroundColor = [ColorsLegacy get].alto;
    }}];
}

- (void)applyDotSizes:(NSArray<NSNumber *>*)dotSizes {
    [self.contentView.arrangedSubviews
     enumerateObjectsWithOptions:0
     usingBlock:^(__kindof UIView * _Nonnull dotView,
                  NSUInteger dotIndex, BOOL * _Nonnull stop) {
        switch ([dotSizes[dotIndex] intValue]) {
            case DotSizeXS:
                dotView.transform = CGAffineTransformScale(CGAffineTransformIdentity, kDotScaleExtraSmall, kDotScaleExtraSmall);
                return;
            case DotSizeS:
                dotView.transform = CGAffineTransformScale(CGAffineTransformIdentity, kDotScaleSmall, kDotScaleSmall);
                return;
            case DotSizeM:
                dotView.transform = CGAffineTransformScale(CGAffineTransformIdentity, kDotScaleMedium, kDotScaleMedium);
                return;
            case DotSizeL:
                dotView.transform = CGAffineTransformIdentity;
                return;
        }
    }];
}

#pragma mark - Create dot view

- (UIView *)createDotView {
    UIView *dotView = [[UIView alloc] init];
    dotView.translatesAutoresizingMaskIntoConstraints = NO;
    [NSLayoutConstraint activateConstraints:@[
        [dotView.widthAnchor constraintEqualToConstant:kDotWidth],
        [dotView.heightAnchor constraintEqualToConstant:kDotWidth],
    ]];
    dotView.layer.cornerRadius = kDotWidth / 2;
    dotView.backgroundColor = [ColorsLegacy get].alto;
    return dotView;
}

#pragma mark - State transition
- (PageControlState)getNextState:(PageControlState)prevState
                       forNextPage:(NSInteger)nextPage {
    NSInteger currentPage = self.currentPage;
    if (!self.continuousMode) {
        return PageControlStateLeftDots5;
    }
    if (labs(nextPage - currentPage) <= 1) {
        switch (prevState) {
            case PageControlStateLeftDots5:
                if (nextPage <= 2) {
                    return PageControlStateLeftDots5;
                }
                return PageControlStateLeftDots6;
            case PageControlStateLeftDots6:
                if (nextPage < 1) {
                    return PageControlStateLeftDots5;
                }
                if (nextPage > 3 && self.numberOfPages ==
                    kMinNumberOfPagesWhenToSwitchToContinuousMode) {
                    return PageControlStateRightDots6;
                }
                if (nextPage > 3) {
                    return PageControlStateDots7;
                }
                return PageControlStateLeftDots6;
            case PageControlStateDots7:
                if (nextPage == 1) {
                    return PageControlStateLeftDots6;
                }
                if (nextPage == self.numberOfPages - 2) {
                    return PageControlStateRightDots6;
                }
                return PageControlStateDots7;
            case PageControlStateRightDots6:
                if (nextPage > self.numberOfPages - 2) {
                    return PageControlStateRightDots5;
                }
                if (nextPage < self.numberOfPages - 4 && self.numberOfPages == kMinNumberOfPagesWhenToSwitchToContinuousMode) {
                    return PageControlStateLeftDots6;
                }
                if (nextPage < self.numberOfPages - 4) {
                    return PageControlStateDots7;
                }
                return PageControlStateRightDots6;
            case PageControlStateRightDots5:
                if (nextPage < self.numberOfPages - 3) {
                    return PageControlStateRightDots6;
                }
                return PageControlStateRightDots5;
        }
        return self.pageControlState;
    }
    PageControlState newState = prevState;
    while (labs(nextPage - currentPage) > 1) {
        NSInteger decrementedNextPage = nextPage < currentPage ? nextPage + 1 : nextPage - 1;
        newState = [self getNextState:newState forNextPage:decrementedNextPage];
    }
    return newState;
}

#pragma mark - Grow state
- (DotsGrow)getNextDotsGrowStateFromPrevIndexWindow:(struct IndexWindow)prevIndexWindow
             nextIndexWindow:(struct IndexWindow)nextIndexWindow {
    if (indexWindowEquals(prevIndexWindow, nextIndexWindow)) {
        return DotsGrowOff;
    }
    NSUInteger indexWindowLengthPrev = indexWindowLength(prevIndexWindow);
    NSUInteger indexWindowLengthNext = indexWindowLength(nextIndexWindow);
    if (indexWindowLengthPrev < indexWindowLengthNext) {
        return DotsGrowUp;
    }
    if (indexWindowLengthPrev > indexWindowLengthNext) {
        return DotsGrowDown;
    }
    return DotsGrowConstant;
}

#pragma mark - Index window
- (struct IndexWindow)getNextIndexWindowForPrevState:(PageControlState)prevState
                               nextState:(PageControlState)nextState
                                nextPage:(NSUInteger)nextPage
             prevIndexWindow:(struct IndexWindow)prevIndexWindow {
    if (!self.continuousMode) {
        return prevIndexWindow;
    }
    switch (prevState) {
        case PageControlStateLeftDots5:
            if (nextState == PageControlStateLeftDots6) {
                return (struct IndexWindow){
                    prevIndexWindow.left,
                    prevIndexWindow.right + 1
                };
            }
            return prevIndexWindow;
        case PageControlStateLeftDots6:
            if (nextState == PageControlStateDots7) {
                return (struct IndexWindow){
                    prevIndexWindow.left,
                    prevIndexWindow.right + 1
                };
            }
            if (nextState == PageControlStateLeftDots5) {
                return (struct IndexWindow) {
                    prevIndexWindow.left,
                    prevIndexWindow.right - 1
                };
            }
            if (nextState == PageControlStateRightDots6) {
                return (struct IndexWindow) {
                    prevIndexWindow.left,
                    prevIndexWindow.right
                };
            }
            return prevIndexWindow;
        case PageControlStateDots7:
            if (nextState == prevState) {
                if (normalizedPage(nextPage, prevIndexWindow) > 4) {
                    return (struct IndexWindow){
                        prevIndexWindow.left + 1,
                        prevIndexWindow.right + 1
                    };
                }
                if (normalizedPage(nextPage, prevIndexWindow) < 2) {
                    return (struct IndexWindow){
                        prevIndexWindow.left - 1,
                        prevIndexWindow.right - 1
                    };
                }
                return prevIndexWindow;
            }
            if (nextState == PageControlStateRightDots6) {
                return (struct IndexWindow){
                    prevIndexWindow.left + 1,
                    prevIndexWindow.right
                };
            }
            if (nextState == PageControlStateLeftDots6) {
                return (struct IndexWindow){
                    prevIndexWindow.left,
                    prevIndexWindow.right - 1
                };
            }
            return prevIndexWindow;
        case PageControlStateRightDots6:
            if (nextState == PageControlStateRightDots5) {
                return (struct IndexWindow){
                    prevIndexWindow.left + 1,
                    prevIndexWindow.right
                };
            }
            if (nextState == PageControlStateDots7) {
                return (struct IndexWindow){
                    prevIndexWindow.left - 1,
                    prevIndexWindow.right
                };
            }
            if (nextState == PageControlStateLeftDots6) {
                return (struct IndexWindow) {
                    prevIndexWindow.left,
                    prevIndexWindow.right
                };
            }
            return prevIndexWindow;
        case PageControlStateRightDots5:
            if (nextState == PageControlStateRightDots6) {
                return (struct IndexWindow){
                    prevIndexWindow.left - 1,
                    prevIndexWindow.right
                };
            }
            return prevIndexWindow;
    }
    return prevIndexWindow;
}

- (UIAccessibilityTraits)accessibilityTraits {
    return [super accessibilityTraits] | UIAccessibilityTraitAdjustable;
}

- (void)accessibilityIncrement {
    [self moveToNextPage];
    [self sendActionsForControlEvents:UIControlEventValueChanged];
}

- (void)accessibilityDecrement {
    [self moveToPrevPage];
    [self sendActionsForControlEvents:UIControlEventValueChanged];
} 

@end
