//
//  AppAuthProvider.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 10.12.2022.
//

import UIKit

struct Text {
  let text: String
  let font: UIFont
  let color: UIColor
  
  init(text: String,
       font: UIFont = .systemFont(ofSize: 16, weight: .regular),
       color: UIColor = .white) {
    self.text = text
    self.font = font
    self.color = color
  }
}

struct Border {
  let color: CGColor
  let width: CGFloat
}

enum AppAuthProvider: String, CaseIterable {
  case apple
  case facebook
  case google
  case email
  
  var text: Text {
    switch self {
    case .apple, .facebook, .google:
      return .init(text: NSLocalizedString("ContinueWith", comment: "") + rawValue.capitalized)
    case .email:
      return .init(text: NSLocalizedString("ContinueWith", comment: "") + rawValue.capitalized,
                   color: UIColor(red: 0, green: 0, blue: 0, alpha: 0.85))
    }
  }
  
  var image: UIImage {
    UIImage(named: "\(rawValue)-logo")?.withRenderingMode(.alwaysOriginal) ?? UIImage()
  }
  
  var color: UIColor {
    switch self {
    case .apple:
      return UIColor(red: 0.033, green: 0.033, blue: 0.033, alpha: 1)
    case .facebook:
      return UIColor(red: 0.035, green: 0.427, blue: 0.851, alpha: 1)
    case .google:
      return UIColor(red: 1, green: 0.337, blue: 0.369, alpha: 1)
    case .email:
      return .white
    }
  }
  
  var border: Border? {
    switch self {
    case .email:
      return .init(color: UIColor(red: 0.225, green: 0.225, blue: 0.225, alpha: 1).cgColor,
                   width: 2)
    default:
      return nil
    }
  }
}

