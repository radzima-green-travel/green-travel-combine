//
//  CommonTextField.h
//  greenTravel
//
//  Created by Alex K on 21.05.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface CommonTextField: UIView

@property (strong, nonatomic) UITextField *textField;
@property (strong, nonatomic) NSLayoutConstraint *trailingConstraint;
- (instancetype)initWithImageName:(NSString *)imageName
                     keyboardType:(UIKeyboardType)keyboardType
                      placeholder:(NSString *)placeholder;
- (void)setUp:(NSString *)imageName
 keyboardType:(UIKeyboardType)keyboardType
  placeholder:(NSString *)placeholder;

@end

NS_ASSUME_NONNULL_END
