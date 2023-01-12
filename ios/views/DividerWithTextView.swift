//
//  DividerWithTextView.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 20.12.2022.
//

import UIKit

final class DividerWithTextView: UIView {
  
  struct PresentationModel {
    let lineColor: UIColor
    let lineWidth: CGFloat
    let text: StyledText
  }
  
  private var inset: CGFloat = 8
  
  private lazy var leftLine = UIView()
  
  private lazy var rightLine = UIView()
  
  private lazy var textLabel: UILabel = {
    let label = UILabel()
    label.numberOfLines = 1
    label.textAlignment = .center
    return label
  }()
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupViews()
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func configureWith(_ model: PresentationModel) {
    [leftLine, rightLine].forEach {
      $0.backgroundColor = model.lineColor
      $0.heightAnchor.constraint(equalToConstant: model.lineWidth).isActive = true
    }
    textLabel.configureWith(model.text)
    setNeedsLayout()
  }
  
  private func setupViews() {
    [leftLine, textLabel, rightLine]
      .forEach {
        $0.translatesAutoresizingMaskIntoConstraints = false
        addSubview($0)
      }
    
    NSLayoutConstraint.activate([
      leftLine.leadingAnchor.constraint(equalTo: leadingAnchor),
      leftLine.centerYAnchor.constraint(equalTo: centerYAnchor),
      leftLine.trailingAnchor.constraint(equalTo: textLabel.leadingAnchor, constant: -inset),
      
      rightLine.trailingAnchor.constraint(equalTo: trailingAnchor),
      rightLine.centerYAnchor.constraint(equalTo: centerYAnchor),
      rightLine.leadingAnchor.constraint(equalTo: textLabel.trailingAnchor, constant: inset),
      
      textLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
      textLabel.centerXAnchor.constraint(equalTo: centerXAnchor)
    ])
  }
}
