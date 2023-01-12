//
//  AppAuthProvider.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 10.12.2022.
//

import UIKit

// helper style structs
struct StyledText {
  let text: String
  let font: UIFont
  let color: UIColor
  
  init(text: String,
       font: UIFont = .systemFont(ofSize: 16, weight: .regular),
       color: UIColor = Colors.get().buttonNewDataText) {
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
}

// contains style properties and data for corresponding buttons
extension AppAuthProvider {
  var text: StyledText {
    let continueText = NSLocalizedString("AuthProviderChoiceScreenContinueWith", comment: "")
    switch self {
    case .apple:
      return .init(text: continueText + rawValue.capitalized,
                   color: Colors.get().whiteAndBlack)
    case .facebook, .google:
      return .init(text: continueText + rawValue.capitalized,
                   color: Colors.get().blackAndWhite)
    case .email:
      return .init(text: continueText + NSLocalizedString("AuthProviderChoiceScreenEmailButton", comment: ""),
                   color: Colors.get().blackAndWhite)
    }
  }
  
  var image: UIImage {
    let image = UIImage(named: "logo-\(rawValue)")?.withRenderingMode(.alwaysOriginal) ?? UIImage()
    switch self {
    case .apple:
      return image.imageWithColor(color: Colors.get().whiteAndBlack) ?? UIImage()
    case .facebook, .google:
      return image
    case .email:
      return image.imageWithColor(color: Colors.get().blackAndWhite) ?? UIImage()
    }
  }
  
  var color: UIColor {
    switch self {
    case .apple:
      return Colors.get().blackAndWhite
    default:
      return Colors.get().loginButtonBackground
    }
  }
  
  var border: Border? {
    switch self {
    case .apple:
      return nil
    default:
      return .init(color: Colors.get().loginButtonBorder.cgColor, width: 2)
    }
  }
}
