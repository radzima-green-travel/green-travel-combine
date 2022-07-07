//
//  SecureTextField.h
//  greenTravel
//
//  Created by Alex K on 21.05.22.
//

#import "CommonTextField.h"

NS_ASSUME_NONNULL_BEGIN

@interface SecureTextField : CommonTextField

@property(assign, nonatomic) BOOL creatingPassword;

@end

NS_ASSUME_NONNULL_END
