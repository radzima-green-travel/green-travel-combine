//
//  ImageService.h
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UIKit/UIKit.h"
#import <SafariServices/SafariServices.h>

NSString* encodeURL(NSString *url);
NSString* encodeURLNoCommas(NSString *urlStringToEncode);
NSString* decodeURL(NSString *urlStringToDecode);
BOOL urlIsSafe(NSString *url);
void openURL(UIViewController *vc, NSString *urlStr);
