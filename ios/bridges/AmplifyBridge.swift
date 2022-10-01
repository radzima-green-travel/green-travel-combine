//
//  AmplifyBridge.swift
//  greenTravel
//
//  Created by Alex K on 3.05.22.
//


import Amplify
import AmplifyPlugins
import Foundation
import UIKit

@objc
class AmplifyBridge: NSObject {
  override init() {
    super.init()
  }
  
  @objc public func initialize() {
    do {
      try Amplify.add(plugin: AWSCognitoAuthPlugin())
      try Amplify.configure()
      print("Amplify configured with Auth and Analytics plugins.")
    } catch {
      print("Failed to initialize Amplify with \(error).")
    }
  }
  
  @objc public func fetchCurrentAuthSession(completion: @escaping (_ err: NSError?, _ signedIn: Bool) -> Void) {
    _ = Amplify.Auth.fetchAuthSession { result in
      switch result {
      case .success(let session):
        print("Is user signed in - \(session.isSignedIn)")
        completion(nil, session.isSignedIn)
      case .failure(let error):
        print("Fetch session failed with error \(error)")
        let customError = NSError(domain: "app.radzima", code: 1, userInfo: [
          "message": "Fetch session failed with error \(error)"
        ])
        completion(customError, false)
      }
    }
  }
  
  @objc public func signIn(username: String, password: String,
                           completion: @escaping (_ err: NSError?) -> Void) {
    Amplify.Auth.signIn(username: username, password: password, options: nil) { result in
      switch result {
      case .success(let signInResult):
        if (!signInResult.isSignedIn) {
          let customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorNotSignedIn.rawValue)
          completion(customError)
        }
        completion(nil)
      case .failure(let error):
        print("An error occurred while signing in a user \(error)")
        var customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorSignInFailed.rawValue)
        
        switch error {
        case .notAuthorized(_, _, _):
          customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorNotAuthorized.rawValue)
        default: break
        }
        
        if let authError = error as? AuthError,
           let cognitoAuthError = authError.underlyingError as? AWSCognitoAuthError {
          switch cognitoAuthError {
          case .userNotFound:
            customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorUserNotFound.rawValue)
          default:
            break
          }
        }
        completion(customError)
      }
    }
  }
  
  @objc public func fetchUserAttributes(completion: @escaping (_ userEmail: String?, _ error: NSError?) -> Void) {
    Amplify.Auth.fetchUserAttributes() { result in
      switch result {
      case .success(let attributes):
        var attributeEmail: String?
        attributes.forEach { attribute in
          if attribute.key == AuthUserAttributeKey.email {
          attributeEmail = attribute.value
          }
        }
        completion(attributeEmail, nil)
      case .failure(let error):
        print(error.localizedDescription)
        completion(nil, error as NSError)
      }
    }
  }
  
  @objc public func resetPassword(username: String,
                                  completion: @escaping (_ err: NSError?) -> Void) {
    Amplify.Auth.resetPassword(for: username) { result in
      do {
        let resetResult = try result.get()
        switch resetResult.nextStep {
        case .confirmResetPasswordWithCode(let deliveryDetails, let info):
          print("Confirm reset password with code send to - \(deliveryDetails) \(info)")
          completion(nil) 
        case .done:
          print("Reset completed")
          completion(nil)
        }
      } catch {
        print("An error occurred while resetting the password \(error)")
        var customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorResetPasswordFailed.rawValue)
        if let authError = error as? AuthError,
            let cognitoAuthError = authError.underlyingError as? AWSCognitoAuthError {
            switch cognitoAuthError {
            case .userNotFound:
              customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorUserNotFound.rawValue)
            default:
                break
            }
        }
        completion(customError)
      }
    }
  }
  
  @objc public func resetPasswordConfirm(username: String,
                                         code: String,
                                         newPassword: String,
                                         completion: @escaping (_ err: NSError?) -> Void) {
    Amplify.Auth.confirmResetPassword(for: username, with: newPassword, confirmationCode: code, options:nil) {
      result in
      switch result {
      case .success(()):
        completion(nil)
      case .failure(let error):
        print("An error occurred while confirming password reset \(error)")
        var customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorResetPasswordConfirmFailed.rawValue)
        if let authError = error as? AuthError,
            let cognitoAuthError = authError.underlyingError as? AWSCognitoAuthError {
            switch cognitoAuthError {
            case .codeMismatch:
              customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorCodeMismatch.rawValue)
            case .invalidPassword:
              customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorInvalidPassword.rawValue)
            default:
                break
            }
        }
        completion(customError)
      }
    }
  }
  
  @objc public func signUp(username: String, password: String, email: String,
                           completion: @escaping (_ err: NSError?) -> Void) {
    let emailParts = email.components(separatedBy: "@")
    guard let familyName = emailParts.first else {
      let customError = NSError(domain: "app.radzima", code: 1, userInfo: [
        "message": "Cannot extract family name from email"
      ])
      completion(customError)
      return
    }
    let userAttributes = [AuthUserAttribute(.email, value: email),
                          AuthUserAttribute(.familyName, value: familyName),
                          AuthUserAttribute(.name, value: familyName)]
    let options = AuthSignUpRequest.Options(userAttributes: userAttributes)
    
    Amplify.Auth.signUp(username: username, password: password, options: options) { result in
      switch result {
      case .success(let signUpResult):
        if case let .confirmUser(deliveryDetails, _) = signUpResult.nextStep {
          print("Delivery details \(String(describing: deliveryDetails))")
        } else {
          print("SignUp Complete")
        }
        completion(nil)
      case .failure(let error):
        print("An error occurred while registering a user \(error)")
        var customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorSignUpFailed.rawValue)
        if let authError = error as? AuthError,
            let cognitoAuthError = authError.underlyingError as? AWSCognitoAuthError {
            switch cognitoAuthError {
            case .usernameExists:
              customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorUsernameExists.rawValue)
            default:
                break
            }
        }
        
        completion(customError)
      }
    }
  }
  
  @objc public func confirmSignUp(for username: String, with confirmationCode: String,
                                  completion: @escaping (_ err: NSError?) -> Void) {
    Amplify.Auth.confirmSignUp(for: username, confirmationCode: confirmationCode) { result in
      switch result {
      case .success:
        print("Confirm signUp succeeded")
        completion(nil)
      case .failure(let error):
        let customError = NSError(domain: "app.radzima", code: 1, userInfo: [
          "message": "Confirm sign up failed with error \(error)"
        ])
        print("An error occurred while confirming sign up \(error)")
        completion(customError)
      }
    }
  }
  
  @objc public func resendSignUpCode(for username: String,
                                  completion: @escaping (_ err: NSError?) -> Void) {
    Amplify.Auth.resendSignUpCode(for: username, options: nil) { result in
      switch result {
      case .success:
        print("Resend of confirmatin code succeeded")
        completion(nil)
      case .failure(let error):
        let customError = NSError(domain: "app.radzima", code: 1, userInfo: [
          "message": "Resend of confirmation code failed with error \(error)"
        ])
        print("Resend of confirmation code failed \(error)")
        completion(customError)
      }
    }
  }
  
  @objc public func logOut(completion: @escaping (_ err: NSError?) -> Void) {
    Amplify.Auth.signOut { result in
      switch result {
      case .success:
        print("Log out succeeded")
        completion(nil)
      case .failure(let error):
        var customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorResetPasswordConfirmFailed.rawValue)
        
        if let authError = error as? AuthError,
            let cognitoAuthError = authError.underlyingError as? AWSCognitoAuthError {
            switch cognitoAuthError {
            case .userNotFound:
              customError = NSError(domain: AuthErrorDomain, code: AmplifyBridgeError.AuthErrorCodeMismatch.rawValue)
            default:
                break
            }
        }
        print("Resend of confirmation code failed \(error)")
        completion(customError)
      }
    }
  }
  
}
