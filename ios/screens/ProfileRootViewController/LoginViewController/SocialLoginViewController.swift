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
    static let disclaimerSideInset: CGFloat = 24
    static let disclaimerBottomInset: CGFloat = 8
    static let dividerHeight: CGFloat = 56
    
    static var disclaimerAttributedString: NSMutableAttributedString {
      let text = NSLocalizedString("AuthProviderChoiceScreenDisclaimerText", comment: "")
      let terms = NSLocalizedString("AuthProviderChoiceScreenUsageTermsText", comment: "")
      let privacy = NSLocalizedString("AuthProviderChoiceScreenPrivacyPolicyText", comment: "")
      let termsLink = NSLocalizedString("AuthProviderChoiceScreenUsageTermsLink", comment: "")
      let privacyLink = NSLocalizedString("AuthProviderChoiceScreenPrivacyPolicyLink", comment: "")
      
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
    
    static let dividerModel = DividerWithTextView.PresentationModel(
      lineColor: Colors.get().dividerWithText,
      lineWidth: 1,
      text: .init(text: NSLocalizedString("AuthProviderChoiceScreenDividerText", comment: ""),
                  font: .systemFont(ofSize: 14, weight: .regular),
                  color: Colors.get().dividerText))
  }
  
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
  
  private lazy var dividerWithText = DividerWithTextView()
  
  private lazy var buttons: [AppAuthProvider: ButtonWithImageAndText] = [:]
  
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
      userController.authService.socialLoginService.handleSocialSignIn(provider: provider.rawValue, on: view.window)
    }
  }
  
  private func pushEmailLoginPath() {
    let loginVC = LoginViewController(controller: userController, model: userModel)
    show(loginVC, sender: self)
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
      let button = ButtonWithImageAndText()
      button.configure(backgroundColor: provider.color,
                       image: provider.image,
                       text: provider.text,
                       border: provider.border,
                       uiConst: ButtonWithImageAndText.UIConst())
      button.onAction = { [unowned self] in
        self.handleButtonTap(provider: provider)
      }
      self.buttons[provider] = button
      self.buttonsStackView.addArrangedSubview(button)
    }
  }
  
  private func setupViews() {
    
    if buttonsStackView.arrangedSubviews.count > 1 {
      dividerWithText.translatesAutoresizingMaskIntoConstraints = false
      dividerWithText.heightAnchor.constraint(equalToConstant: UIConst.dividerHeight).isActive = true
      dividerWithText.configureWith(UIConst.dividerModel)
      buttonsStackView.insertArrangedSubview(dividerWithText, at: 1)
    }
    
    [headerLabel, buttonsStackView, disclaimerView]
      .forEach {
        $0.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview($0)
      }
    
    NSLayoutConstraint.activate([
      headerLabel.topAnchor.constraint(equalTo: contentView.topAnchor,
                                       constant: UIConst.headerLabelTopInset),
      headerLabel.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
      
      buttonsStackView.topAnchor.constraint(equalTo: headerLabel.bottomAnchor,
                                            constant: UIConst.buttonsStackTopInset),
      buttonsStackView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
      buttonsStackView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
      
      disclaimerView.topAnchor.constraint(greaterThanOrEqualTo: buttonsStackView.bottomAnchor,
                                          constant: UIConst.dividerHeight),
      disclaimerView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor,
                                              constant: UIConst.disclaimerSideInset),
      disclaimerView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor,
                                               constant: -UIConst.disclaimerSideInset),
      disclaimerView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor,
                                             constant: -UIConst.disclaimerBottomInset)
    ])
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
