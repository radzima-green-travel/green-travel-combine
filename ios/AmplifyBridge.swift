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
    @objc
  
    public func initialize() {
        do {
            try Amplify.add(plugin: AWSCognitoAuthPlugin())
            try Amplify.configure()
            print("Amplify configured with Auth and Analytics plugins")
        } catch {
            print("Failed to initialize Amplify with \(error)")
        }
    }
    @objc
    public func recordEvent(name: String, category: String, accountId: String) {
        let properties: AnalyticsProperties = [ "category": category, "accountId": accountId]
        let event = BasicAnalyticsEvent(name: name, properties: properties)
        Amplify.Analytics.record(event: event)
    }
}
