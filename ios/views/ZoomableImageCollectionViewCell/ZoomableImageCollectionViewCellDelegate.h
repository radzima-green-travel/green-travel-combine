//
//  ZoomableImageCollectionViewCellDelegate.h
//  greenTravel
//
//  Created by Alex K on 5.12.21.
//

#import <Foundation/Foundation.h>
#import ""

NS_ASSUME_NONNULL_BEGIN

@protocol ZoomableImageCollectionViewCellDelegate <NSObject>

- (void)setZooming:(BOOL)zooming;

@end

NS_ASSUME_NONNULL_END
