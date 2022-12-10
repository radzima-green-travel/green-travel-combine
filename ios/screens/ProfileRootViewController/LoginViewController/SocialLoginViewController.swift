//
//  SocialLoginViewController.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 07.12.2022.
//

import UIKit

final class SocialLoginViewController: BaseFormViewController {
  private lazy var loginService = SocialLoginService()
  
  private lazy var headerLabel: UILabel = {
    let label = UILabel()
    label.text = NSLocalizedString("ProfileScreenChoiceSignIn", comment: "")
    label.font = .systemFont(ofSize: 20, weight: .medium)
    label.textColor = Colors().mainText
    return label
  }()
  
  private lazy var buttonsStackView: UIStackView = {
    let stackView = UIStackView()
    stackView.axis = .vertical
    stackView.spacing = 12
    stackView.distribution = .equalSpacing
    return stackView
  }()
  
  private lazy var disclaimerView: UITextView = {
    let textView = UITextView()
    textView.linkTextAttributes = [.foregroundColor: Colors().mainTextLink]
    textView.attributedText = makeDisclaimerAttributedString()
    textView.backgroundColor = nil
    textView.textAlignment = .center
    textView.delegate = self
    textView.isSelectable = true
    textView.isEditable = false
    textView.delaysContentTouches = false
    textView.isScrollEnabled = false
    return textView
  }()
  
  private lazy var buttons: [AppAuthProvider: UIButton] = [:]
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    makeProviderButtons()
    setupViews()
  }
  
  private func handleButtonTap(provider: AppAuthProvider) {
    switch provider {
    case .email:
      pushEmailLoginPath()
    case .apple, .facebook, .google:
      loginService.handleSocialSignIn(provider: provider, on: view.window)
    }
  }
  
  private func pushEmailLoginPath() {
    let vc = LoginViewController(controller: userController, model: userModel)
    show(vc, sender: self)
  }
  
  private func makeDisclaimerAttributedString() -> NSMutableAttributedString {
    let text = NSLocalizedString("DisclaimerText", comment: "")
    let terms = NSLocalizedString("UsageTermsText", comment: "")
    let privacy = NSLocalizedString("PrivacyPolicyText", comment: "")
    let termsLink = NSLocalizedString("UsageTermsLink", comment: "")
    let privacyLink = NSLocalizedString("PrivacyPolicyLink", comment: "")
    
    let attributedString = NSMutableAttributedString(string: text)
    attributedString.addAttribute(.link, value: termsLink, range: (attributedString.string as NSString).range(of: terms))
    attributedString.addAttribute(.link, value: privacyLink, range: (attributedString.string as NSString).range(of: privacy))
    attributedString.addAttributes(
      [
        .foregroundColor: Colors().auxiliaryText,
        .font: UIFont.systemFont(ofSize: 12),
        .backgroundColor: UIColor.clear
      ],
      range: NSMakeRange(0, text.count))
    return attributedString
  }
}

extension SocialLoginViewController: UITextViewDelegate {
  func textView(_ textView: UITextView, shouldInteractWith URL: URL, in characterRange: NSRange, interaction: UITextItemInteraction) -> Bool {
    return true
  }
}

// Layout
extension SocialLoginViewController {
  private func makeProviderButtons() {
    AppAuthProvider.allCases.forEach { provider in
      let button = self.makeButton(backgroundColor: provider.color,
                                   image: provider.image,
                                   text: provider.text,
                                   border: provider.border)
      button.addAction { [unowned self] in
        self.handleButtonTap(provider: provider)
      }
      self.buttons[provider] = button
      self.buttonsStackView.addArrangedSubview(button)
    }
  }
  
  private func setupViews() {
    view.addAutolayoutSubviews(headerLabel, buttonsStackView, disclaimerView)
    NSLayoutConstraint.activate([
      headerLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 64),
      headerLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      
      buttonsStackView.topAnchor.constraint(equalTo: headerLabel.bottomAnchor, constant: 20),
      buttonsStackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
      buttonsStackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
      
      disclaimerView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
      disclaimerView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
      disclaimerView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -8)
    ])
  }
  
  private func makeButton(backgroundColor: UIColor,
                          image: UIImage,
                          text: Text,
                          border: Border? = nil) -> UIButton {
    let button = UIButton()
    button.backgroundColor = backgroundColor
    button.setTitle(text.text, for: .normal)
    button.titleLabel?.font = text.font
    button.setTitleColor(text.color, for: .normal)
    button.setImage(image, for: .normal)
    
    if let imageView = button.imageView {
      imageView.translatesAutoresizingMaskIntoConstraints = false
      imageView.contentMode = .scaleAspectFit
      NSLayoutConstraint.activate([
        imageView.leadingAnchor.constraint(equalTo: button.leadingAnchor, constant: 18),
        imageView.centerYAnchor.constraint(equalTo: button.centerYAnchor),
        imageView.heightAnchor.constraint(equalToConstant: 20),
        imageView.widthAnchor.constraint(equalToConstant: 20)
      ])
    }
    
    if let border = border {
      button.layer.borderColor = border.color
      button.layer.borderWidth = border.width
    }
    button.layer.cornerRadius = 12
    
    button.translatesAutoresizingMaskIntoConstraints = false
    button.heightAnchor.constraint(equalToConstant: 48).isActive = true
    return button
  }
}
