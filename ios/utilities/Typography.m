//
//  Typography.m
//  GreenTravel
//
//  Created by Alex K on 1/17/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "Colors.h"
#import "Typography.h"
#import "TextUtils.h"

@implementation Typography 

static Typography *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
    }
    return self;
}

- (NSAttributedString *)mainTextLink:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainTextLink,
                                                                      15.0,
                                                                      UIFontWeightSemibold)];
}

- (NSAttributedString *)mainText:(NSString *)input {
  return [[NSAttributedString alloc] initWithString:input
                                         attributes:getTextAttributes([Colors get].mainText,
                                                                      15.0,
                                                                      UIFontWeightRegular)];
}


+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[Typography alloc] init];
    return instance;
}

@end
