//
//  UIView+layout.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 10.12.2022.
//

import UIKit

extension UIView {
  func addAutolayoutSubview(_ view: UIView) {
    view.translatesAutoresizingMaskIntoConstraints = false
    addSubview(view)
  }
  
  func addAutolayoutSubviews(_ views: UIView...) {
    views.forEach { addAutolayoutSubview($0) }
  }
}

extension UIStackView {
  func addArrangedSubviews(_ views: UIView...) {
    views.forEach { addArrangedSubview($0) }
  }
}
