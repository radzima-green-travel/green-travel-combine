//
//  MainContentViewController.h
//  GreenTravel
//
//  Created by Alex K on 8/15/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MainViewControllerConstants.h"
#import "MapViewControllerConstants.h"

NS_ASSUME_NONNULL_BEGIN

@class BottomSheetView;

@interface MainViewController : UITabBarController<UITabBarControllerDelegate>

@property (strong, nonatomic) BottomSheetView *bottomSheet;
@property (assign, nonatomic) MainViewControllerBottomSheet activeBottomSheetTypeByTab; 
@property (strong, nonatomic) NSMutableDictionary<NSNumber *, BottomSheetView *> *bottomSheets;
- (void)loadCategories;
- (BottomSheetView *)addBottomSheet:(MapViewControllerType)mapType onShow:(void(^_Nonnull)(BOOL, NSString *))onShow;

@end

NS_ASSUME_NONNULL_END
