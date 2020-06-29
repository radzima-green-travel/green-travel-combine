import React from 'react';
import {store} from 'core/store';
import {RootNavigator} from 'navigation';
import {Provider} from 'react-redux';

declare let global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
