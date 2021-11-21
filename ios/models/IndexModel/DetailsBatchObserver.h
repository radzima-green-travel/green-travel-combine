//
//  CategoriesObserver.h
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DetailsBatchConstants.h"

NS_ASSUME_NONNULL_BEGIN

@protocol DetailsBatchObserver <NSObject>

- (void)onDetailsBatchStatusUpdate:(DetailsLoadState)detailsLoadState
                             error:(NSError * _Nullable)error;

@end

NS_ASSUME_NONNULL_END
