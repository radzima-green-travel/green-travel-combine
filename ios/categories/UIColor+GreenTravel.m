//
//  UIColor+GreenTravel.m
//  greenTravel
//
//  Created by kudr7k on 23.06.22.
//

#import "UIColor+GreenTravel.h"
#import "ColorsLegacy.h"

@implementation UIColor (GreenTravel)

+ (UIColor *)lineMapColorAppearance {
    if (@available(iOS 13.0, *)) {
        return [UIColor colorWithDynamicProvider:^UIColor * _Nonnull(UITraitCollection * _Nonnull traits) {
            return traits.userInterfaceStyle == UIUserInterfaceStyleDark ?
          [ColorsLegacy get].white : [ColorsLegacy get].black;
        }];
    } else {
        return [ColorsLegacy get].black;
    }
}

@end
