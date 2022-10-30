//
//  ProfileSection.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 12.08.22.
//

#import <Foundation/Foundation.h>
#import "SettingsTableViewCellModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface ProfileSection: NSObject

@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSMutableArray<SettingsTableViewCellModel *> *cellModels;

- (instancetype)initWithTitle:(NSString *)title cellModels:(NSMutableArray<SettingsTableViewCellModel *>*)cellModels;

@end

NS_ASSUME_NONNULL_END
