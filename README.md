
# Prerequisite

1. Install [git secrets](https://github.com/awslabs/git-secrets#id6). 
   ```sh
   brew install git-secrets
   cd green-travel-combine
   git secrets --install
   git secrets --register-aws
   ```

2. Request the following files from the maintainers:
   - `aws-exports.js` - Place this file in the `./src` folder.
   - `.env` - Place this file in the root folder.

3. Add the following line to your `.bash_profile` or `.zshrc` file:
   ```sh
   export MAPBOX_DOWNLOAD_TOKEN=<MAPBOX_DOWNLOAD_TOKEN>
   ```

# Running the Project

1. Install dependencies:
   ```sh
   yarn
   ```

## Running on a Simulator

- For Android:
  ```sh
  yarn run android
  ```
- For iOS:
  ```sh
  yarn run iOS
  ```

## Running on a Device

1. Download the [corresponding development client](./DEV_CLIENT.md).
2. Start the development client:
   ```sh
   yarn start-dev-client
   ```
3. Scan the QR code.

---

# Other Information

1. Follow the [commit rules](./docs/COMMITLINT.md).
2. To create new development client build, push main to `dev-client` branch.
3. To develop UI components in isolation "preview" can be used:

```javascript
import { preview } from 'preview';


...



preview(() => (
  <View style={{width: 300, backgroundColor: 'white', padding: 5}}>
    <CustomSlider
      minValue={0}
      maxValue={10}
      steps={5}
      markSteps={10}
      value={2}
      onChangeValue={() => {}}
    />
  </View>
));

```
