//
//  UISearchControllerNoCancel.m
//  GreenTravel
//
//  Created by Alex K on 3/13/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import "UISearchBarNoCancel.h"
#import "UISearchControllerNoCancel.h"

@interface UISearchControllerNoCancel() 

@property (strong, nonatomic) UISearchBarNoCancel *searchBarNoCancel;

@end

@implementation UISearchControllerNoCancel

- (UISearchBar *)searchBar {
    // Lazily initialize your custom search bar.
    if (!self.searchBarNoCancel) {
        self.searchBarNoCancel = [[UISearchBarNoCancel alloc] init];
    }
    return self.searchBarNoCancel;
}

@end
