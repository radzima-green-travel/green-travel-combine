import React, {useEffect} from 'react';
import {store} from 'core/store';
import {RootNavigator} from 'navigation';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
declare let global: {HermesInternal: null | {}};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
