//
//  UIViewController+extensions.m
//  greenTravel
//
//  Created by Vitali Nabarouski on 4.12.22.
//

#import "UIViewController+extensions.h"

@implementation UIViewController (Extensions)

- (void)showAlertWith:(NSString *)title message:(NSString *)message actions:(NSArray<UIAlertAction *> *)actions handler:(void (^)(UIAlertAction*))handler {
  UIAlertController * alertController = [UIAlertController alertControllerWithTitle:title
                                                                            message:message
                                                                     preferredStyle:UIAlertControllerStyleAlert];
  // TODO: make custom UIAlertAction initializer for simplify adding in to actions array
  [actions enumerateObjectsUsingBlock:^(UIAlertAction* action, NSUInteger index, BOOL * _Nonnull stop) {
    UIAlertAction *alertAction = [UIAlertAction actionWithTitle:action.title style:action.style handler:^(UIAlertAction * _Nonnull action) {
      handler(action);
    }];
    [alertController addAction:alertAction];
  }];
  
  [self presentViewController:alertController animated:true completion:nil];
  
}
  // Function for testing. It'll be removed at future
- (void)showAlertWith:(nullable NSString *)title message:(nullable NSString *)message handler:(void (^)(NSString*))handler {
  UIAlertController * alertController = [UIAlertController alertControllerWithTitle:title
                                                                            message:message
                                                                     preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    handler(@"OK");
  }];
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    handler(@"Cancel");
  }];
  
  [alertController addAction:okAction];
  [alertController addAction:cancelAction];
  
  [self presentViewController:alertController animated:true completion:nil];
}

@end
