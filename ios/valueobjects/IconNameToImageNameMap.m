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
            @"historical-place": @"church36",
            @"war-monuments": @"memorial36",
            @"museums": @"museum36",
            @"castles": @"castle36",
            @"nature-monuments": @"nature-object36",
            @"other-monuments": @"tower36",
            @"routes": @"routes36",
            @"walking-routes": @"walking-route36",
            @"object": @"conserved-area36",
            @"excursion-pin": @"excursion36",
            @"bicycle-route": @"bicycle-route36",
            @"water-route": @"water-route36",
        };
      _objectIconToFileName32 = @{
          @"historical-place": @"church32",
          @"war-monuments": @"memorial32",
          @"museums": @"museum32",
          @"castles": @"castle32",
          @"nature-monuments": @"nature-object32",
          @"other-monuments": @"tower32",
          @"routes": @"routes32",
          @"walking-routes": @"walking-route32",
          @"object": @"conserved-area32",
          @"excursion-pin": @"excursion32",
          @"bicycle-route": @"bicycle-route32",
          @"water-route": @"water-route32",
      };
        _filterMap = @{
            @"historical-place": @"church",
            @"war-monuments": @"war-memorial",
            @"museums": @"museum",
            @"castles": @"castle",
            @"nature-monuments": @"trees",
            @"other-monuments": @"fortress",
            @"routes": @"pin",
            @"walking-routes": @"footprints",
            @"object": @"forest",
            @"excursion-pin": @"flag",
            @"bicycle-route": @"bike",
            @"water-route": @"wave",
        };
        _filterMapLightStyle = @{
          @"historical-place": @"church-dark-mode",
          @"war-monuments": @"war-memorial-dark-mode",
          @"museums": @"museum-dark-mode",
          @"castles": @"castle-dark-mode",
          @"nature-monuments": @"trees-dark-mode",
          @"other-monuments": @"fortress-dark-mode",
          @"routes": @"pin-dark-mode",
          @"walking-routes": @"footprints-dark-mode",
          @"object": @"forest-dark-mode",
          @"excursion-pin": @"flag-dark-mode",
          @"bicycle-route": @"bike-dark-mode",
          @"water-route": @"wave-dark-mode",
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
  if (!self.objectIconToFileName32[name]) {
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
