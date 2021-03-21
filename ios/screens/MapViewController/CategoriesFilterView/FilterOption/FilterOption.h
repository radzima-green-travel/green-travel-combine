//
//  FilterOption.h
//  GreenTravel
//
//  Created by Alex K on 2/26/21.
//  Copyright © 2021 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FilterOption : NSObject

@property (strong, nonatomic, nullable) NSString *categoryId;
@property (strong, nonatomic, nonnull) NSString *title;
@property (strong, nonatomic, nullable) NSString *iconName;
@property (assign, nonatomic) BOOL on;
@property (assign, nonatomic) BOOL selectAll;

@end
