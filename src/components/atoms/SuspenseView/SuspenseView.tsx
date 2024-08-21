import React, {memo} from 'react';
import {ErrorView} from 'molecules';
import {LoadingView} from '../LoadingView';
import {Props} from './types';
import {composeTestID} from 'core/helpers';

export const SuspenseView = memo<Props>(
  ({
    loading,
    error,
    retryCallback,
    children,
    cover = false,
    buttonText,
    testID,
  }: Props) => {
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
