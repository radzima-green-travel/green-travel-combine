//
//  UserModelObserver.h
//  greenTravel
//
//  Created by Alex K on 24.05.22.
//

#ifndef UserModelObserver_h
#define UserModelObserver_h


#endif /* UserModelObserver_h */

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class CLLocation;
@class EmailSendingState;

@protocol UserModelObserver <NSObject>

- (void)onEmailSendingUpdate:(EmailSendingState *)emailSendingState;

@end

NS_ASSUME_NONNULL_END
