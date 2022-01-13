import React, {useEffect} from 'react';
import {store, persistor} from 'core/store';
import {RootNavigator} from 'navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
declare let global: {HermesInternal: null | {}};
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {languageService} from 'services/LanguageService';
import i18next from 'i18next';

const App = () => {
  const setAppLanguage = () => {
    const language = languageService.getPreferredLanguage();

    i18next.changeLanguage(language);
  };

  useEffect(() => {
    setAppLanguage();
  }, []);

  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        </PersistGate>
      </BottomSheetModalProvider>
    </Provider>
  );
};

export default App;
