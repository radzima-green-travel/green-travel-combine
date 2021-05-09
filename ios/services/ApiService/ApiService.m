//
//  ApiService.m
//  GreenTravel
//
//  Created by Alex K on 8/27/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "ApiService.h"
#import "Category.h"
#import "IndexModel.h"
#import "DetailsModel.h"
#import "PlaceItem.h"
#import "PlaceDetails.h"
#import <CoreLocation/CoreLocation.h>
#import "TextUtils.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"
#import "ConfigValues.h"

static NSString * const kGetCategoriesURL = @"https://ahzzbvk2cnablnu7hlefv6dpfa.appsync-api.eu-central-1.amazonaws.com/graphql";
static NSString * const kXAPIKey = @"da2-3kathjtstbg5rnh54ntazhh7au";
static NSString * const kGetDetailsBaseURL = @"http://ecsc00a0916b.epam.com:3001/api/v1/details/%@";
static NSString * const kImageBaseURL = @"http://radzimastorage74831-prod.s3-website.eu-central-1.amazonaws.com/";
static NSString * const kQueryGetCategories = @"query RadzimaMobile { getObjectsMetadata(id: \\\"tag\\\") { value } listMobileObjects {    id    name    fields    icon    cover    objects {      name      images      cover      address      author      createdAt      description      duration      routes {        coordinates        type      }      governanceType      id      length      location {        lat        lon      }      category {        createdAt        fields        icon        id        name        parent        updatedAt        cover      }      notes      origin      owner      status      url      area {        coordinates        type      }      include {        fields        icon        id        name        objects      }      permissions {        items {          permission {            id            key            name          }        }      }    }    children {      name      id      createdAt      fields      icon      cover      objects {        name        category {          createdAt          fields          icon          id          name          parent          updatedAt          cover        }        routes {          coordinates          type        }        images        cover        address        author        createdAt        description        duration        governanceType        id        length        location {          lat          lon        }        notes        origin        owner        status        url        area {          coordinates          type        }        include {          fields          icon          id          name          objects        }        permissions {          items {            permission {              id              key              name            }          }        }      }    }  }}";
static NSString * const kQueryGetTag = @"query RadzimaMobile { getObjectsMetadata(id: \\\"tag\\\") { value } }";

@interface ApiService ()

@property (strong, nonatomic) NSURLSession *session;

@end

@implementation ApiService

- (instancetype) initWithSession:(NSURLSession *)session {
    self = [super init];
    if (self) {
        _session = session;
    }
    return self;
}

- (NSMutableURLRequest *)makeRequestForQuery:(NSString *)query {
  NSURL *url = [NSURL URLWithString:kGetCategoriesURL];
  NSMutableURLRequest *mutableRequest = [NSMutableURLRequest requestWithURL:url];
  [mutableRequest setHTTPMethod:@"POST"];
  [mutableRequest setValue:kXAPIKey forHTTPHeaderField:@"x-api-key"];
  NSString *body = [NSString stringWithFormat:@"{\"query\":\"%@\"}", query];
  NSData *bodyAsData = [body dataUsingEncoding:NSUTF8StringEncoding];
  [mutableRequest setHTTPBody:bodyAsData];
  
  
  NSLog(@"Request body: %@", body);
  return mutableRequest;
}

- (void)loadCategoriesWithCompletion:(NSString *)existingTag
                          completion:(void(^)(NSArray<Category *>*, NSString *))completion {
  __weak typeof(self) weakSelf = self;
  NSMutableURLRequest *getTagRequest = [self makeRequestForQuery:kQueryGetTag];
  NSURLSessionDataTask *getTagTask = [self.session dataTaskWithRequest:getTagRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    if (!data) {
      completion(@[], existingTag);
      return;
    }
    NSDictionary *body = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    NSString *tag = body[@"data"][@"getObjectsMetadata"][@"value"];
    if ([existingTag isEqualToString:tag]) {
      completion(@[], existingTag);
      return;
    }
    NSMutableURLRequest *getCategoriesRequest = [self makeRequestForQuery:kQueryGetCategories];
    NSURLSessionDataTask *getCategoriesTask = [self.session dataTaskWithRequest:getCategoriesRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
      if (!data) {
        completion(@[], existingTag);
        return;
      }
      NSDictionary *body = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
      NSArray<Category *> *mappedCategories = [[weakSelf mapCategoriesFromJSON:body[@"data"][@"listMobileObjects"]] copy];
      completion(mappedCategories, tag);
    }];
    [getCategoriesTask resume];
  }];
  [getTagTask resume];
}

- (NSArray<Category *>*)mapCategoriesFromJSON:(NSArray *)categories {
    NSMutableArray<Category *> *mappedCategories = [[NSMutableArray alloc] init];
    [categories enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        Category *category = [[Category alloc] init];
        category.categories = [self mapCategoriesFromJSON:obj[@"children"]];
        category.items = [self mapItemsFromJSON:obj[@"objects"] category:category];
        if ([category.categories count] > 0 || [category.items count] > 0) {
            category.title = obj[@"name"];
            category.cover = [NSString stringWithFormat:@"%@%@", kImageBaseURL, obj[@"cover"]];
            category.uuid = obj[@"id"];
            category.icon = obj[@"icon"];
            [mappedCategories addObject:category];
        }
    }];
    return mappedCategories;
}

- (NSArray<PlaceItem *>*)mapItemsFromJSON:(NSArray *)items
                                 category:(Category *)category{
    NSMutableArray<PlaceItem *> *mappedItems = [[NSMutableArray alloc] init];
    __weak typeof(self) weakSelf = self;
    [items enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        PlaceItem *placeItem = [[PlaceItem alloc] init];
        placeItem.title = obj[@"name"];
        placeItem.cover = [NSString stringWithFormat:@"%@%@", kImageBaseURL, obj[@"cover"]];
        placeItem.category = category;
        placeItem.details = [weakSelf mapDetailsFromJSON:obj];
        placeItem.coords = [weakSelf mapPointCoordsFromJSON:obj];
        placeItem.uuid = obj[@"id"];
        [mappedItems addObject:placeItem];
    }];
    return mappedItems;
}

- (CLLocationCoordinate2D)mapPointCoordsFromJSON:(NSDictionary *)item {
    if (item[@"location"] == [NSNull null]) {
      return kCLLocationCoordinate2DInvalid;
    }
    return CLLocationCoordinate2DMake([item[@"location"][@"lat"] doubleValue], [item[@"location"][@"lon"] doubleValue]);
}

- (PlaceDetails *)mapDetailsFromJSON:(NSDictionary *)item {
    PlaceDetails *details = [[PlaceDetails alloc] init];
    NSMutableArray *imageURLs = [[NSMutableArray alloc] init];
    if (item[@"images"]) {
        [item[@"images"] enumerateObjectsUsingBlock:^(id  _Nonnull imageURL, NSUInteger idx, BOOL * _Nonnull stop) {
          [imageURLs addObject:[NSString stringWithFormat:@"%@%@", kImageBaseURL, imageURL]];
        }];
    }
    details.uuid = item[@"id"];
    details.images = [imageURLs copy];
    if (item[@"address"] && ![item[@"address"] isEqual:[NSNull null]]) {
        details.address = item[@"address"];
    } else {
        details.address = @"";
    }
    if (item[@"description"] && ![item[@"description"] isEqual:[NSNull null]]) {
        details.descriptionHTML = item[@"description"];
    } else {
        details.descriptionHTML = @"";
    }
    NSMutableArray *categoryIdToItems = [[NSMutableArray alloc] init];
    
    NSArray<NSDictionary*> *linkedCategoriesFromAPI = (NSArray<NSDictionary*>*) item[@"include"];
    [linkedCategoriesFromAPI enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSString *categoryId = (NSString *) obj[@"id"];
        NSArray<NSString *> *linkedItemIds = [obj[@"objects"] copy];
        CategoryUUIDToRelatedItemUUIDs *categoryUUIDToRelatedItemUUIDs = [[CategoryUUIDToRelatedItemUUIDs alloc] init];
        categoryUUIDToRelatedItemUUIDs.categoryUUID = categoryId;
        categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs = [[NSOrderedSet alloc] initWithArray:linkedItemIds];
        [categoryIdToItems addObject:categoryUUIDToRelatedItemUUIDs];
    }];
    details.categoryIdToItems = categoryIdToItems;
    return details;
}

- (void)loadDetailsByUUID:(NSString *)uuid withCompletion:(void(^)(PlaceDetails*))completion{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:kGetDetailsBaseURL, uuid]];
    NSURLSessionDataTask *task = [self.session dataTaskWithURL:url completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if (!data) {
            return;
        }
        NSDictionary *detailsFromAPI = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
        NSLog(@"Details from API: %@", detailsFromAPI);
        PlaceDetails *parsedDetails = [[PlaceDetails alloc] init];
        parsedDetails.images = detailsFromAPI[@"images"];
        parsedDetails.address = detailsFromAPI[@"address"];
        parsedDetails.descriptionHTML = [detailsFromAPI[@"sections"] firstObject];
        NSMutableArray *categoryIdToItems = [[NSMutableArray alloc] init];
        
        NSArray<NSArray*> *linkedCategoriesFromAPI = (NSArray<NSArray*>*) detailsFromAPI[@"linkedCategories"];
        [linkedCategoriesFromAPI enumerateObjectsUsingBlock:^(NSArray * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            NSString *categoryId = obj[0];
            NSArray<NSString *> *linkedItemIds = [obj[1] copy];
            CategoryUUIDToRelatedItemUUIDs *categoryUUIDToRelatedItemUUIDs = [[CategoryUUIDToRelatedItemUUIDs alloc] init];
            categoryUUIDToRelatedItemUUIDs.categoryUUID = categoryId;
            categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs = [[NSOrderedSet alloc] initWithArray:linkedItemIds];
            [categoryIdToItems addObject:categoryUUIDToRelatedItemUUIDs];
        }];
        parsedDetails.categoryIdToItems = categoryIdToItems;
        
        completion(parsedDetails);
    }];
    
    [task resume];
}

@end
