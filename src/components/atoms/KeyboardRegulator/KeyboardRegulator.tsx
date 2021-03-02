import React, {memo, useState, useCallback, ReactNode} from 'react';

import {View} from 'react-native';
import {rootViewRef} from './service';
interface IProps {
  children: ReactNode;
}

export const KeyboardRegulator = memo(({children}: IProps) => {
  const [style, setStyle] = useState({flex: 1});

  const setAppHeight = useCallback(({nativeEvent}) => {
    const {
      layout: {height},
    } = nativeEvent;
    setStyle({height});
  }, []);

  return (
    <View ref={rootViewRef} onLayout={setAppHeight} style={style}>
      {children}
    </View>
  );
});
