//
//  ProfileTableViewCell.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 25.07.22.
//

#import <UIKit/UIKit.h>
#import "UserModelObserver.h"

NS_ASSUME_NONNULL_BEGIN

@interface ProfileTableViewCell : UITableViewCell<UserModelObserver>

- (void)prepareSettingsCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText;
- (void)prepareAuthCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText;

- (void)onUserModelStateTransitionFrom:(UserModelState)prevState toCurrentState:(UserModelState)currentState;

@end

NS_ASSUME_NONNULL_END
