//
//  ProfileTableViewControllerUtils.h
//  greenTravel
//
//  Created by Vitali Nabarouski on 23.08.22.
//
#import <UIKit/UIKit.h>
#import "ProfileTableViewController.h"

NSMutableArray* configureBaseTableViewCells(ProfileTableViewController* controller);
NSMutableArray* configureSignedInTableViewCells(ProfileTableViewController* controller);
NSMutableArray* configureTryToSignInTableViewCells(ProfileTableViewController *controller);

