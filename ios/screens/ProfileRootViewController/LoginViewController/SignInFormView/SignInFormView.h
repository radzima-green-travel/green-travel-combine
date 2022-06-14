//
//  SignInFormView.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface SignInFormView : UIView

- (instancetype)initWithOnSubmit:(void (^)(NSString *, NSString *, NSString *))onSumbit
          onForgotPasswordSubmit:(void (^)(void))onForgotPasswordSubmit;

@end

NS_ASSUME_NONNULL_END
