//
//  SighUpFormView.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <UIKit/UIKit.h>
#import "CommonTextField.h"

NS_ASSUME_NONNULL_BEGIN

@interface SignUpFormView : UIView<UITextFieldDelegate>

- (instancetype)initWithOnSubmit:(void (^)(NSString *, NSString *, NSString *))onSumbit;

@property (strong, nonatomic) CommonTextField *textFieldMail;

@end

NS_ASSUME_NONNULL_END
