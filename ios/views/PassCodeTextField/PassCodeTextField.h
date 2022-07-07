//
//  PassCodeTextField.h
//  greenTravel
//
//  Created by Alex K on 29.05.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface PassCodeTextField : UIView<UITextFieldDelegate>

@property(strong, nonatomic) NSString *text;
- (instancetype)init;

@end

NS_ASSUME_NONNULL_END
