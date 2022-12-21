//
//  AppleSignInService.swift
//  greenTravel
//
//  Created by Aleksei Permiakov on 02.12.2022.
//

import Amplify
import AuthenticationServices
import AWSMobileClient

final class SocialLoginService: NSObject {
  
  private var window: UIWindow?
  
  func handleSocialSignIn(provider: String, on window: UIWindow?) {
    self.window = window
    switch provider {
    case "apple":
      handleAppleSignIn()
    case "facebook":
      socialSignInWithWebUI(provider: .facebook)
    case "google":
      socialSignInWithWebUI(provider: .google)
    default:
      break
    }
  }
  
  private func handleAppleSignIn() {
    if #available(iOS 13.0, *) {
      let appleIDProvider = ASAuthorizationAppleIDProvider()
      let request = appleIDProvider.createRequest()
      request.requestedScopes = [.fullName, .email]
      
      let authorizationController = ASAuthorizationController(authorizationRequests: [request])
      authorizationController.delegate = self
      authorizationController.presentationContextProvider = self
      authorizationController.performRequests()
    } else {
      socialSignInWithWebUI(provider: .apple)
    }
  }
  
  private func socialSignInWithWebUI(provider: AuthProvider) {
    Amplify.Auth.signInWithWebUI(for: provider, presentationAnchor: window ?? UIWindow()) { result in
      switch result {
      case .success(let signInFlow):
        print("Next step: \(signInFlow.nextStep)")
        print("Sign in succeeded: \(signInFlow.isSignedIn)")
      case .failure(let error):
        print("Sign in failed \(error)")
      }
    }
  }
}

@available(iOS 13.0, *)
extension SocialLoginService: ASAuthorizationControllerDelegate {
  public func authorizationController(controller: ASAuthorizationController,
                                      didCompleteWithAuthorization authorization: ASAuthorization) {
    guard let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential,
          let identityTokenData = appleIDCredential.identityToken else {
      print("🍏 No token available")
      return
    }
    
    guard let identityToken = String(data: identityTokenData, encoding: .utf8) else {
      print("🍏 Can't convert identity token data to string")
      return
    }
    
    AWSMobileClient.default().federatedSignIn(providerName: IdentityProvider.apple.rawValue,
                                              token: identityToken) { userState, error in
      if let error = error {
        print("🍏 Error in federatedSignIn: \(error)")
        return
      }
      
      guard let userState = userState else {
        print("🍏 userState unexpectedly nil")
        return
      }
      
      print("🍏 federatedSignIn successful: \(userState)")
    }
  }
  
  public func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
    print("🍏 Error: \(error)")
  }
}

@available(iOS 13.0, *)
extension SocialLoginService: ASAuthorizationControllerPresentationContextProviding {
  public func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
    window ?? UIWindow()
  }
}
