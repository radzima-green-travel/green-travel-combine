//
//  LabelledButtonGroup.h
//  greenTravel
//
//  Created by Alex K on 9.02.22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface LabelledButtonGroup<ContentType> : UIView<UITableViewDataSource, UITableViewDelegate>

- (instancetype)initWithConfigItems:(NSArray<ContentType> *)items
                              label:(NSString *)label
                          viewMaker:(UIView*(^)(NSObject *))viewMaker
                            onPress:(void(^)(NSObject *))onPress;
- (void)update:(NSArray<ContentType> *)items;

@end

NS_ASSUME_NONNULL_END
