//
//  MapButton.h
//  GreenTravel
//
//  Created by Alex K on 3/4/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface MapButton : UIButton

- (instancetype)initWithImageName:(NSString *)imageName
                           target:(id)target
                         selector:(SEL)selector
        imageCenterXAnchorConstant:(CGFloat)imageCenterXAnchorConstant
        imageCenterYAnchorConstant:(CGFloat)imageCenterYAnchorConstant;
- (void)setIconImage:(UIImage *)image;

@end



NS_ASSUME_NONNULL_END
