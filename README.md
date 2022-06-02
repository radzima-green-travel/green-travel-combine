# About
Travel app, has native iOS ([UIKit](https://developer.apple.com/documentation/uikit?language=objc)) and [React Native](https://reactnative.dev/) versions.

# Setup
1. Install [Bundler](https://bundler.io/).
2. Install [Node LTS](https://nodejs.org/en/download/).
3. Install [Yarn](https://yarnpkg.com/).
4. On project root execute  `bundle install`.
5. On project root execute  `yarn install`.
6. Create `~/.netrc` file. Ask maintainers (see below) to provide file contents.
7. On folder `./ios` execute `bundle exec pod install`.
8. Ask maintainers for files:
   1. `aws-exports.js` - put into `./src` folder.
   2. `.env` - put into root folder.
   3. `amplifyconfiguration.json` - put into `./ios` folder.
   4. `awsconfiguration.json` - put into `./ios` folder.
   5. `GoogleService-Info.plist` - put into `./ios` folder.
9. On project root execute `yarn rnuc .env`.

## Setup - React Native specific
1. Add line below in your `.bashrc`/`.zshrc` file:
```
export MAPBOX_DOWNLOADS_TOKEN=<MAPBOX_DOWNLOADS_TOKEN>
```

# Maintainers who can provide files needed for setup
1. UIKit version [maintainer](https://github.com/alexeykomov/).
2. React Native version [maintainer](https://github.com/tr3v3r).

# Troubleshooting
1. `An error occurred while installing json (2.5.1), and Bundler cannot
   continue.` In this case try to:
   1. Install [rvm](https://rvm.io/).
   2. `rvm install 2.6.3`.
   3. `gem install bundler`.
   4. Repeat from step **4** in main setup.
2. Error during the pod installation - try the same as above.
