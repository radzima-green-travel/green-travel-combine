import {useCallback, useRef} from 'react';
import {toastRef} from './types';

export function useToast() {
  const ref = useRef<toastRef>(null);

  const show = useCallback(() => {
    if (ref.current) {
      ref.current.show();
    }
  }, []);

  return {
    show,
    ref,
  };
}
