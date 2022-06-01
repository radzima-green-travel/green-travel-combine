//
//  EmailSendingState.h
//  greenTravel
//
//  Created by Alex K on 24.05.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface UserState : NSObject

@property (assign, nonatomic) BOOL inProgress;
@property (assign, nonatomic) BOOL error;
@property (assign, nonatomic) BOOL codeSent;

@end

NS_ASSUME_NONNULL_END
