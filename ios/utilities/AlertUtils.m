//
//  AlertUtils.m
//  greenTravel
//
//  Created by Alex K on 5/30/21.
//

#import "AlertUtils.h"

void showAlertGoToSettings(UIViewController *presenter) {
  UIAlertController *alert =
  [UIAlertController alertControllerWithTitle:NSLocalizedString(@"AllowGeolocationAlertMessageHeader", @"")
                                      message:NSLocalizedString(@"AllowGeolocationAlertMessageBody", @"")
                               preferredStyle:UIAlertControllerStyleAlert];
  [alert addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"AlertCancel", @"") style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action){}]];
  [alert addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"AlertSettings", @"") style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString] options:@{} completionHandler:^(BOOL success) {}];
  }]];
  [presenter presentViewController:alert animated:YES completion:^{}];
}

void showAlertCantPlotRoute(UIViewController *presenter) {
  UIAlertController *alert =
  [UIAlertController alertControllerWithTitle:NSLocalizedString(@"BuildRouteErrorAlertMessageHeader", @"")
                                      message:NSLocalizedString(@"BuildRouteErrorAlertMessageBody", @"")
                               preferredStyle:UIAlertControllerStyleAlert];
  [alert addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"AlertOK", @"") style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
  }]];
  [presenter presentViewController:alert animated:YES completion:^{}];
}
