//
//  UIButton+UIButton_extensions.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 2.08.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIButton (Extensions)

- (void)setSelectedImageForStates:(nonnull UIImage *)imageSelected notSelected:(nonnull UIImage *)imageNotSelected;

@end

NS_ASSUME_NONNULL_END
