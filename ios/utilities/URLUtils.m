//
//  ImageService.m
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "URLUtils.h"

NSString* encodeURL(NSString *urlStringToEncode) {
  NSString *percentEncodedURLString =
  [[NSURL URLWithDataRepresentation:[urlStringToEncode dataUsingEncoding:NSUTF8StringEncoding] relativeToURL:nil] relativeString];
  return percentEncodedURLString;
}

BOOL urlIsSafe(NSString *url) {
  return [url hasPrefix:@"https://"];
}

void openURL(UIViewController *vc, NSString *urlStr) {
  NSURL *url = [NSURL URLWithString:urlStr];
  BOOL safeURL = urlIsSafe(urlStr);
  if (safeURL) {
    SFSafariViewController *safariViewController = [[SFSafariViewController alloc] initWithURL:url];
    [vc presentViewController:safariViewController animated:YES completion:^{}];
    return;
  }
  [UIApplication.sharedApplication openURL:url options:@{}
                         completionHandler:^(BOOL success) {}];
}
