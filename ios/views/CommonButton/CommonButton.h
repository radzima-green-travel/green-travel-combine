//
//  CommonButton.h
//  GreenTravel
//
//  Created by Alex K on 1/23/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIButtonHighlightable.h"

NS_ASSUME_NONNULL_BEGIN


@interface CommonButton : UIButtonHighlightable

- (instancetype)initWithTarget:(id)target
                        action:(SEL)action
                         label:(NSString *)label;
- (void)setLabel:(NSString *)label;

@end

NS_ASSUME_NONNULL_END
