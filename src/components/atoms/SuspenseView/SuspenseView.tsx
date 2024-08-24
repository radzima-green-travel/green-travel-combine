import React, {memo, useEffect, useState} from 'react';
import {ErrorView} from 'molecules';
import {LoadingView} from '../LoadingView';
import {Props} from './types';
import {composeTestID} from 'core/helpers';

function useDelayLoading(loading: boolean = false, delay: number) {
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (delay) {
      if (loading) {
        const timeout = setTimeout(() => {
          setShowLoading(true);
        }, delay);
        return () => clearTimeout(timeout);
      }
      setShowLoading(false);
    }
  }, [loading, delay]);

  return delay ? showLoading : loading;
}

export const SuspenseView = memo<Props>(
  ({
    loading,
    loadingDelay,
    error,
    retryCallback,
    children,
    cover = false,
    buttonText,
    testID,
  }: Props) => {
    const showLoading = useDelayLoading(loading, loadingDelay || 0);

    if (error) {
      return (
        <ErrorView
          onButtonPress={retryCallback}
          error={error}
          buttonText={buttonText}
          testID={composeTestID(testID, 'errorView')}
        />
      );
    }

    if (showLoading && !cover) {
      return <LoadingView />;
    }

    return (
      <>
        {children}
        {cover && showLoading && <LoadingView transparent={false} />}
      </>
    );
  },
);

export default SuspenseView;
