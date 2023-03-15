//
//  TestingViewController.swift
//  GreenTravelTests
//
//  Created by Sergey Duhovich on 2023-03-15.
//

import UIKit

class TestingViewController: UIViewController {
  override func loadView() {
    let label = UILabel()
    label.text = "Running Unit Tests..."
    label.textAlignment = .center
    label.textColor = .white
    view = label
  }
}
