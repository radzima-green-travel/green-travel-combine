//
//  SettingsTableViewCell.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 12.08.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface SettingsTableViewCellModel : NSObject

typedef NS_ENUM(NSUInteger, DevSettingsCellType) {
  DevSettingsCellTypeButtonCell,
  DevSettingsCellTypeToggleCell,
  DevSettingsCellTypePushToSelectionCell
};

@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSString *subTitle;
@property (strong, nonatomic) UIImage *image;
@property (assign, nonatomic) BOOL fetchingInProgress;
@property (assign, nonatomic) BOOL signedIn;
@property (assign, nonatomic) NSUInteger cellType;
@property (copy, nonatomic) void (^handler)(void);

- (instancetype)initWithTitle:(NSString *)title subTitle:(NSString *)subtitle image:(nullable UIImage *)image handler:(void (^)(void))handler;
- (instancetype)initWithTitle:(NSString *)title subTitle:(NSString *)subtitle
                        image:(UIImage *)image
           fetchingInProgress:(BOOL)fetchingInProgress
                     signedIn:(BOOL)signedIn
                      handler:(void (^)(void))handler;
- (instancetype)initWithTitle:(NSString *)title
                     subTitle:(NSString *)subTitle
                     cellType:(NSUInteger) cellType
                        image:(nullable UIImage *)image
                      handler:(void (^)(void))handler;

@end

NS_ASSUME_NONNULL_END
