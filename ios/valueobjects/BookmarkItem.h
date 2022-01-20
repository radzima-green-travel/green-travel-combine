//
//  BoorkmarkItem.h
//  GreenTravel
//
//  Created by Alex K on 8/30/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class PlaceCategory;

@interface BookmarkItem : NSObject

@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSString *uuid;
@property (assign, nonatomic) int howMany;
@property (strong, nonatomic) PlaceCategory *correspondingCategory;

@end

NS_ASSUME_NONNULL_END
