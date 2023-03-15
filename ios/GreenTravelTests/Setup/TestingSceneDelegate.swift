//
//  TestingSceneDelegate.swift
//  GreenTravelTests
//
//  Created by Sergey Duhovich on 2023-03-15.
//

import UIKit

class TestingSceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = (scene as? UIWindowScene) else { return }
    window = UIWindow(windowScene: windowScene)
    window?.rootViewController = TestingViewController()
    window?.makeKeyAndVisible()
  }
}
