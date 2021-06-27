//
//  IconNameToImageNameMap.m
//  GreenTravel
//
//  Created by Alex K on 2/2/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "IconNameToImageNameMap.h"
#import <UIKit/UIKit.h>

@interface IconNameToImageNameMap()

@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *objectIconToFileName36;
@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *objectIconToFileName32;
@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *filterMap;
@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *filterMapLightStyle;

@end

@implementation IconNameToImageNameMap

static IconNameToImageNameMap *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
        _objectIconToFileName36 = @{
            @"religious-christian-15": @"church36",
            @"monument-11": @"memorial36",
            @"museum-15": @"museum36",
            @"castle-15": @"castle36",
            @"tw-national-2": @"nature-object36",
            @"town-hall-15": @"tower36",
            @"routes": @"routes36",
            @"walking-routes": @"walking-route36",
            @"object": @"conserved-area36",
            @"excursion-pin": @"excursion36",
            @"bicycle-route": @"bicycle-route36",
            @"water-route": @"water-route36",
        };
      _objectIconToFileName32 = @{
          @"religious-christian-15": @"church32",
          @"monument-11": @"memorial32",
          @"museum-15": @"museum32",
          @"castle-15": @"castle32",
          @"tw-national-2": @"nature-object32",
          @"town-hall-15": @"tower32",
          @"routes": @"routes32",
          @"walking-routes": @"walking-route32",
          @"object": @"conserved-area32",
          @"excursion-pin": @"excursion32",
          @"bicycle-route": @"bicycle-route32",
          @"water-route": @"water-route32",
      };
        _filterMap = @{
            @"object": @"forest",
            @"hiking": @"footprints",
            @"historical-place": @"church",
            @"bicycle-route": @"bike",
            @"excursion-pin": @"flag",
        };
        _filterMapLightStyle = @{
            @"object": @"forest-white",
            @"hiking": @"footprints-white",
            @"historical-place": @"church-white",
            @"bicycle-route": @"bike-white",
            @"excursion-pin": @"flag-white",
        };
    }
    return self;
}

- (UIImage *)iconForName36:(NSString *)name {
  if (!self.objectIconToFileName36[name]) {
    return nil;
  }
  NSString *fileName = self.objectIconToFileName36[name];
  UIImage *image = [UIImage imageNamed:fileName];
  return image;
}

- (UIImage *)iconForName32:(NSString *)name {
  if (!self.objectIconToFileName36[name]) {
    return nil;
  }
  NSString *fileName = self.objectIconToFileName32[name];
  UIImage *image = [UIImage imageNamed:fileName];
  return image;
}

- (UIImage *)filterIconForName:(NSString *)name
                 lightStyle:(BOOL)lightStyle {
    if (!self.objectIconToFileName36[name]) {
        return nil;
    }
    NSString *fileName;
    if (lightStyle) {
        fileName = self.filterMapLightStyle[name];
    } else {
        fileName = self.filterMap[name];
    }
    return [UIImage imageNamed:fileName];
}

- (BOOL)hasFilterIconForName:(NSString *)name {
    return self.filterMap[name] != nil && self.filterMapLightStyle[name] != nil;
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[IconNameToImageNameMap alloc] init];
    return instance;
}

@end
