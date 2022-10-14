//
//  AccessibilityUtils.m
//  greenTravel
//
//  Created by Alex K on 17.10.22.
//

#import "AccessibilityUtils.h"

void populateWithAccessibilityIDs(UITabBar *tabBar) {
  NSUInteger index = 0;
  for (UIControl *control in tabBar.subviews) {
    if ([control isKindOfClass:UIControl.class] && index < tabBar.items.count) {
      control.accessibilityIdentifier = tabBar.items[index].accessibilityIdentifier;
      index++;
    }
  }
}
