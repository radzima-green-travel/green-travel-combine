//
//  GraphQLApiService.m
//  greenTravel
//
//  Created by Alex K on 22.01.22.
//

#import "GraphQLApiService.h"
#import <react-native-ultimate-config/ConfigValues.h>

@interface GraphQLApiService()

@property (strong, nonatomic) NSCache<NSString *, NSData *> *requestBodyCache;

@end

static const NSString * kQueryGetTag = @"index-tag";
static const NSString * kQueryGetIndex = @"index";

@implementation GraphQLApiService

- (NSString *)categoriesURL {
  return [NSString stringWithFormat:@"%@", NATIVE_CLIENT_GRAPHQL_URL];
}

- (NSData *)getQuery:(NSString *)queryName {
  NSData *requestBodyData = [self.requestBodyCache objectForKey:queryName];
  if (requestBodyData == nil) {
    NSError *error;
    NSString *fileName = [NSString stringWithFormat:@"%@.graphql", queryName];
    NSString *queryContentPath = [[[NSBundle mainBundle] resourcePath]
                                  stringByAppendingPathComponent:fileName];
    NSMutableString *query = [NSMutableString stringWithContentsOfFile:queryContentPath
                                                encoding:NSUTF8StringEncoding
                                                   error:&error];
    [query replaceOccurrencesOfString:@"\""
                           withString:@"\\\""
                              options:NSCaseInsensitiveSearch
                                range:NSMakeRange(0, [query length])];
    NSRegularExpression *regex =
    [NSRegularExpression regularExpressionWithPattern:@"\\s+"
                                              options:NSRegularExpressionCaseInsensitive
                                                error:&error];
    query = [regex stringByReplacingMatchesInString:query
                                            options:0
                                              range:NSMakeRange(0, [query length])
                                       withTemplate:@" "];
    NSString *requestBody = [NSString stringWithFormat:@"{\"query\":\"%@\"}", query];
    NSLog(@"Error: %@", error);
    requestBodyData = [requestBody dataUsingEncoding:NSUTF8StringEncoding
                                        allowLossyConversion:NO];
    [self.requestBodyCache setObject:requestBodyData forKey:queryName];
  }
  return requestBodyData;
}

- (NSMutableURLRequest *)makeRequestForQuery:(NSString *)query {
  NSURL *url = [NSURL URLWithString:NATIVE_CLIENT_GRAPHQL_URL];
  NSMutableURLRequest *mutableRequest = [NSMutableURLRequest requestWithURL:url];
  [mutableRequest setHTTPMethod:@"POST"];
  [mutableRequest setValue:NATIVE_CLIENT_GRAPHQL_API_KEY
        forHTTPHeaderField:@"x-api-key"];
  [mutableRequest setHTTPBody:[self getQuery:query]];
  return mutableRequest;
}

- (void)loadCategories:(NSString *)currentHash
        withCompletion:(void (^)(NSArray<PlaceCategory *> *, NSArray<PlaceDetails *> *, NSString *))completion {
  __weak typeof(self) weakSelf = self;
  NSMutableURLRequest *getTagRequest = [self makeRequestForQuery:kQueryGetTag];
  NSURLSessionDataTask *getTagTask = [self.session dataTaskWithRequest:getTagRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    if (!data) {
      completion(@[], @[], currentHash);
      return;
    }
    NSDictionary *body = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    NSString *updatedHash = body[@"data"][@"getObjectsMetadata"][@"value"];
    if ([currentHash isEqualToString:updatedHash]) {
      completion(@[], @[], currentHash);
      return;
    }
    NSMutableURLRequest *getCategoriesRequest = [self makeRequestForQuery:kQueryGetIndex];
    NSURLSessionDataTask *getCategoriesTask = [self.session dataTaskWithRequest:getCategoriesRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
      if (!data) {
        completion(@[], @[], currentHash);
        return;
      }
      NSDictionary *body = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
      NSArray<PlaceCategory *> *mappedCategories = [[weakSelf mapCategoriesFromJSON:body[@"data"][@"listMobileObjects"]] copy];
      NSString *updatedHash = body[@"data"][@"getObjectsMetadata"][@"value"];
      completion(mappedCategories, @[], updatedHash);
    }];
    [getCategoriesTask resume];
  }];
  [getTagTask resume];
}

@end
