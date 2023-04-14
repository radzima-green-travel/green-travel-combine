//
//  SocialProviderButton.h
//  greenTravel
//
//  Created by Alex K on 14.04.23.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^ButtonViewTapHandler)(void);

@interface SocialProviderButton : UIButton

@property (nonatomic, copy) ButtonViewTapHandler onTap;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, strong) UIColor *borderColor;
@property (nonatomic, strong) UIColor *bgColor;
@property (nonatomic, strong) UIImage *logoImage;

@end


NS_ASSUME_NONNULL_END
