//
//  Radzima_DevUITests.m
//  Radzima DevUITests
//
//  Created by Alex K on 22.10.22.
//

#import <XCTest/XCTest.h>
#import "AccessibilityIdentifiers.h"

@interface Radzima_DevUITests : XCTestCase

@end

@implementation Radzima_DevUITests

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.

    // In UI tests it is usually best to stop immediately when a failure occurs.
    self.continueAfterFailure = NO;

    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testExample {
    // UI tests must launch the application that they test.
    XCUIApplication *app = [[XCUIApplication alloc] init];
    [app launch];

    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

- (void)testTabBar {
    // UI tests must launch the application that they test.
    XCUIApplication *app = [[XCUIApplication alloc] init];
    [app launch];

    // Test that tab bar has 4 items.
    XCTAssertEqual(app.tabBars.count, 1);
    XCTAssertEqual(app.tabBars.firstMatch.buttons.count, 4);
    // Check that 1st tab bar has accessibility id "tabBarItemMain".
    XCTAssertEqualObjects([app.tabBars.firstMatch.buttons elementBoundByIndex:0].identifier, AccessibilityIdentifiersTabBarMain);
    // Check that 2nd tab bar has accessibility id "tabBarItemMap".
    XCTAssertEqualObjects([app.tabBars.firstMatch.buttons elementBoundByIndex:1].identifier, AccessibilityIdentifiersTabBarMap);
    // Check that 3rd tab bar has accessibility id "tabBarItemFavorites".
    XCTAssertEqualObjects([app.tabBars.firstMatch.buttons elementBoundByIndex:2].identifier, AccessibilityIdentifiersTabBarFavorites);
    // Check that 3rd tab bar has accessibility id "tabBarItemProfile".
    XCTAssertEqualObjects([app.tabBars.firstMatch.buttons elementBoundByIndex:3].identifier, AccessibilityIdentifiersTabBarProfile);
}

- (void)testTabBarActions {
			// UI tests must launch the application that they test.
		XCUIApplication *app = [[XCUIApplication alloc] init];
		[app launch];
		
    [app.tabBars.buttons[AccessibilityIdentifiersTabBarMain] tap];
		XCTAssertTrue([app.tabBars.firstMatch.buttons elementBoundByIndex:0].isSelected);
  
    [app.tabBars.buttons[AccessibilityIdentifiersTabBarMap] tap];
    XCTAssertTrue([app.tabBars.firstMatch.buttons elementBoundByIndex:1].isSelected);
  
    [app.tabBars.buttons[AccessibilityIdentifiersTabBarFavorites] tap];
    XCTAssertTrue([app.tabBars.firstMatch.buttons elementBoundByIndex:2].isSelected);
  
    [app.tabBars.buttons[AccessibilityIdentifiersTabBarProfile] tap];
    XCTAssertTrue([app.tabBars.firstMatch.buttons elementBoundByIndex:3].isSelected);
}

- (void)testLaunchPerformance {
    if (@available(macOS 10.15, iOS 13.0, tvOS 13.0, watchOS 7.0, *)) {
        // This measures how long it takes to launch your application.
        [self measureWithMetrics:@[[[XCTApplicationLaunchMetric alloc] init]] block:^{
            [[[XCUIApplication alloc] init] launch];
        }];
    }
}

@end
