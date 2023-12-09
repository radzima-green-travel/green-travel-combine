import React, {Fragment, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';

let component = null;
const myRef = React.createRef();

export const isolateComponent = Component => {
  component = <Component />;
  myRef.current?.update();
};

myRef.current?.update();

const ComponentSandboxComponent = forwardRef(({children}, ref) => {
  const [_, state] = React.useState(Math.random());

  useImperativeHandle(ref, () => ({
    update: () => {
      state(Math.random());
    },
  }));

  const renderComponent = () => {
    if (component) {
      return (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          {component}
        </View>
      );
    }
  };

  return (
    <>
      {children}
      {renderComponent()}
    </>
  );
});

export const ComponentSandbox = ({children}) => {
  return (
    <ComponentSandboxComponent ref={myRef}>
      {children}
    </ComponentSandboxComponent>
  );
};
