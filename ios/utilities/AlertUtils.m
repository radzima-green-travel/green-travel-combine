//
//  AlertUtils.m
//  greenTravel
//
//  Created by Alex K on 5/30/21.
//

#import "AlertUtils.h"

void showAlertGoToSettings(UIViewController *presenter) {
  UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Доступ к местоположению"
                                                                 message:@"Разрешите доступ к местоположению в настройках"
                                                                 preferredStyle:UIAlertControllerStyleAlert];
  [alert addAction:[UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action){}]];
  [alert addAction:[UIAlertAction actionWithTitle:@"Settings" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString] options:@{} completionHandler:^(BOOL success) {}];
  }]];
  [presenter presentViewController:alert animated:YES completion:^{}];
}
