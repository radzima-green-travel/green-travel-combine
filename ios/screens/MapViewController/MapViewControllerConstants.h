//
//  MapViewControllerConstants.h
//  greenTravel
//
//  Created by Alex K on 6/5/21.
//

FOUNDATION_EXPORT NSString* const MapViewControllerSourceIdAll;
FOUNDATION_EXPORT NSString* const MapViewControllerSourceIdPoint;
FOUNDATION_EXPORT NSString* const MapViewControllerSourceIdPath;
FOUNDATION_EXPORT NSString* const MapViewControllerSourceIdOutline;
FOUNDATION_EXPORT NSString* const MapViewControllerSourceIdPolygon;
FOUNDATION_EXPORT NSString* const MapViewControllerSourceIdDirections;

FOUNDATION_EXPORT NSString* const MapViewControllerClusterLayerId;
FOUNDATION_EXPORT NSString* const MapViewControllerMarkerLayerId;
FOUNDATION_EXPORT NSString* const MapViewControllerPolygonLayerId;
FOUNDATION_EXPORT NSString* const MapViewControllerPathLayerId;
FOUNDATION_EXPORT NSString* const MapViewControllerOutlineLayerId;
FOUNDATION_EXPORT NSString* const MapViewControllerPointLayerId;
FOUNDATION_EXPORT NSString* const MapViewControllerDirectionsLayerId;

FOUNDATION_EXPORT CGFloat const MapViewControllerAttributionButtonInset;

typedef NS_ENUM(NSInteger, MapViewControllerType) {
  MapViewControllerTypeDetails = 0,
  MapViewControllerTypeFull = 1,
};


