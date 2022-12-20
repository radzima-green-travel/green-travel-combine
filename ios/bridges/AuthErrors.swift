//
//  AuthErrors.swift
//  greenTravel
//
//  Created by Alex K on 14.06.22.
//

import Foundation

// swiftlint:disable identifier_name
@objc enum AmplifyBridgeError: Int {
  case AuthErrorFetchSessionFailed = 1
  case AuthErrorSignInFailed
  case AuthErrorSignUpFailed
  case AuthErrorNotSignedIn
  case AuthErrorResetPasswordFailed
  case AuthErrorResetPasswordConfirmFailed
  case AuthErrorCodeMismatch
  case AuthErrorInvalidPassword
  case AuthErrorUserNotFound
  case AuthErrorUsernameExists
  case AuthErrorNotAuthorized
}

let AuthErrorDomain = "app.radzima"
