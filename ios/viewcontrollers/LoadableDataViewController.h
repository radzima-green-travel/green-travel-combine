//
//  LoadableDataViewController.h
//  greenTravel
//
//  Created by Alex K on 28.11.21.
//

#import <UIKit/UIKit.h>
#import "NoDataView.h"
#import "BaseViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface LoadableDataViewController : BaseViewController

@property (strong, nonatomic) UIActivityIndicatorView *activityIndicatorView;
@property (strong, nonatomic) UIScrollView *dataView;
@property (strong, nonatomic) NoDataView *noDataView;
- (void)setUpWithDataView;
- (void)setUpWithNoDataPlaceholder;
- (void)setUpWithActivityIndicator;
- (void)onRetry;

@end

NS_ASSUME_NONNULL_END
