import React, {useEffect} from 'react';
import {store} from 'core/store';
import {RootNavigator} from 'navigation';
import {StatusBar} from 'react-native';
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
      <StatusBar backgroundColor="transparent" translucent />
    </Provider>
  );
};

export default App;
