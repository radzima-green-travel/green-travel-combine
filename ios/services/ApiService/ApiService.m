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

static NSString * const kGetCategoriesURL = @"http://ecsc00a0916b.epam.com:3001/api/v1/object?mobile=true";
static NSString * const kGetDetailsBaseURL = @"http://ecsc00a0916b.epam.com:3001/api/v1/details/%@";

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

- (void)loadCategoriesWithCompletion:(void(^)(NSArray<Category *>*, NSString *))completion {
    NSURL *url = [NSURL URLWithString:kGetCategoriesURL];
    __weak typeof(self) weakSelf = self;
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url
                                                  cachePolicy:NSURLRequestUseProtocolCachePolicy
                                              timeoutInterval:120];
    NSURLSessionDataTask *task = [self.session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if (!data) {
            completion(@[], @"");
            return;
        }
        NSDictionary* headers = [(NSHTTPURLResponse *)response allHeaderFields];
        NSString *eTag = headers[@"ETag"];
        
        NSArray *categories = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
        NSLog(@"Error when loading categories: %@", error);
        NSArray<Category *> *mappedCategories = [[weakSelf mapCategoriesFromJSON:categories] copy];
        completion(mappedCategories, eTag);
    }];
    [task resume];
}

- (NSArray<Category *>*)mapCategoriesFromJSON:(NSArray *)categories {
    NSMutableArray<Category *> *mappedCategories = [[NSMutableArray alloc] init];
    [categories enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        Category *category = [[Category alloc] init];
        category.categories = [self mapCategoriesFromJSON:obj[@"children"]];
        category.items = [self mapItemsFromJSON:obj[@"objects"] category:category];
        if ([category.categories count] > 0 || [category.items count] > 0) {
            category.title = obj[@"name"];
            category.cover = obj[@"cover"];
            category.uuid = obj[@"_id"];
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
        placeItem.cover = obj[@"cover"];
        placeItem.category = category;
        placeItem.details = [weakSelf mapDetailsFromJSON:obj];
        placeItem.coords = [weakSelf mapPointCoordsFromJSON:obj];
        placeItem.uuid = obj[@"_id"];
        [mappedItems addObject:placeItem];
    }];
    return mappedItems;
}

- (CLLocationCoordinate2D)mapPointCoordsFromJSON:(NSDictionary *)item {
    if (item[@"location"] == [NSNull null]) {
      return kCLLocationCoordinate2DInvalid;
    }
    return CLLocationCoordinate2DMake([item[@"location"][@"coordinates"][1] doubleValue], [item[@"location"][@"coordinates"][0] doubleValue]);
}

- (PlaceDetails *)mapDetailsFromJSON:(NSDictionary *)item {
    PlaceDetails *details = [[PlaceDetails alloc] init];
    NSMutableArray *imageURLs = [[NSMutableArray alloc] init];
    if (item[@"images"]) {
        [item[@"images"] enumerateObjectsUsingBlock:^(id  _Nonnull imageURL, NSUInteger idx, BOOL * _Nonnull stop) {
            [imageURLs addObject:imageURL];
        }];
    }
    details.uuid = item[@"_id"];
    details.images = [imageURLs copy];
    if (item[@"address"]) {
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
        NSString *categoryId = (NSString *) obj[@"_id"];
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
