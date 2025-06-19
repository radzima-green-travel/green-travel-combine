import React, {useEffect, useState} from 'react';
import {LoadingView} from 'atoms';
import {ErrorView} from '../ErrorView';
import {Props} from './types';
import {composeTestID} from 'core/helpers';
import {View} from 'react-native';
import {styles} from './styles';

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

export const SuspenseView = ({
  loading,
  loadingDelay,
  error,
  retryCallback,
  children,
  cover = false,
  buttonText,
  testID,
  loaderBackdropStyle,
}: Props) => {
  const showLoading = useDelayLoading(loading, loadingDelay || 0);

  let content: React.ReactElement | null = null;

  if (error) {
    content = (
      <ErrorView
        onButtonPress={retryCallback}
        error={error}
        buttonText={buttonText}
        testID={composeTestID(testID, 'errorView')}
      />
    );
  } else if (showLoading && !cover) {
    content = <LoadingView containerStyle={loaderBackdropStyle} />;
  } else {
    content = (
      <>
        {children}
        {cover && showLoading && (
          <LoadingView
            transparent={false}
            containerStyle={loaderBackdropStyle}
          />
        )}
      </>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      {content}
    </View>
  );
};
