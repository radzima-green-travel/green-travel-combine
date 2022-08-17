//
//  Typography.h
//  GreenTravel
//
//  Created by Alex K on 1/17/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

@class UIColor;

NS_ASSUME_NONNULL_BEGIN

@interface TypographyLegacy : NSObject

+ (instancetype)get;

@property (strong, nonatomic) NSDictionary<NSAttributedStringKey, id> *navigationSemiboldAttributes;
@property (strong, nonatomic) NSDictionary<NSAttributedStringKey, id> *subtitle2SemiboldAttributes;
@property (strong, nonatomic) NSDictionary<NSAttributedStringKey, id> *tabBarAttributes;
@property (strong, nonatomic) NSDictionary<NSAttributedStringKey, id> *tabBarSelectedAttributes;

- (NSAttributedString *)makeTitle1Semibold:(NSString *)input;
- (NSAttributedString *)makeTitle1Bold:(NSString *)input;
- (NSAttributedString *)makeNavigationSemibold:(NSString *)input;
- (NSAttributedString *)makeSubtitle1Semibold:(NSString *)input;
- (NSAttributedString *)makeSubtitle1Semibold:(NSString *)input
                                        color:(UIColor *)color;
- (NSAttributedString *)makeSubtitle2Semibold:(NSString *)input;
- (NSAttributedString *)makeSubtitle2Regular:(NSString *)input;
- (NSAttributedString *)makeSubtitle2Regular:(NSString *)input
                                       color:(nonnull UIColor *)color;
- (NSAttributedString *)makeSubtitle3Regular:(NSString *)input;
- (NSAttributedString *)makeSubtitle3Regular:(NSString *)input
                                       color:(UIColor *)color;
- (NSAttributedString *)makeButtonText:(NSString *)input;
- (NSAttributedString *)makeButtonText:(NSString *)input color:(UIColor *)color;
- (NSAttributedString *)makeTitle2:(NSString *)input color:(UIColor *)color;
- (NSAttributedString *)makeBody:(NSString *)input
                           color:(nonnull UIColor *)color;
- (NSAttributedString *)makeBody:(NSString *)input;
- (NSAttributedString *)makeBookmarkText:(NSString *)input;
- (NSAttributedString *)makeLoadingScreenText:(NSString *)input;


@end

NS_ASSUME_NONNULL_END
