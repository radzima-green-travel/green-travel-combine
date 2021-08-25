//
//  StyleUtils.h
//  GreenTravel
//
//  Created by Alex K on 8/19/20.
//  Copyright © 2020 Alex K. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

void insertGradientLayer(UIView *view, CGFloat cornerRadius);
CAGradientLayer* createOverlayLayer(UIView *view);
UIImage* getGradientImageToFillRect(CGRect rect);
UIImage* getGradientImageToFillRectWithRadius(CGRect rect, CGFloat cornerRadius);
void configureNavigationBar(UINavigationBar *navigationBar);
void configureNavigationBarForModal(UINavigationBar *navigationBar);
void drawShadow(UIView *view);
