//
//  NoDataView.h
//  greenTravel
//
//  Created by Alex K on 27.11.21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface NoDataView : UIScrollView

- (instancetype)initWithAction:(void(^)(void))action;

@end

NS_ASSUME_NONNULL_END
