import React, {
  Fragment,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, StyleSheet } from 'react-native';

let component: React.JSX.Element | null = null;
const myRef = React.createRef<{ update: () => void }>();

export const preview = (Comp: () => React.JSX.Element) => {
  component = <Comp />;
  myRef.current?.update();
};

global.preview = preview;

myRef.current?.update();

const PreviewComponent = forwardRef<
  { update: () => void },
  PropsWithChildren<{}>
>(({ children }, ref) => {
  const [_, state] = React.useState(Math.random());

  useImperativeHandle(ref, () => ({
    update: () => {
      state(Math.random());
    },
  }));

  const renderComponent = () => {
    if (component) {
      return (
        <View style={previewContaierStyles.container}>
          <View style={previewContaierStyles.content}>{component}</View>
        </View>
      );
    }

    return <>{children}</>;
  };

  return renderComponent();
});

export const Preview = ({ children }) => {
  return __DEV__ ? (
    <PreviewComponent ref={myRef}>{children}</PreviewComponent>
  ) : (
    <>{children}</>
  );
};

const previewContaierStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  content: {},
});
