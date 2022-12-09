//
//  SocialLoginViewController.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 07.12.2022.
//

import AuthenticationServices
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
//      return .init(text: NSLocalizedString("ProfileScreenPlaceholderEMail", comment: ""),
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

final class SocialLoginViewController: UIViewController {
  private lazy var appleSignInService = SocialLoginService.init()
  
  private lazy var headerLabel: UILabel = {
    let label = UILabel()
    label.text = NSLocalizedString("ProfileScreenChoiceSignIn", comment: "")
    label.font = .systemFont(ofSize: 20, weight: .medium)
    label.textColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.85)
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
    textView.text = "Disclaimer"
    textView.font = .systemFont(ofSize: 20, weight: .medium)
    textView.textColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.85)
    textView.isEditable = false
    textView.sizeToFit()
    textView.isScrollEnabled = false
    return textView
  }()
  
  private lazy var buttons: [AppAuthProvider: UIButton] = [:]
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    self.modalPresentationStyle = .fullScreen
    
    title = NSLocalizedString("ProfileScreenTitle", comment: "")
    navigationController?.navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
    navigationController?.navigationBar.barTintColor = Colors().navigationBarColor
    view.backgroundColor = .white
    
    view.addAutolayoutSubviews(headerLabel, buttonsStackView, disclaimerView)
    
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

    NSLayoutConstraint.activate([
      headerLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 64),
      headerLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      
      buttonsStackView.topAnchor.constraint(equalTo: headerLabel.bottomAnchor, constant: 20),
      buttonsStackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
      buttonsStackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
      
      disclaimerView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      disclaimerView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -8)
    ])
  }
  
  func handleButtonTap(provider: AppAuthProvider) {
    appleSignInService.window = view.window
    switch provider {
    case .apple:
      if #available(iOS 13.0, *) {
        self.appleSignInService.handleAuthorizationAppleIDButtonPress()
      } else {
        self.appleSignInService.socialSignInWithWebUI(provider: .apple)
      }
    case .facebook:
      self.appleSignInService.socialSignInWithWebUI(provider: .facebook)
    case .google:
      self.appleSignInService.socialSignInWithWebUI(provider: .google)
    case .email:
      pushEmailLoginPath()
    }
  }
  
  func pushEmailLoginPath() {
    let vc = LoginViewController()
    show(vc, sender: self)
  }
  
  func makeButton(backgroundColor: UIColor,
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

extension UIControl {
  func addAction(for controlEvents: UIControl.Event = .touchUpInside, _ closure: @escaping () -> Void) {
    @objc class ClosureSleeve: NSObject {
      let closure: () -> Void
      init(_ closure: @escaping () -> Void) { self.closure = closure }
      @objc func invoke() { closure() }
    }
    let sleeve = ClosureSleeve(closure)
    addTarget(sleeve, action: #selector(ClosureSleeve.invoke), for: controlEvents)
    objc_setAssociatedObject(self, "\(UUID())", sleeve, objc_AssociationPolicy.OBJC_ASSOCIATION_RETAIN)
  }
}
