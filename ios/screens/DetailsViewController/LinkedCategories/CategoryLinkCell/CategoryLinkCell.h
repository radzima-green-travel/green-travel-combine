//
//  CategoryLinkCell.h
//  GreenTravel
//
//  Created by Alex K on 11/7/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class Category;

@interface CategoryLinkCell : UITableViewCell

- (void)update:(Category *)category;

@end

NS_ASSUME_NONNULL_END
