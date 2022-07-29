//
//  AmplifyAuth.h
//  greenTravel
//
//  Created by Alex K on 20.05.22.
//

#import <Foundation/Foundation.h>

#if PROD
#import "Radzima-Swift.h"
#else
#import "Radzima_Dev-Swift.h"
#endif

NS_ASSUME_NONNULL_BEGIN

@interface AmplifyAuth : NSObject

@end

NS_ASSUME_NONNULL_END
