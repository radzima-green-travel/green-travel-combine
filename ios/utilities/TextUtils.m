//
//  TextUtils.m
//  TEDPlayer
//
//  Created by Alex K on 7/18/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "TextUtils.h"
#import <UIKit/UIKit.h>

NSDictionary<NSAttributedStringKey, id>* getTextAttributes(UIColor* color, CGFloat size, UIFontWeight weight) {
    return @{
        NSForegroundColorAttributeName:color,
        NSFontAttributeName:[UIFont systemFontOfSize:size weight:weight]
    };
};

static NSString * const kInlineStyle = @"font-family:'Open Sans',-apple-system,'Helvetica Neue',sans-serif;font-size:16px;font-weight:400;";

NSAttributedString* getAttributedString(NSString *text, UIColor* color, CGFloat size, UIFontWeight weight) {
    return [[NSAttributedString alloc] initWithString:text attributes:getTextAttributes(color, size, weight)];
}

NSAttributedString* getAttributedStringFromHTML(NSString *html) {
    NSError *error;
    NSString *htmlWpappedWithStyles = [NSString stringWithFormat:@"<section style=\"%@\">%@</section>", kInlineStyle, html];
    NSData *data = [htmlWpappedWithStyles dataUsingEncoding:NSUTF8StringEncoding];
    NSMutableAttributedString *result = [[NSMutableAttributedString alloc] initWithData:data
                                     options:@{NSDocumentTypeDocumentAttribute: NSHTMLTextDocumentType,
                                               NSCharacterEncodingDocumentAttribute: @(NSUTF8StringEncoding)
                                     }
                          documentAttributes:nil
                                       error:&error];
    return result;
}


NSString* getUsefulTimeComponents(NSString *duration) {
    NSArray<NSString*> *components = [duration componentsSeparatedByString:@":"];
    NSMutableArray<NSString*> *usefulComponents = [[NSMutableArray alloc] init];
    unsigned long allowedSkips = [components count] - 2;
    int skips = 0;
    for (NSString *component in components) {
        if ([component isEqualToString:@"00"] && skips < allowedSkips) {
            skips++;
            continue;
        }
        [usefulComponents addObject:component];
    }
    return [usefulComponents componentsJoinedByString:@":"];
}
