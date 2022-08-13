//
//  ProfileTableViewCell.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 25.07.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ProfileTableViewCell : UITableViewCell

@property (strong, nonatomic)UIImageView *chevronImageView;

- (void)prepareSettingsCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText;
- (void)prepareAuthCellWithImage:(UIImage*)image mainTextLabelText:(NSString*)mainText subTextLabelText:(NSString*)subText;

@end

NS_ASSUME_NONNULL_END
