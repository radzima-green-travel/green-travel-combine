//
//  SettingsBaseTableViewCellConfig.h
//  greenTravel
//
//  Created by Alex K on 22.01.23.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface SettingsBaseTableViewCellConfig : NSObject

@property (assign, nonatomic) BOOL chevron;
@property (strong, nonatomic) NSString *iconName;
@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSString *subTitle;

- (instancetype)initWithTitle:(NSString *)title
                     subTitle:(NSString *)subTitle
                     iconName:(NSString *)iconName
                      chevron:(BOOL)chevron;


@end

NS_ASSUME_NONNULL_END
