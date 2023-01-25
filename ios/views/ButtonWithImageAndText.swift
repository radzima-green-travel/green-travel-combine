//
//  ButtonWithImageAndText.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 16.01.2023.
//

import UIKit

public final class ButtonWithImageAndText: UIButton {
  
  struct UIConst {
    var buttonImageInset: CGFloat = 18
    var buttonImageSize: CGSize = .init(width: 20, height: 20)
    var buttonCornerRadius: CGFloat = 12
    var buttonHeight: CGFloat = 48
  }
  
  var onAction: (() -> Void)?
  
  func configure(backgroundColor: UIColor,
                 image: UIImage,
                 text: StyledText,
                 border: ButtonBorder? = nil,
                 uiConst: UIConst) {
    self.backgroundColor = backgroundColor
    setTitle(text.text, for: .normal)
    titleLabel?.font = text.font
    setTitleColor(text.color, for: .normal)
    setImage(image, for: .normal)
    titleLabel?.textAlignment = .center
    
    if let imageView = imageView,
       let titleLabel = titleLabel {
      imageView.translatesAutoresizingMaskIntoConstraints = false
      titleLabel.translatesAutoresizingMaskIntoConstraints = false
      imageView.contentMode = .scaleAspectFit
      NSLayoutConstraint.activate([
        imageView.leadingAnchor.constraint(equalTo: leadingAnchor,
                                           constant: uiConst.buttonImageInset),
        imageView.centerYAnchor.constraint(equalTo: centerYAnchor),
        imageView.heightAnchor.constraint(equalToConstant: uiConst.buttonImageSize.height),
        imageView.widthAnchor.constraint(equalToConstant: uiConst.buttonImageSize.width),
        
        titleLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
        titleLabel.centerXAnchor.constraint(equalTo: centerXAnchor)
      ])
    }
    
    if let border = border {
      layer.borderColor = border.color
      layer.borderWidth = border.width
    }
    layer.cornerRadius = uiConst.buttonCornerRadius
    
    translatesAutoresizingMaskIntoConstraints = false
    heightAnchor.constraint(equalToConstant: uiConst.buttonHeight).isActive = true
    
    addTarget(self, action: #selector(onTap), for: .touchUpInside)
  }
  
  @objc func onTap() {
    onAction?()
  }
}
