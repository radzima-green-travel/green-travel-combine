//
//  ImageService.m
//  GreenTravel
//
//  Created by Alex K on 8/28/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "ImageUtils.h"
#import <UIKit/UIKit.h>

SDWebImageCombinedOperation* loadImage(NSString *url, void (^onImageReady)(UIImage *, NSError *)) {
  NSURL *urlForImage = [NSURL URLWithString:url];
  SDWebImageManager *manager = [SDWebImageManager sharedManager];
  return [manager loadImageWithURL:urlForImage options:0 progress:^(NSInteger receivedSize, NSInteger expectedSize, NSURL * _Nullable targetURL) {    
  } completed:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, SDImageCacheType cacheType, BOOL finished, NSURL * _Nullable imageURL) {
    if (error) {
      onImageReady(nil, error);
    }
    if (image) {
      onImageReady(image, nil);
    }
  }];
}

NSString* getFullImageURL(NSString *basePath, NSString *imageURL) {
  NSString *urlDecodedImageURL = [imageURL stringByRemovingPercentEncoding];
  
  NSString *pathPart = [urlDecodedImageURL stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLPathAllowedCharacterSet]];
  
  NSString *fullImageURL = [NSString stringWithFormat:@"%@%@", basePath,
                            pathPart];
  return fullImageURL;
}

