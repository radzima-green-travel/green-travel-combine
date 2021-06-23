//
//  TextUtils.h
//  TEDPlayer
//
//  Created by Alex K on 7/18/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>


NSDictionary<NSAttributedStringKey, id>* getTextAttributes(UIColor* color, CGFloat size, UIFontWeight weight);

NSAttributedString* getAttributedString(NSString *text, UIColor* color, CGFloat size, UIFontWeight weight);

NSString* getUsefulTimeComponents(NSString *duration);

NSAttributedString* getAttributedStringFromHTML(NSString *html, UIColor *color);
