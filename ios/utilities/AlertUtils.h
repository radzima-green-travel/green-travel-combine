//
//  AlertUtils.h
//  greenTravel
//
//  Created by Alex K on 5/30/21.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

void showAlertGoToSettings(UIViewController *presenter);
void showAlertCantPlotRoute(UIViewController *presenter);
void showAlertGeneric(UIViewController *presenter, NSString *messageHeader,
                      NSString *messageBody, BOOL dangerousAction, void(^onOK)(void));

NS_ASSUME_NONNULL_END
