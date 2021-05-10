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

@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *map;
@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *filterMap;
@property (strong, nonatomic) NSDictionary<NSString *, NSString *> *filterMapSelected;

@end

@implementation IconNameToImageNameMap

static IconNameToImageNameMap *instance;

- (instancetype)init
{
    self = [super init];
    if (self) {
        _map = @{
            @"object": @"conserv.area",
            @"hiking": @"walking-routes",
            @"historical-place": @"historical-place",
            @"bicycle-route": @"bicycle-route",
            @"excursion-pin": @"excursion",
        };
        _filterMap = @{
            @"object": @"forest",
            @"hiking": @"footprints",
            @"historical-place": @"church",
            @"bicycle-route": @"bike",
            @"excursion-pin": @"flag",
        };
        _filterMapSelected = @{
            @"object": @"forest-white",
            @"hiking": @"footprints-white",
            @"historical-place": @"church-white",
            @"bicycle-route": @"bike-white",
            @"excursion-pin": @"flag-white",
        };
    }
    return self;
}

- (UIImage *)iconForName:(NSString *)name {
  if (!self.map[name]) {
    return nil;
  }
  NSString *fileName = self.map[name];
  UIImage *image = [UIImage imageNamed:fileName];
  return image;
}

- (UIImage *)filterIconForName:(NSString *)name
                 selectedState:(BOOL)selectedState {
    if (!self.map[name]) {
        return nil;
    }
    NSString *fileName;
    if (selectedState) {
        fileName = self.filterMapSelected[name];
    } else {
        fileName = self.filterMap[name];
    }
    return [UIImage imageNamed:fileName];
}

- (BOOL)hasFilterIconForName:(NSString *)name {
    return self.filterMap[name] != nil && self.filterMapSelected[name] != nil;
}

+ (instancetype)get {
    if (instance) {
        return instance;
    }
    instance = [[IconNameToImageNameMap alloc] init];
    return instance;
}

@end
