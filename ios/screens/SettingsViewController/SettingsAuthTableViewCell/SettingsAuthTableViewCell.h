//
//  SettingsAuthTableViewCell.h
//  greenTravel
//
//  Created by Alex K on 31.01.23.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface SettingsAuthTableViewCell : UITableViewCell

- (void)updateWithSubTitle:(NSString*)subText
        fetchingInProgress:(BOOL)fetchingInProgress
                  signedIn:(BOOL)signedIn;

@end

NS_ASSUME_NONNULL_END
