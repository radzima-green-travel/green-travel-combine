//
//  ResetPasswordEMailViewController.h
//  greenTravel
//
//  Created by Alex K on 15.06.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"
#import "BaseFormViewController.h"
#import "CommonTextField.h"

NS_ASSUME_NONNULL_BEGIN

@interface ResetPasswordEMailViewController : BaseFormViewController<UserModelObserver>

@property (strong, nonatomic) CommonTextField *textFieldMail;

@end

NS_ASSUME_NONNULL_END
