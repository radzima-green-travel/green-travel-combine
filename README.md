# About

Travel app, has native iOS ([UIKit](https://developer.apple.com/documentation/uikit?language=objc)) and [React Native](https://reactnative.dev/) versions.

# Prerequisites

1. [Node 12](https://nodejs.org/en/download/) or newer LTS.
2. [Yarn](https://yarnpkg.com/).
3. [Bundler](https://bundler.io/).

# Setup

1. Create **_.netrc_** file:

- `cd ~`
- `touch .netrc`
- `open .netrc`
- Paste text below into file
  > `machine api.mapbox.com`  
  > `login mapbox`  
  > `password <MY_SECRET_TOKEN>`

2. Create **_dev.env_** file in root directory:

   > `ENVIRONMENT=development`  
   > `NATIVE_CLIENT_URL=<NATIVE_CLIENT_URL>`  
   > `NATIVE_CLIENT_IMAGE_URL=<NATIVE_CLIENT_IMAGE_URL>`  
   > `MAP_ACCESS_TOKEN=<MAP_ACCESS_TOKEN>`  
   > `SENTRY_DSN=<SENTRY_DSN>`  
   > `MAP_BOX_CLIENT_URL=<MAP_BOX_CLIENT_URL>`  
   > `MAP_BOX_STYLE_URL_ANY=<MAP_BOX_STYLE_URL_ANY>`  
   > `MAP_BOX_STYLE_URL_DARK=<MAP_BOX_STYLE_URL_DARK>`  
   > `AMPLITUDE_KEY=<AMPLITUDE_KEY>`  
   > `MAPBOX_DOWNLOADS_TOKEN=<MAPBOX_DOWNLOADS_TOKEN>`

3. Create **_aws-exports.js_** file in `src/` folder
4. Create **_GoogleService-Info.plist_** file in `ios/` folder

# Quickstart

1. `yarn`
2. `cd ios && pod install && cd ..`
3. `yarn rnuc dev.env` - generate dev.env files for native projects (used for RN app only, but necessary to build).
4. `yarn run android` / `yarn run ios` - to start RN app.
