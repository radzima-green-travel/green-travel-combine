//
//  BookmarkServiceTests.swift
//  GreenTravelTests
//
//  Created by Sergey Duhovich on 2023-03-15.
//

import XCTest
import Radzima_Dev

final class BookmarkServiceTests: XCTestCase {

  var sut: BookmarkService!

  override func setUpWithError() throws {
    sut = .init()
  }

  override func tearDownWithError() throws {
    sut = nil
  }

  func testExample() throws {
    XCTAssertNotNil(sut)
  }
}
