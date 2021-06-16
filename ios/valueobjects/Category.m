//
//  Category.m
//  GreenTravel
//
//  Created by Alex K on 8/26/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "Category.h"

@implementation Category

- (nonnull id)copyWithZone:(nullable NSZone *)zone {
  Category *categoryCopied = [[Category alloc] init];
  
  categoryCopied.cover = self.cover;
  categoryCopied.icon = self.icon;
  categoryCopied.categories = [self.categories copyWithZone:zone];
  categoryCopied.items = [self.items copyWithZone:zone];
  categoryCopied.onAllButtonPress = self.onAllButtonPress;
  categoryCopied.onPlaceCellPress = self.onPlaceCellPress;
  categoryCopied.title = self.title;
  categoryCopied.uuid = self.uuid;
  return categoryCopied;
}

@end
