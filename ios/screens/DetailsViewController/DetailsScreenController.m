//
//  DetailsScreenController.m
//  greenTravel
//
//  Created by Alex K on 20.02.22.
//

#import "DetailsScreenController.h"

@interface DetailsScreenController()

@end

static const NSString * kDetailsTemplateName = @"details.html";
static const NSString * kDetailsTemplateCacheKey = @"detailsTemplateId";
NSCache<NSString *, NSMutableString *> *htmlTemplateCache;

NSMutableAttributedString* loadDetailsTemplate(NSString *body) {
  NSError *error;
  if (htmlTemplateCache == nil) {
    htmlTemplateCache = [[NSCache alloc] init];
  }
  NSMutableString *details = [htmlTemplateCache objectForKey:kDetailsTemplateCacheKey];
  if (details == nil) {
    NSString *filePath = [[[NSBundle mainBundle] resourcePath]
                                  stringByAppendingPathComponent:kDetailsTemplateName];
    details = [NSMutableString stringWithContentsOfFile:filePath
                                                encoding:NSUTF8StringEncoding
                                                   error:&error];
    [htmlTemplateCache setObject:details forKey:kDetailsTemplateCacheKey];
  }
  details = [htmlTemplateCache objectForKey:kDetailsTemplateCacheKey];
  [details replaceOccurrencesOfString:@"$body$"
                         withString:body
                            options:NSCaseInsensitiveSearch
                              range:NSMakeRange(0, [details length])];
  NSData *data = [details dataUsingEncoding:NSUTF8StringEncoding];
  NSMutableAttributedString *result =
  [[NSMutableAttributedString alloc] initWithData:data
                                          options:@{
    NSDocumentTypeDocumentAttribute: NSHTMLTextDocumentType,
    NSCharacterEncodingDocumentAttribute: @(NSUTF8StringEncoding)
  }
                               documentAttributes:nil
                                            error:&error];
  return result;
}

@implementation DetailsScreenController



@end
