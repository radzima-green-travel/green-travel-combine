//
//  Colors.m
//  TEDPlayer
//
//  Created by Alex K on 7/18/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "Colors.h"
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@implementation Colors

static Colors *instance;

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.background = [UIColor colorNamed:@"background"];
    self.navigationBarTint = [UIColor colorNamed:@"navigationBarTint"];
    self.navigationBarColorStart = [UIColor colorNamed:@"navigationBarColorStart"];
    self.navigationBarColorStop = [UIColor colorNamed:@"navigationBarColorStop"];
    self.tabBarBackground = [UIColor colorNamed:@"tabBarBackground"];
    self.tabBarTint = [UIColor colorNamed:@"tabBarTint"];
    self.cardPlaceholder = [UIColor colorNamed:@"cardPlaceholder"];
    self.bookmarkTintEmptyCell = [UIColor colorNamed:@"bookmarkTintEmptyCell"];
    self.cardPlaceholderText = [UIColor colorNamed:@"cardPlaceholderText"];
  }
  return self;
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[Colors alloc] init];
    return instance;
}

@end

