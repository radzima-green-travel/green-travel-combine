//
//  UIView+layout.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 10.12.2022.
//

import UIKit

extension UIView {
  func enableAutolayout() {
    translatesAutoresizingMaskIntoConstraints = false
  }
  
  func disableAutolayout() {
    translatesAutoresizingMaskIntoConstraints = true
  }
  
  func addAutolayoutSubview(_ view: UIView) {
    view.enableAutolayout()
    addSubview(view)
  }
  
  func addAutolayoutSubviews(_ views: UIView...) {
    views.forEach { addAutolayoutSubview($0) }
  }
}
