//
//  UILabel+StyledText.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 20.12.2022.
//

import UIKit

extension UILabel {
  func configureWith(_ text: StyledText) {
    self.text = text.text
    textColor = text.color
    font = text.font
  }
}
