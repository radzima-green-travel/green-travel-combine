import React, {memo, useEffect} from 'react';
import {BackHandler, Text, TouchableOpacity, View} from 'react-native';
import {LoadingView} from '../LoadingView';
import {Props} from './types';

export const SuspenseView = memo<Props>(
  ({
    loading,
    error,
    retryCallback,
    children,
    cover = false,
    blockBackPress = false,
  }: Props) => {
    useEffect(() => {
      const handler = () => loading || blockBackPress;
      BackHandler.addEventListener('hardwareBackPress', handler);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handler);
      };
    }, [blockBackPress, loading]);

    if (error) {
      return (
        <View>
          <Text>Ошибочка</Text>
          <TouchableOpacity onPress={retryCallback}>
            <Text>Нажми как что бы еще разок попробовать</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (loading && !cover) {
      return <LoadingView />;
    }

    return (
      <>
        {children}
        {cover && loading && <LoadingView transparent={false} />}
      </>
    );
  },
);

export default SuspenseView;
