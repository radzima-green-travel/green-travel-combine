import React, {type ReactElement} from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

const StatusbarDefaultProps = {
  translucent: false,
  animated: true,
  hidden: false,
  backgroundColor: 'white',
  barStyle: 'dark-content',
};

const flex = {flex: 1};

export function ScreenContent({
  statusbarProps,
  children,
  style,
  ...props
}: {
  statusbarProps?: any;
  children?: Array<ReactElement>;
  style?: any;
}) {
  return (
    <SafeAreaView {...props} style={[flex, style]}>
      <StatusBar {...StatusbarDefaultProps} {...statusbarProps} />
      {children}
    </SafeAreaView>
  );
}
