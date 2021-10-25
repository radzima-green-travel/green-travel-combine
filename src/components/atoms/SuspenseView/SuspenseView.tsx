import React, {memo} from 'react';
import {ErrorView} from 'molecules';
import {LoadingView} from '../LoadingView';
import {Props} from './types';

export const SuspenseView = memo<Props>(
  ({loading, error, retryCallback, children, cover = false}: Props) => {
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
