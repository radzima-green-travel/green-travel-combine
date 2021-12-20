# About

Travel app, has [UIKit](https://developer.apple.com/documentation/uikit?language=objc) and [React Native](https://reactnative.dev/) versions.

# Prerequisites

1. [Node 12](https://nodejs.org/en/download/) or newer LTS.
2. [Yarn](https://yarnpkg.com/).
3. [Bundler](https://bundler.io/).

# Quickstart

1. `bundle install`
2. `yarn`
4. `cd ios && bundle exec pod install`
5. `cd .. && yarn rnuc .env` - generate env files for native projects (used for RN app only, but necessary to build).
6. `yarn run android` / `yarn run ios` - to start RN app.
