//
//  AmplifyBridge.swift
//  greenTravel
//
//  Created by Alex K on 3.05.22.
//


import Amplify
import AmplifyPlugins

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
  
  @objc public func signUp(username: String, password: String, email: String,
                           completion: @escaping (_ err: NSError?) -> Void) {
    let userAttributes = [AuthUserAttribute(.email, value: email)]
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
        let customError = NSError(domain: "app.radzima", code: 1, userInfo: [
          "message": "Sign up failed with error \(error)"
        ])
        print("An error occurred while registering a user \(error)")
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
}
