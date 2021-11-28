//
//  LoadableDataViewController.m
//  greenTravel
//
//  Created by Alex K on 28.11.21.
//

#import "LoadableDataViewController.h"

@interface LoadableDataViewController ()

@end

@implementation LoadableDataViewController

- (void)viewDidLoad {
  [super viewDidLoad];
#pragma mark - No data view
  __weak typeof(self) weakSelf = self;
  self.noDataView = [[NoDataView alloc] initWithAction:^{
    [weakSelf onRetry];
  }];
  [self.view addSubview:self.noDataView];
  self.noDataView.translatesAutoresizingMaskIntoConstraints = NO;
  
  [NSLayoutConstraint activateConstraints:@[
    [self.noDataView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
    [self.noDataView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
    [self.noDataView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
    [self.noDataView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
  ]];
#pragma mark - Activity indicator view
  self.activityIndicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
  [self.view addSubview:self.activityIndicatorView];
  self.activityIndicatorView.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [self.activityIndicatorView.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
    [self.activityIndicatorView.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
  ]];  
}

- (void)setUpWithDataView {
    [self.activityIndicatorView setHidden:YES];
    [self.activityIndicatorView stopAnimating];
    [self.noDataView setHidden:YES];
    [self.dataView setHidden:NO];
}

- (void)setUpWithNoDataPlaceholder {
    [self.dataView setHidden:YES];
    [self.activityIndicatorView setHidden:YES];
    [self.activityIndicatorView stopAnimating];
    [self.noDataView setHidden:NO];
}

- (void)setUpWithActivityIndicator {
    [self.dataView setHidden:YES];
    [self.noDataView setHidden:YES];
    [self.activityIndicatorView setHidden:NO];
    [self.activityIndicatorView startAnimating];
}

- (void)onRetry {}

@end
