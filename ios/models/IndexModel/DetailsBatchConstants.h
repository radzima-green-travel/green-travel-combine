//
//  DetailsBatchConstants.h
//  greenTravel
//
//  Created by Alex K on 20.11.21.
//

#import <Foundation/Foundation.h>
 
typedef NS_ENUM(NSUInteger, DetailsLoadState) {
  DetailsLoadStateInitial = 0,
  DetailsLoadStateProgress = 1,
  DetailsLoadStateSuccess = 2,
  DetailsLoadStateFailure = 3,
};
