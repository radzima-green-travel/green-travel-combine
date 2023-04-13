//
//  SocialProvidersViewController.h
//  greenTravel
//
//  Created by Alex K on 13.04.23.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"
#import "BaseFormViewController.h"

NS_ASSUME_NONNULL_BEGIN

@class UserController;
@class UserModel;

@interface SocialProvidersViewController : BaseFormViewController<UserModelObserver>

@end

NS_ASSUME_NONNULL_END
