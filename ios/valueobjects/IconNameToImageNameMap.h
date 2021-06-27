//
//  IconNameToImageNameMap.h
//  GreenTravel
//
//  Created by Alex K on 2/2/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class UIImage;

@interface IconNameToImageNameMap : NSObject

+ (instancetype)get;
- (UIImage *)iconForName36:(NSString *)name;
- (UIImage *)iconForName32:(NSString *)name;
- (UIImage *)filterIconForName:(NSString *)name
                 lightStyle:(BOOL)selectedState;
- (BOOL)hasFilterIconForName:(NSString *)name;

@end

NS_ASSUME_NONNULL_END
