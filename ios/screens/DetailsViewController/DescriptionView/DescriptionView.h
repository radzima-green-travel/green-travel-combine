//
//  DescriptionView.h
//  GreenTravel
//
//  Created by Alex K on 2/7/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface DescriptionView : UIView

- (void)update:(NSAttributedString *)text showPlaceholder:(BOOL)showPlaceholder;

@end

NS_ASSUME_NONNULL_END
