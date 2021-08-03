#!/usr/bin/env bash
echo $IOS_FIREBASE_SECRET | base64 --decode > $BITRISE_SOURCE_DIR/ios/GoogleService-Info.plist
