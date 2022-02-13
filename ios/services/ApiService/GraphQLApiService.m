//
//  GraphQLApiService.m
//  greenTravel
//
//  Created by Alex K on 22.01.22.
//

#import "GraphQLApiService.h"
#import "PlaceItem.h"
#import "PlaceCategory.h"
#import <react-native-ultimate-config/ConfigValues.h>
#import "CategoryUtils.h"
#import "LocaleUtils.h"
#import "IndexModelData.h"

@interface GraphQLApiService()

@property (strong, nonatomic) NSCache<NSString *, NSMutableString *> *queryCache;

@end

static const NSString * kQueryGetTag = @"index-tag";
static const NSString * kQueryGetIndex = @"index";

@implementation GraphQLApiService

- (NSString *)categoriesURL {
  return [NSString stringWithFormat:@"%@", NATIVE_CLIENT_GRAPHQL_URL];
}

- (NSData *)getQuery:(NSString *)queryName
              withParams:(NSDictionary<NSString *,NSString *> *)params {
  NSMutableString *query = [self.queryCache objectForKey:queryName];
  NSError *error;
  if (query == nil) {
    NSString *fileName = [NSString stringWithFormat:@"%@.graphql", queryName];
    NSString *queryContentPath = [[[NSBundle mainBundle] resourcePath]
                                  stringByAppendingPathComponent:fileName];
    query = [NSMutableString stringWithContentsOfFile:queryContentPath
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
    query = [[NSMutableString alloc] initWithString:
             [regex stringByReplacingMatchesInString:query options:0
                                               range:NSMakeRange(0, [query length])
                                        withTemplate:@" "]];
    [self.queryCache setObject:query forKey:queryName];
  }
  if (params != nil && [params count]) {
    [params enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull paramKey,
                                                NSString * _Nonnull paramValue,
                                                BOOL * _Nonnull stop) {
      [query replaceOccurrencesOfString:paramKey
                             withString:paramValue
                                options:NSCaseInsensitiveSearch
                                  range:NSMakeRange(0, [query length])];
    }];
  }
  NSString *requestBody = [NSString stringWithFormat:@"{\"query\":\"%@\"}", query];
  NSLog(@"Error: %@", error);
  NSData *requestBodyData = [requestBody dataUsingEncoding:NSUTF8StringEncoding
                                      allowLossyConversion:NO];
  return requestBodyData;
}

- (NSMutableURLRequest *)makeRequestForQuery:(NSString *)query
                                  withParams:(NSDictionary<NSString *,NSString *> *)params {
  NSURL *url = [NSURL URLWithString:NATIVE_CLIENT_GRAPHQL_URL];
  NSMutableURLRequest *mutableRequest = [NSMutableURLRequest requestWithURL:url];
  [mutableRequest setHTTPMethod:@"POST"];
  [mutableRequest setValue:NATIVE_CLIENT_GRAPHQL_API_KEY
        forHTTPHeaderField:@"x-api-key"];
  [mutableRequest setValue:@"gzip"
        forHTTPHeaderField:@"Accept-Encoding"];
  [mutableRequest setHTTPBody:[self getQuery:query withParams:params]];
  return mutableRequest;
}

- (void)loadCategories:(NSString *)currentHash
             forceLoad:(BOOL)forceLoad
        withCompletion:(CategoriesCompletion)completion {
  NSMutableURLRequest *getTagRequest = [self makeRequestForQuery:kQueryGetTag
                                                      withParams:nil];
  __weak typeof(self) weakSelf = self;
  NSURLSessionDataTask *getTagTask = [self.session dataTaskWithRequest:getTagRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    IndexModelData *indexModelData = [[IndexModelData alloc] init];
    if (!data) {
      completion(indexModelData, @[], currentHash);
      return;
    }
    NSDictionary *body = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    NSString *updatedHash = body[@"data"][@"getObjectsMetadata"][@"value"];
    if (!forceLoad && [currentHash isEqualToString:updatedHash]) {
      completion(indexModelData, @[], currentHash);
      return;
    }
    NSMutableDictionary<NSString *, NSDictionary *> *accumulatedCategories =
    [[NSMutableDictionary alloc] init];
    NSMutableDictionary<NSString *, NSDictionary *> *accumulatedItems =
    [[NSMutableDictionary alloc] init];
    [weakSelf getCategories:currentHash nextToken:nil accumulatedCategories:accumulatedCategories accumulatedItems:accumulatedItems сompletion:completion];
  }];
  [getTagTask resume];
}

- (void)getCategories:(NSString *)currentHash
            nextToken:(NSString *)nextToken
accumulatedCategories:(NSMutableDictionary<NSString *, NSDictionary *> *)accumulatedCategories
     accumulatedItems:(NSMutableDictionary<NSString *, NSDictionary *> *)accumulatedItems
           сompletion:(CategoriesCompletion)completion
{
  NSString *nextTokenSub = @"null";
  if (nextToken != nil) {
    nextTokenSub = [NSString stringWithFormat:@"\\\"%@\\\"", nextToken];
  }
  NSString *currentLocaleLanguageCodeSub =
  [NSString stringWithFormat:@"\\\"%@\\\"", getCurrentLocaleLanguageCode()];
  NSMutableURLRequest *getCategoriesRequest =
  [self makeRequestForQuery:kQueryGetIndex withParams:@{
    @"$nextToken$": nextTokenSub,
    @"$locale$": currentLocaleLanguageCodeSub
  }];
  __weak typeof(self) weakSelf = self;
  NSURLSessionDataTask *getCategoriesTask =
  [self.session dataTaskWithRequest:getCategoriesRequest
                  completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    IndexModelData *indexModelData = [[IndexModelData alloc] init];
    if (!data) {
      completion(indexModelData, @[], currentHash);
      return;
    }
    NSDictionary *body = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    [weakSelf fillRawIndexData:body
           intoAccumulatedCategories:accumulatedCategories
                    accumulatedItems:accumulatedItems];
    
    NSString *updatedToken = body[@"data"][@"listMobileData"][@"objects"][@"nextToken"];
    
    if (updatedToken == nil || [updatedToken isEqual:[NSNull null]]) {
      NSString *updatedHash = body[@"data"][@"getObjectsMetadata"][@"value"];
      indexModelData = rawIndexToIndexModelData(accumulatedCategories, accumulatedItems);
      completion(indexModelData, @[], updatedHash);
      return;
    }
    [weakSelf getCategories:currentHash nextToken:updatedToken
      accumulatedCategories:accumulatedCategories
           accumulatedItems:accumulatedItems сompletion:completion];
  }];
  [getCategoriesTask resume];
}

- (void)fillRawIndexData:(NSDictionary *)body
     intoAccumulatedCategories:(NSMutableDictionary<NSString *, NSDictionary *> *)accumulatedCategories
              accumulatedItems:(NSMutableDictionary<NSString *, NSDictionary *> *)accumulatedItems {
  NSArray<NSDictionary *> *rawItems = [body[@"data"][@"listMobileData"][@"objects"][@"items"] copy];
  NSArray<NSDictionary *> *rawCategories = [body[@"data"][@"listMobileData"][@"categories"] copy];
  [rawItems enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull rawItem, NSUInteger idx, BOOL * _Nonnull stop) {
    accumulatedItems[rawItem[@"id"]] = rawItem;
  }];
  [rawCategories enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull rawCategory, NSUInteger idx, BOOL * _Nonnull stop) {
    accumulatedCategories[rawCategory[@"id"]] = rawCategory;
  }];
  
}

@end
