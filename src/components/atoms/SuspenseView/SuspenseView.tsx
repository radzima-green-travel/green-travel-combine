import React, {memo, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {ErrorView} from 'molecules';
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
      return <ErrorView onTryAgainPress={retryCallback} error={error} />;
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
