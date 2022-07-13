//
//  ApiService.m
//  GreenTravel
//
//  Created by Alex K on 8/27/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import "ApiServiceIndexFileLegacy.h"
#import "PlaceCategory.h"
#import "IndexModel.h"
#import "DetailsModel.h"
#import "PlaceItem.h"
#import "PlaceDetails.h"
#import <CoreLocation/CoreLocation.h>
#import "TextUtils.h"
#import "CategoryUUIDToRelatedItemUUIDs.h"
#import "ConfigValues.h"
#import "ImageUtils.h"
#import "URLUtils.h"
#import <react-native-ultimate-config/ConfigValues.h>
#import "IndexModelData.h"

static NSString * const kGetDetailsBaseURL = @"http://ecsc00a0916b.epam.com:3001/api/v1/details/%@";

@interface ApiServiceIndexFileLegacy ()

@end

@implementation ApiServiceIndexFileLegacy

- (instancetype) initWithSession:(NSURLSession *)session {
    self = [super init];
    if (self) {
        _session = session;
    }
    return self;
}

- (NSString *)categoriesURL {
  return [NSString stringWithFormat:@"%@/%@",
          NATIVE_CLIENT_URL, @"objects.json"];
}

- (void)loadCategories:(NSString *)currentHash
             forceLoad:(BOOL)forceLoad
        withCompletion:(CategoriesCompletion)completion {
  IndexModelData *indexModelData = [[IndexModelData alloc] init];
  NSURL *url = [NSURL URLWithString:[self categoriesURL]];
  __weak typeof(self) weakSelf = self;
  NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url
                                                cachePolicy:NSURLRequestUseProtocolCachePolicy
                                            timeoutInterval:120];
  NSURLSessionDataTask *task = [self.session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    if (!data) {
      completion(indexModelData, @[], currentHash);
      return;
    }
    NSDictionary* headers = [(NSHTTPURLResponse *)response allHeaderFields];
    NSString *updatedHash = headers[@"ETag"];
    
    NSDictionary *parsedData = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    NSDictionary *dataSection = parsedData[@"data"];
    if (dataSection == nil || parsedData[@"data"] == [NSNull null]) {
      completion(indexModelData, @[], currentHash);
      return;
    }
    NSArray *categories = dataSection[@"listMobileObjects"];
    if (categories == nil || dataSection[@"listMobileObjects"] == [NSNull null]) {
      completion(indexModelData, @[], currentHash);
      return;
    }
    NSLog(@"Error when loading categories: %@", error);
    NSArray<PlaceCategory *> *mappedCategories = [[weakSelf mapCategoriesFromJSON:categories] copy];
    indexModelData.categoryTree = mappedCategories;
    completion(indexModelData, @[], updatedHash);
  }];
  [task resume];
}

- (NSArray<PlaceCategory *>*)mapCategoriesFromJSON:(NSArray *)categories {
  NSMutableArray<PlaceCategory *> *mappedCategories = [[NSMutableArray alloc] init];
  [categories enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    PlaceCategory *category = [[PlaceCategory alloc] init];
    category.categories = [self mapCategoriesFromJSON:obj[@"children"]];
    category.items = [self mapItemsFromJSON:obj[@"objects"] category:category];
    if ([self categoryIsValid:category rawCategory:obj]) {
      category.title = obj[@"name"];
      category.cover = getFullImageURL(obj[@"cover"]);
      category.uuid = obj[@"id"];
      category.icon = obj[@"icon"];
      [mappedCategories addObject:category];
    }
  }];
  return mappedCategories;
}

- (BOOL)categoryIsValid:(PlaceCategory *)category
            rawCategory:(NSDictionary *)rawCategory {
  return ([category.categories count] > 0 || [category.items count] > 0) &&
  rawCategory[@"icon"] != nil && ![rawCategory[@"icon"] isEqual:[NSNull null]];
}

- (NSArray<PlaceItem *>*)mapItemsFromJSON:(NSArray *)items
                                 category:(PlaceCategory *)category{
    NSMutableArray<PlaceItem *> *mappedItems = [[NSMutableArray alloc] init];
    __weak typeof(self) weakSelf = self;
    [items enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        PlaceItem *placeItem = [[PlaceItem alloc] init];
        placeItem.title = obj[@"name"];
        placeItem.cover = getFullImageURL(obj[@"cover"]);
        placeItem.category = category;
        placeItem.details = [weakSelf mapDetailsFromJSON:obj];
        placeItem.coords = [weakSelf mapPointCoordsFromJSON:obj];
        placeItem.uuid = obj[@"id"];
        if (obj[@"address"] && ![obj[@"address"] isEqual:[NSNull null]]) {
          placeItem.address = obj[@"address"];
        } else {
          placeItem.address = @"";
        }
        [mappedItems addObject:placeItem];
    }];
    return mappedItems;
}

- (CLLocationCoordinate2D)mapPointCoordsFromJSON:(NSDictionary *)item {
    if (item[@"location"] == [NSNull null] || item[@"location"][@"lat"] == [NSNull null] || item[@"location"][@"lon"] == [NSNull null] ) {
      return kCLLocationCoordinate2DInvalid;
    }
    return CLLocationCoordinate2DMake([item[@"location"][@"lat"] doubleValue], [item[@"location"][@"lon"] doubleValue]);
}

- (PlaceDetails *)mapDetailsFromJSON:(NSDictionary *)item {
  PlaceDetails *details = [[PlaceDetails alloc] init];
  NSMutableArray *imageURLs = [[NSMutableArray alloc] init];
  if (item[@"images"]) {
    [item[@"images"] enumerateObjectsUsingBlock:^(id  _Nonnull imageURL,
                                                  NSUInteger idx,
                                                  BOOL * _Nonnull stop) {
      [imageURLs addObject:getFullImageURL(imageURL)];
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
  if (item[@"url"] && ![item[@"url"] isEqual:[NSNull null]]) {
    NSString *url = encodeURL(item[@"url"]);
    details.url = url;
  } else {
    details.url = @"";
  }
  NSMutableArray<NSMutableArray<CLLocation *> *> *mappedAreaCoords = [[NSMutableArray alloc] init];
  if (item[@"area"] && ![item[@"area"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSArray<NSArray<NSNumber *> *> *> *> *coords = item[@"area"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSArray<NSArray<NSNumber *> *> *> * _Nonnull polygonPart, NSUInteger partIdx, BOOL * _Nonnull stop) {
      [mappedAreaCoords addObject:[[NSMutableArray alloc] init]];
      [polygonPart[0] enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
        [mappedAreaCoords[partIdx] addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
      }];
    }];
    details.area = [NSArray arrayWithArray:[mappedAreaCoords copy]];
  }

  NSMutableArray<CLLocation *> *mappedPathCoords = [[NSMutableArray alloc] init];
  if (item[@"routes"] && ![item[@"routes"] isEqual:[NSNull null]]) {
    NSArray<NSArray<NSNumber *> *> *coords = item[@"routes"][@"coordinates"];
    [coords enumerateObjectsUsingBlock:^(NSArray<NSNumber *> * _Nonnull coords, NSUInteger idx, BOOL * _Nonnull stop) {
      [mappedPathCoords addObject:[[CLLocation alloc] initWithLatitude:[coords[1] doubleValue] longitude:[coords[0] doubleValue]]];
    }];
    details.path = [NSArray arrayWithArray:[mappedPathCoords copy]];
  }

  details.categoryIdToItems = categoryIdToItemsFromJSON(item[@"include"]);
  details.categoryIdToItemsBelongsTo = categoryIdToItemsFromJSON(item[@"belongsTo"]);
  return details;
}

NSMutableArray* categoryIdToItemsFromJSON(NSObject *relations) {
  NSArray<NSDictionary*> *linkedCategoriesFromAPI = (NSArray<NSDictionary*>*) relations;
  NSMutableArray *categoryIdToItems = [[NSMutableArray alloc] init];
  
  [linkedCategoriesFromAPI enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    NSString *categoryId = (NSString *) obj[@"id"];
    NSArray<NSString *> *linkedItemIds = [obj[@"objects"] copy];
    CategoryUUIDToRelatedItemUUIDs *categoryUUIDToRelatedItemUUIDs = [[CategoryUUIDToRelatedItemUUIDs alloc] init];
    categoryUUIDToRelatedItemUUIDs.categoryUUID = categoryId;
    categoryUUIDToRelatedItemUUIDs.relatedItemUUIDs = [[NSOrderedSet alloc] initWithArray:linkedItemIds];
    [categoryIdToItems addObject:categoryUUIDToRelatedItemUUIDs];
  }];
  return categoryIdToItems;
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
