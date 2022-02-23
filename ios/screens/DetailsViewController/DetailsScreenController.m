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
  NSString *template = [htmlTemplateCache objectForKey:kDetailsTemplateCacheKey];
  if (template == nil) {
    NSString *filePath = [[[NSBundle mainBundle] resourcePath]
                                  stringByAppendingPathComponent:kDetailsTemplateName];
    template = [NSString stringWithContentsOfFile:filePath
                                                encoding:NSUTF8StringEncoding
                                                   error:&error];
    [htmlTemplateCache setObject:template forKey:kDetailsTemplateCacheKey];
  }
  NSMutableString *details = [NSMutableString stringWithString:template];
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
