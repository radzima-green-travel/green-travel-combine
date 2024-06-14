# Prerequisite
1. Install [git secrets](https://github.com/awslabs/git-secrets#id6). 
   ```
   brew install git-secrets
   cd green-travel-combine
   git secrets --install
   git secrets --register-aws
   ```

3. Ask maintainers for files:
   1. `aws-exports.js` - put into `./src` folder.
   2. `.env` - put into root folder.

4. Add line below in your `.bash_profile`/`.zshrc` file:
```
export MAPBOX_DOWNLOAD_TOKEN=<MAPBOX_DOWNLOAD_TOKEN>
```

# Run project

1) `yarn`

## Simulator

- `yarn run android`
- `yarn run iOS`

## Device
- Download [corresponding development client](./DEV_CLIENT.MD)
- `yarn start-dev-client` 
- Scan qr code



---
# Other info

1) [Commit rules](./docs/COMMITLINT.md)