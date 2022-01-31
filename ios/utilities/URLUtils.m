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
