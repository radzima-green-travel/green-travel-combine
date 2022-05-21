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
- (instancetype)initWithImageName:(NSString *)imageName
                      placeholder:(NSString *)placeholder;
- (void)setUp:(NSString *)imageName
  placeholder:(NSString *)placeholder;

@end

NS_ASSUME_NONNULL_END
