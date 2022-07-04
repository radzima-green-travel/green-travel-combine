//
//  UITextField+RemoveWhiteSpaces.m
//  greenTravel
//
//  Created by kudr7k on 4.07.22.
//

#import "UITextField+RemoveWhiteSpaces.h"

@implementation UITextField (RemoveWhiteSpaces)

- (void) removeSpaces {
  self.text = [self.text stringByTrimmingCharactersInSet:
               [NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

@end
