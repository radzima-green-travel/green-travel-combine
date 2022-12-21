//
//  SocialLoginViewController.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 07.12.2022.
//

import UIKit

final class SocialLoginViewController: BaseFormViewController {
  private enum UIConst {
    static let headerLabelText: StyledText = .init(text: NSLocalizedString("LogInTitle", comment: ""),
                                             font: .systemFont(ofSize: 20, weight: .medium),
                                             color: Colors.get().blackAndWhite)
    static let buttonsStackSpacing: CGFloat = 16
    static let headerLabelTopInset: CGFloat = 64
    static let buttonsStackTopInset: CGFloat = 24
    static let buttonsStackSideInset: CGFloat = 16
    static let disclaimerSideInset: CGFloat = 24
    static let disclaimerBottomInset: CGFloat = 8
    static let buttonImageInset: CGFloat = 18
    static let buttonImageSize: CGSize = .init(width: 20, height: 20)
    static let buttonCornerRadius: CGFloat = 12
    static let buttonHeight: CGFloat = 48
    static let dividerHeight: CGFloat = 56
    
    static var disclaimerAttributedString: NSMutableAttributedString {
      let text = NSLocalizedString("DisclaimerText", comment: "")
      let terms = NSLocalizedString("UsageTermsText", comment: "")
      let privacy = NSLocalizedString("PrivacyPolicyText", comment: "")
      let termsLink = NSLocalizedString("UsageTermsLink", comment: "")
      let privacyLink = NSLocalizedString("PrivacyPolicyLink", comment: "")
      
      let attributedString = NSMutableAttributedString(string: text)
      attributedString.addAttribute(.link,
                                    value: termsLink,
                                    range: (attributedString.string as NSString).range(of: terms))
      attributedString.addAttribute(.link,
                                    value: privacyLink,
                                    range: (attributedString.string as NSString).range(of: privacy))
      attributedString.addAttributes([.foregroundColor: Colors.get().disclaimerText,
                                      .font: UIFont.systemFont(ofSize: 12),
                                      .backgroundColor: UIColor.clear],
                                     range: NSMakeRange(0, text.count))
      return attributedString
    }
    
    static let dividerModel = DiviverWithTextView.PresentationModel(
      lineColor: Colors.get().dividerWithText,
      lineWidth: 1,
      text: .init(text: NSLocalizedString("DividerText", comment: ""),
                  font: .systemFont(ofSize: 14, weight: .regular),
                  color: Colors.get().dividerText))
  }
  
  private lazy var loginService = SocialLoginService()
  
  private lazy var headerLabel: UILabel = {
    let label = UILabel()
    label.configureWith(UIConst.headerLabelText)
    return label
  }()
  
  private lazy var buttonsStackView: UIStackView = {
    let stackView = UIStackView()
    stackView.axis = .vertical
    stackView.distribution = .equalSpacing
    stackView.spacing = UIConst.buttonsStackSpacing
    return stackView
  }()
  
  private lazy var disclaimerView: UITextView = {
    let textView = UITextView()
    textView.linkTextAttributes = [.foregroundColor: Colors.get().disclaimerText,
                                   .underlineStyle: NSUnderlineStyle.single.rawValue]
    textView.attributedText = UIConst.disclaimerAttributedString
    textView.backgroundColor = nil
    textView.textAlignment = .center
    textView.delegate = self
    textView.isSelectable = true
    textView.isEditable = false
    textView.delaysContentTouches = false
    textView.isScrollEnabled = false
    return textView
  }()
  
  private lazy var dividerWithText = DiviverWithTextView()
  
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
      loginService.handleSocialSignIn(provider: provider.rawValue, on: view.window)
    }
  }
  
  private func pushEmailLoginPath() {
    let vc = LoginViewController(controller: userController, model: userModel)
    show(vc, sender: self)
  }
}

// handling links in the disclaimer text view
extension SocialLoginViewController: UITextViewDelegate {
  func textView(_ textView: UITextView,
                shouldInteractWith URL: URL,
                in characterRange: NSRange,
                interaction: UITextItemInteraction) -> Bool {
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
    
    if buttonsStackView.arrangedSubviews.count > 1 {
      dividerWithText.enableAutolayout()
      dividerWithText.heightAnchor.constraint(equalToConstant: UIConst.dividerHeight).isActive = true
      dividerWithText.configureWith(UIConst.dividerModel)
      buttonsStackView.insertArrangedSubview(dividerWithText, at: 1)
    }
    
    view.addAutolayoutSubviews(headerLabel, buttonsStackView, disclaimerView)
    
    NSLayoutConstraint.activate([
      headerLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor,
                                       constant: UIConst.headerLabelTopInset),
      headerLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      
      buttonsStackView.topAnchor.constraint(equalTo: headerLabel.bottomAnchor,
                                            constant: UIConst.buttonsStackTopInset),
      buttonsStackView.leadingAnchor.constraint(equalTo: view.leadingAnchor,
                                                constant: UIConst.buttonsStackSideInset),
      buttonsStackView.trailingAnchor.constraint(equalTo: view.trailingAnchor,
                                                 constant: -UIConst.buttonsStackSideInset),
      
      disclaimerView.leadingAnchor.constraint(equalTo: view.leadingAnchor,
                                              constant: UIConst.disclaimerSideInset),
      disclaimerView.trailingAnchor.constraint(equalTo: view.trailingAnchor,
                                               constant: -UIConst.disclaimerSideInset),
      disclaimerView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor,
                                             constant: -UIConst.disclaimerBottomInset)
    ])
  }
  
  private func makeButton(backgroundColor: UIColor,
                          image: UIImage,
                          text: StyledText,
                          border: Border? = nil) -> UIButton {
    let button = UIButton()
    button.backgroundColor = backgroundColor
    button.setTitle(text.text, for: .normal)
    button.titleLabel?.font = text.font
    button.setTitleColor(text.color, for: .normal)
    button.setImage(image, for: .normal)
    button.titleLabel?.textAlignment = .center
    
    if let imageView = button.imageView,
       let titleLabel = button.titleLabel {
      imageView.enableAutolayout()
      titleLabel.enableAutolayout()
      imageView.contentMode = .scaleAspectFit
      NSLayoutConstraint.activate([
        imageView.leadingAnchor.constraint(equalTo: button.leadingAnchor,
                                           constant: UIConst.buttonImageInset),
        imageView.centerYAnchor.constraint(equalTo: button.centerYAnchor),
        imageView.heightAnchor.constraint(equalToConstant: UIConst.buttonImageSize.height),
        imageView.widthAnchor.constraint(equalToConstant: UIConst.buttonImageSize.width),
        
        titleLabel.centerYAnchor.constraint(equalTo: button.centerYAnchor),
        titleLabel.centerXAnchor.constraint(equalTo: button.centerXAnchor)
      ])
    }
    
    if let border = border {
      button.layer.borderColor = border.color
      button.layer.borderWidth = border.width
    }
    button.layer.cornerRadius = UIConst.buttonCornerRadius
    
    button.enableAutolayout()
    button.heightAnchor.constraint(equalToConstant: UIConst.buttonHeight).isActive = true
    return button
  }
  
  // update buttons borders and images when toggle the appearance
  override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    if #available(iOS 13.0, *) {
      if traitCollection.hasDifferentColorAppearance(comparedTo: previousTraitCollection) {
        buttons.forEach {
          if let border = $0.key.border {
            $0.value.layer.borderColor = border.color
            $0.value.layer.borderWidth = border.width
          }
          $0.value.setImage($0.key.image, for: .normal)
        }
      }
    }
  }
}
