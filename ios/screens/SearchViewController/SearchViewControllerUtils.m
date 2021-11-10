//
//  SearchViewControllerUtils.m
//  greenTravel
//
//  Created by Alex K on 10.11.21.
//

#import <Foundation/Foundation.h>
#import "SearchViewControllerUtils.h"
#import "../../utilities/Colors.h"
#import "../../utilities/ColorsLegacy.h"

void setUISearchBarTintColor(UIColor *color) {
  [[UITextField appearanceWhenContainedInInstancesOfClasses:@[[UISearchBar class]]]
   setTintColor:color];
}

void configureSearchBar(UISearchBar *searchBar , UIButton *clearButton) {
  if (@available(iOS 13.0, *)) {
    [searchBar.searchTextField setTextColor:[ColorsLegacy get].white];
    [searchBar.searchTextField.leftView setTintColor:[ColorsLegacy get].white];
    [clearButton setTintColor:[ColorsLegacy get].white];
    setUISearchBarTintColor([ColorsLegacy get].white);
  } else {
    setUISearchBarTintColor([Colors get].mainText);
  }
}

void configureSearchBarForModal(UISearchBar *searchBar, UIButton *clearButton) {
  setUISearchBarTintColor([Colors get].mainText);
  if (@available(iOS 13.0, *)) {
    [searchBar.searchTextField setTextColor:[Colors get].mainText];
    [searchBar.searchTextField.leftView setTintColor:[Colors get].searchBarClearButton];
    [clearButton setTintColor:[Colors get].searchBarClearButton];
  }
}

UIButton* prepareClearButton(UISearchController *searchController) API_AVAILABLE(ios(13.0)) {
  UIButton *clearButton = [searchController.searchBar.searchTextField
                           valueForKey:@"_clearButton"];
  UIImage *clearButtonImage = [clearButton.imageView.image
                               imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
  [clearButton setImage:clearButtonImage forState:UIControlStateNormal];
  [clearButton setImage:clearButtonImage forState:UIControlStateHighlighted];
  return clearButton;
}
