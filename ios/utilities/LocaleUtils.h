//
//  LocaleUtils.h
//  greenTravel
//
//  Created by Alex K on 6.02.22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

NSString* getCurrentLocaleLanguageCode(void);
NSString* getCurrentLocaleFriendlyName(void);
BOOL isCurrentLanguageCodeLegacy(void);

NS_ASSUME_NONNULL_END
