//
//  ProfileTableViewCell.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 25.07.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ProfileTableViewCell : UITableViewCell

- (void)prepareSettingsCellWithImage:(UIImage*)image
                   mainTextLabelText:(NSString*)mainText
                    subTextLabelText:(NSString*)subText;
- (void)prepareAuthCellWithImage:(UIImage*)image
               mainTextLabelText:(NSString*)mainText
                subTextLabelText:(NSString*)subText
              fetchingInProgress:(BOOL)fetchingInProgress
                        signedIn:(BOOL)signedIn;

@end

NS_ASSUME_NONNULL_END
