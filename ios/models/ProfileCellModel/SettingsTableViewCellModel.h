//
//  SettingsTableViewCell.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 12.08.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface SettingsTableViewCellModel : NSObject

@property (strong,nonatomic) NSString *title;
@property (strong,nonatomic) NSString *subTitle;
@property (strong,nonatomic) UIImage *image;
@property (copy, nonatomic) void (^handler)(void);

- (instancetype)initWithTitle:(NSString *)title subTitle:(NSString *)subtitle image:(UIImage *)image handler:(void (^)(void))handler;

@end

NS_ASSUME_NONNULL_END
