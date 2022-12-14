//
//  SettingsScreen.h
//  greenTravel
//
//  Created by Alex K on 24.12.22.
//

#import <Foundation/Foundation.h>


NS_ASSUME_NONNULL_BEGIN

@interface SettingsScreen : NSObject

@property (assign, nonatomic) SettingsModelGroupKey key;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSArray<SettingsEntry *> *cells;

@end

NS_ASSUME_NONNULL_END
