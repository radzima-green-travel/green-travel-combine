//
//  ProfileSections.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 23.08.22.
//

#import <Foundation/Foundation.h>
#import "ProfileSection.h"


NS_ASSUME_NONNULL_BEGIN

@interface ProfileSections : NSObject

@property (strong, nonatomic) ProfileSection* authSection;
@property (strong, nonatomic) ProfileSection* settingsSection;

@end

NS_ASSUME_NONNULL_END
