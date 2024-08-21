import {ComponentRef, useCallback, useRef, useState} from 'react';
import {SnackBarProps} from './SnackBar';
import {SnackBarContainer} from './SnackBarContainer';

export function useSnackbar() {
  const ref = useRef<ComponentRef<typeof SnackBarContainer>>(null);

  const show = useCallback(() => {
    ref.current?.show();
  }, []);

  const hide = useCallback((hideWithoutCallBack = false) => {
    ref.current?.hide(hideWithoutCallBack);
  }, []);

  const [snackBarProps, setSnackbarProps] = useState<
    Omit<SnackBarProps, 'testID'>
  >({});

  const showHandler = useCallback(
    (props: Omit<SnackBarProps, 'testID'>) => {
      setSnackbarProps(props);
      show();
    },
    [show],
  );

  return {
    ref,
    hide,
    show: showHandler,
    ...snackBarProps,
  };
}
